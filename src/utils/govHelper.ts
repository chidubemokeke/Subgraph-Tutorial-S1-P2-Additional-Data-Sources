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

export function getOrCreateDAO(id: string): DAO {
  let dao = DAO.load(id);
  if (dao == null) {
    dao = new DAO(id);
    dao.totalProposals = BigInt.fromI32(0);
    dao.totalVotesCast = BigInt.fromI32(0);
    dao.totalDelegatedVotesReceived = BigInt.fromI32(0);
    dao.totalDelegatedVotesGiven = BigInt.fromI32(0);
    dao.save();
  }
  return dao as DAO;
}
// Function to initialize a Proposal entity when a ProposalCreatedEvent is emitted
export function initializeProposal(
  event: ProposalCreatedEvent
): ProposalCreated {
  // Convert the proposal ID from the event to a string and load the Proposal entity
  let proposalId = event.params.id.toString();
  let proposal = ProposalCreated.load(proposalId);

  // If the Proposal entity doesn't exist, create a new one
  if (!proposal) {
    proposal = new ProposalCreated(proposalId);
  }

  // Set properties of the Proposal entity using event parameters
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

  // Return the initialized Proposal entity
  return proposal;
}

// Function to initialize a Proposal entity and handle VoteCast events
export function initializeProposalAndHandleVote(event: VoteCastEvent): void {
  // Load the Proposal entity using the proposal ID from the event
  let proposal = ProposalCreated.load(event.params.proposalId.toString());
  if (!proposal) {
    // If the Proposal entity doesn't exist, exit the function
    return;
  }

  // Get the address of the voter from the event
  let voterAddress = event.params.voter as Bytes;

  // If the voter is not already in the uniqueVoters array, add them
  if (!proposal.uniqueVoters.includes(voterAddress)) {
    proposal.uniqueVoters.push(voterAddress);
  }

  // Update vote counts based on the support value from the event
  let votes = event.params.votes;
  if (event.params.support == 0) {
    proposal.votesAgainst = proposal.votesAgainst.plus(votes);
  } else if (event.params.support == 1) {
    proposal.votesFor = proposal.votesFor.plus(votes);
  } else if (event.params.support == 2) {
    proposal.votesAbstain = proposal.votesAbstain.plus(votes);
  }

  // Save the updated Proposal entity
  proposal.save();

  // Create and save the VoteCast entity
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toHex();
  let voteCast = new VoteCast(id);
  voteCast.voter = voterAddress;
  voteCast.proposalId = event.params.proposalId;
  voteCast.support = event.params.support;
  voteCast.votes = votes;
  voteCast.reason = event.params.reason;
  voteCast.blockNumber = event.block.number;
  voteCast.blockTimestamp = event.block.timestamp;
  voteCast.transactionHash = event.transaction.hash;

  // Update DAO totalVotesCast
  let dao = getOrCreateDAO(event.address.toHexString());
  incrementVoteCount(dao);

  // Save the VoteCast entity
  voteCast.save();
}

// Function to create and save a ProposalExecuted entity when a ProposalExecutedEvent is emitted
export function createProposalExecuted(event: ProposalExecutedEvent): void {
  // Convert the proposal ID from the event to a string
  let proposalId = event.params.id.toString();

  // Load the ProposalExecuted entity
  let proposalExecuted = ProposalExecuted.load(proposalId);

  // If the ProposalExecuted entity doesn't exist, create a new one
  if (!proposalExecuted) {
    proposalExecuted = new ProposalExecuted(proposalId);
  }

  // Set properties of the ProposalExecuted entity using event parameters
  proposalExecuted.executionId = event.params.id;
  proposalExecuted.dao = Bytes.fromHexString(
    event.address.toHexString()
  ).toHexString(); // Convert DAO ID to Bytes
  proposalExecuted.blockNumber = event.block.number;
  proposalExecuted.blockTimestamp = event.block.timestamp;
  proposalExecuted.transactionHash = event.transaction.hash;

  // Save the ProposalExecuted entity
  proposalExecuted.save();
}

/// Function to create and save a ProposalQueued entity when a ProposalQueuedEvent is emitted
export function createProposalQueued(event: ProposalQueuedEvent): void {
  // Convert the proposal ID from the event to a string
  let proposalId = event.params.id.toString();

  // Load the ProposalQueued entity
  let proposalQueued = ProposalQueued.load(proposalId);

  // If the ProposalQueued entity doesn't exist, create a new one
  if (!proposalQueued) {
    proposalQueued = new ProposalQueued(proposalId);
  }

  // Load the DAO entity
  let dao = getOrCreateDAO(event.address.toHexString());

  // Load the ProposalCreated entity
  let proposalCreated = ProposalCreated.load(proposalId);

  // If the ProposalCreated entity doesn't exist, return or handle as needed
  if (!proposalCreated) {
    return;
  }

  // Set properties of the ProposalQueued entity using event parameters
  proposalQueued.queueId = event.params.id;
  proposalQueued.dao = Bytes.fromHexString(
    dao.id.replace("0x", "")
  ).toHexString(); // Convert DAO ID to Bytes
  proposalQueued.proposal = proposalCreated.id; // Assign ProposalCreated entity ID as string
  proposalQueued.eta = event.params.eta;
  proposalQueued.blockNumber = event.block.number;
  proposalQueued.blockTimestamp = event.block.timestamp;
  proposalQueued.transactionHash = event.transaction.hash;

  // Save the ProposalQueued entity
  proposalQueued.save(); // Function to create and save a ProposalQueued entity when a ProposalQueuedEvent is emitted.
}

// Function to create a ProposalCanceled entity when a ProposalCanceledEvent is emitted
export function createProposalCanceled(
  event: ProposalCanceledEvent
): ProposalCanceled {
  // Create a unique ID using the transaction hash and log index
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Create and initialize the ProposalCanceled entity
  let canceled = new ProposalCanceled(id);
  canceled.cancelId = event.params.id;
  canceled.blockNumber = event.block.number;
  canceled.blockTimestamp = event.block.timestamp;
  canceled.transactionHash = event.transaction.hash;

  // Update DAO totalProposals
  let dao = getOrCreateDAO(event.params.id.toHex());
  decrementProposalCount(dao);

  // Return the initialized ProposalCanceled entity
  return canceled;
}

21;
