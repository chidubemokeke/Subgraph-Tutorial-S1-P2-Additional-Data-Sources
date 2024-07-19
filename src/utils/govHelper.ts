// Importing necessary types and classes from the @graphprotocol/graph-ts library
import { BigInt, Bytes } from "@graphprotocol/graph-ts";

// Importing entity classes from the generated schema
import {
  DAO,
  ProposalCreated,
  VoteCast,
  ProposalCanceled,
  ProposalQueued,
  ProposalExecuted,
} from "../../generated/schema";

// Importing event classes from the generated CGovernance smart contract
import {
  ProposalCreated as ProposalCreatedEvent,
  VoteCast as VoteCastEvent,
  ProposalCanceled as ProposalCanceledEvent,
  ProposalQueued as ProposalQueuedEvent,
  ProposalExecuted as ProposalExecutedEvent,
} from "../../generated/CGovernance/CGovernance";

// Importing utility functions for processing logic
import {
  incrementProposalCount,
  incrementVoteCount,
  decrementProposalCount,
} from "../utils/logic";

// Importing helper functions for converting data types
import {
  convertAddressesToBytesArray,
  convertValuesToBigIntArray,
  convertCallDataToBytesArray,
  convertStringsToStringsArray,
} from "./logic";

// Function to get or create a DAO entity based on an ID string
export function getOrCreateDAO(id: string): DAO {
  // Attempt to load DAO entity using provided ID
  let dao = DAO.load(id);

  // If DAO entity does not exist, create a new one
  if (!dao) {
    dao = new DAO(id);
    dao.totalProposals = BigInt.fromI32(0); // Initialize proposal counts
    dao.totalVotesCast = BigInt.fromI32(0); // Initialize vote counts
    dao.totalDelegatedVotesReceived = BigInt.fromI32(0); // Initialize delegated vote counts
    dao.totalDelegatedVotesGiven = BigInt.fromI32(0); // Initialize delegated vote counts
    dao.save(); // Persist DAO entity
  }
  return dao as DAO; // Return DAO entity
}

// Function to initialize a Proposal entity when a ProposalCreatedEvent is emitted
export function initializeProposal(
  event: ProposalCreatedEvent
): ProposalCreated {
  // Convert proposal ID from event to string and attempt to load Proposal entity
  let proposalId = event.params.id.toString();
  let proposal = ProposalCreated.load(proposalId);

  // If Proposal entity does not exist, create a new one
  if (!proposal) {
    proposal = new ProposalCreated(proposalId);
  }

  // Set properties of Proposal entity using event parameters
  proposal.creationId = event.params.id;
  proposal.proposer = event.params.proposer;
  proposal.targets = convertAddressesToBytesArray(event.params.targets);
  proposal.values = convertValuesToBigIntArray(event.params.values);
  proposal.signatures = convertStringsToStringsArray(event.params.signatures);
  proposal.calldatas = convertCallDataToBytesArray(event.params.calldatas);
  proposal.startBlock = event.params.startBlock;
  proposal.endBlock = event.params.endBlock;
  proposal.description = event.params.description;
  proposal.votesFor = BigInt.fromI32(0);
  proposal.votesAgainst = BigInt.fromI32(0);
  proposal.votesAbstain = BigInt.fromI32(0);
  proposal.uniqueVoters = new Array<Bytes>();

  // Get or create the DAO entity and update its totalProposals
  let dao = getOrCreateDAO(event.address.toHex());
  incrementProposalCount(dao);

  proposal.dao = dao.id;
  proposal.save(); // Persist Proposal entity

  // Return the initialized Proposal entity
  return proposal as ProposalCreated;
}

// Function to initialize a Proposal entity and handle VoteCast events
export function initializeProposalAndHandleVote(event: VoteCastEvent): void {
  // Load Proposal entity using proposal ID from event
  let proposal = ProposalCreated.load(event.params.proposalId.toString());

  // If Proposal entity does not exist, exit function
  if (!proposal) {
    return;
  }

  // Get voter address from event
  let voterAddress = event.params.voter as Bytes;

  // If voter is not already in uniqueVoters array, add them
  if (!proposal.uniqueVoters.includes(voterAddress)) {
    proposal.uniqueVoters.push(voterAddress);
  }

  // Update vote counts based on support value from event
  let votes = event.params.votes;
  if (event.params.support == 0) {
    proposal.votesAgainst = proposal.votesAgainst.plus(votes);
  } else if (event.params.support == 1) {
    proposal.votesFor = proposal.votesFor.plus(votes);
  } else if (event.params.support == 2) {
    proposal.votesAbstain = proposal.votesAbstain.plus(votes);
  }

  // Increment proposal count and save updated Proposal entity
  incrementProposalCount(getOrCreateDAO(event.address.toHex()));
  proposal.save(); // Persist updated Proposal entity

  // Update DAO totalVotesCast
  let dao = getOrCreateDAO(event.address.toHexString());
  incrementVoteCount(dao);

  // Create and persist VoteCast entity
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toHex();
  let voteCast = new VoteCast(id);
  voteCast.voter = voterAddress;
  voteCast.proposalId = event.params.proposalId;
  voteCast.voters = event.params.proposalId.toHex();
  voteCast.support = event.params.support;
  voteCast.votes = votes;
  voteCast.reason = event.params.reason;
  voteCast.blockNumber = event.block.number;
  voteCast.blockTimestamp = event.block.timestamp;
  voteCast.transactionHash = event.transaction.hash;
  voteCast.activeMembers = dao.id;
  voteCast.save();
}

// Function to create and persist a ProposalExecuted entity when a ProposalExecutedEvent is emitted
export function createProposalExecuted(event: ProposalExecutedEvent): void {
  // Convert proposal ID from event to string
  let proposalId = event.params.id.toString();

  // Load Proposal entity
  let proposal = ProposalCreated.load(proposalId);

  // If Proposal entity does not exist, return
  if (!proposal) {
    return;
  }

  // Load DAO entity
  let dao = DAO.load(event.address.toHexString());

  // If DAO entity does not exist, return
  if (!dao) {
    return;
  }

  // Create ProposalExecuted entity
  let proposalExecuted = new ProposalExecuted(proposalId);

  // Set properties of ProposalExecuted entity using event parameters
  proposalExecuted.executionId = event.params.id;
  proposalExecuted.dao = dao.id;
  proposalExecuted.proposal = proposal.id;
  proposalExecuted.blockNumber = event.block.number;
  proposalExecuted.blockTimestamp = event.block.timestamp;
  proposalExecuted.transactionHash = event.transaction.hash;

  // Persist ProposalExecuted entity
  proposalExecuted.save();
}

// Function to create and persist a ProposalQueued entity when a ProposalQueuedEvent is emitted
export function createProposalQueued(event: ProposalQueuedEvent): void {
  // Convert proposal ID from event to string
  let proposalId = event.params.id.toString();

  // Load Proposal entity
  let proposal = ProposalCreated.load(proposalId);

  // If Proposal entity does not exist, return or handle as needed
  if (!proposal) {
    return;
  }

  // Get or create DAO entity
  let dao = getOrCreateDAO(event.address.toHexString());

  // Create ProposalQueued entity
  let proposalQueued = new ProposalQueued(proposalId);

  // Set properties of ProposalQueued entity using event parameters
  proposalQueued.queueId = event.params.id;
  proposalQueued.dao = dao.id;
  proposalQueued.proposal = proposal.id;
  proposalQueued.eta = event.params.eta;
  proposalQueued.blockNumber = event.block.number;
  proposalQueued.blockTimestamp = event.block.timestamp;
  proposalQueued.transactionHash = event.transaction.hash;

  // Persist ProposalQueued entity
  proposalQueued.save();
}

// Function to create and persist a ProposalCanceled entity when a ProposalCanceledEvent is emitted
export function createProposalCanceled(
  event: ProposalCanceledEvent
): ProposalCanceled {
  // Convert proposal ID from event to string
  let proposalId = event.params.id.toString();

  // Load Proposal entity
  let proposal = ProposalCreated.load(proposalId);

  // If Proposal entity does not exist, create new ProposalCanceled entity
  if (!proposal) {
    return new ProposalCanceled(event.transaction.hash.toHex());
  }

  // Get or create DAO entity
  let dao = getOrCreateDAO(event.address.toHexString());

  // Create ProposalCanceled entity
  let canceled = new ProposalCanceled(event.transaction.hash.toHex());
  canceled.cancelId = event.params.id;
  canceled.blockNumber = event.block.number;
  canceled.blockTimestamp = event.block.timestamp;
  canceled.transactionHash = event.transaction.hash;
  canceled.dao = dao.id;
  canceled.proposal = proposal.id;

  decrementProposalCount(dao); // Decrement total proposal count

  canceled.save(); // Persist ProposalCanceled entity

  return canceled; // Return ProposalCanceled entity
}
