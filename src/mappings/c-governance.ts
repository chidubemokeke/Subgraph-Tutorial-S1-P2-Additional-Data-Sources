// Importing specific event types from the CGovernance smart contract
import {
  ProposalCreated as ProposalCreatedEvent,
  VoteCast as VoteCastEvent,
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
} from "./../utils/govHelper";

// Function to handle the ProposalCreated event
export function handleProposalCreated(event: ProposalCreatedEvent): void {
  let proposal = initializeProposal(event);
  proposal.save();
}

// Function to handle the VoteCast event
export function handleVoteCast(event: VoteCastEvent): void {
  initializeProposalAndHandleVote(event);
}

// Function to handle the ProposalCanceled event
export function handleProposalCanceled(event: ProposalCanceledEvent): void {
  createProposalCanceled(event);
}

// Function to handle the ProposalQueued event
export function handleProposalQueued(event: ProposalQueuedEvent): void {
  createProposalQueued(event);
}

// Function to handle the ProposalExecuted event
export function handleProposalExecuted(event: ProposalExecutedEvent): void {
  createProposalExecuted(event);
}
