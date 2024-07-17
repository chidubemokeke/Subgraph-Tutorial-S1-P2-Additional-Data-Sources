// Importing specific event types from the CGovernance smart contract
import {
  ProposalCreated as ProposalCreatedEvent,
  VoteCast as VoteCasteEvent,
  ProposalCanceled as ProposalCanceledEvent,
  ProposalQueued as ProposalQueuedEvent,
  ProposalExecuted as ProposalExecutedEvent,
} from "../../generated/CGovernance/CGovernance";

// Importing helper functions from the govHelper module
import {
  initializeProposal,
  initializeProposalAndHandleVote,
  createProposalCanceled,
  createProposalQueued,
  createProposalExecuted,
} from "../utils/govHelper";

// Function to handle the ProposalCreated event
export function handleProposalCreated(event: ProposalCreatedEvent): void {
  // Call the initializeProposal function to create a new Proposal entity
  let proposal = initializeProposal(event);
  // Save the Proposal entity to the store
  proposal.save();
}

// Function to handle the VoteCast event
export function handleVoteCast(event: VoteCasteEvent): void {
  // Call the initializeProposalAndHandleVote function to handle the vote
  initializeProposalAndHandleVote(event);
}

// Function to handle the ProposalCanceled event
export function handleProposalCanceled(event: ProposalCanceledEvent): void {
  // Call the createProposalCanceled function to create a ProposalCanceled entity
  createProposalCanceled(event);
}

// Function to handle the ProposalQueued event
export function handleProposalQueued(event: ProposalQueuedEvent): void {
  // Call the createProposalQueued function to create a ProposalQueued entity
  createProposalQueued(event);
}

// Function to handle the ProposalExecuted event
export function handleProposalExecuted(event: ProposalExecutedEvent): void {
  // Call the createProposalExecuted function to create a ProposalExecuted entity
  createProposalExecuted(event);
}
