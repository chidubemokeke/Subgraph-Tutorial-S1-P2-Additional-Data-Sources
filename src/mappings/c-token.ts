// Import necessary event types and creation functions from respective paths
import {
  DelegateChanged as DelegateChangedEvent,
  DelegateVotesChanged as DelegateVotesChangedEvent,
  Transfer as TransferEvent,
} from "../../generated/CToken/CToken"; // Import event types from CToken contract schema
import {
  createDelegateChanged,
  createDelegateVotesChanged,
  createTransfer,
} from "../utils/tokenGov"; // Import functions to create entities from tokenGov utilities

// Event handler function for DelegateChangedEvent
export function handleDelegateChanged(event: DelegateChangedEvent): void {
  createDelegateChanged(event); // Call function to create DelegateChanged entity
}

// Event handler function for DelegateVotesChangedEvent
export function handleDelegateVotesChanged(
  event: DelegateVotesChangedEvent
): void {
  createDelegateVotesChanged(event); // Call function to create DelegateVotesChanged entity
}

// Event handler function for TransferEvent
export function handleTransfer(event: TransferEvent): void {
  createTransfer(event); // Call function to create Transfer entity
}
