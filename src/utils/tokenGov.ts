// Importing the schema entities DelegateChanged, DelegateVotesChanged, and Transfer
import {
  DelegateChanged,
  DelegateVotesChanged,
  Transfer,
} from "../../generated/schema";
// Importing the event classes DelegateChangedEvent, DelegateVotesChangedEvent, and TransferEvent from the generated CToken directory
import {
  DelegateChanged as DelegateChangedEvent,
  DelegateVotesChanged as DelegateVotesChangedEvent,
  Transfer as TransferEvent,
} from "../../generated/CToken/CToken";

// Function to create a DelegateChanged entity from a DelegateChangedEvent
export function createDelegateChanged(
  event: DelegateChangedEvent
): DelegateChanged {
  // Create a unique ID for the entity by combining the transaction hash and log index
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Create a new DelegateChanged entity with the unique ID
  let delegateChanged = new DelegateChanged(id);
  // Set the entity's properties based on the event parameters
  delegateChanged.delegator = event.params.delegator;
  delegateChanged.fromDelegate = event.params.fromDelegate;
  delegateChanged.toDelegate = event.params.toDelegate;
  // Set the block number when the event was emitted
  delegateChanged.blockNumber = event.block.number;
  // Set the timestamp of the block when the event was emitted
  delegateChanged.blockTimestamp = event.block.timestamp;
  // Set the transaction hash of the transaction that emitted the event
  delegateChanged.transactionHash = event.transaction.hash;

  // Save the entity to the data store
  delegateChanged.save();

  // Return the created entity
  return delegateChanged;
}

// Function to create a DelegateVotesChanged entity from a DelegateVotesChangedEvent
export function createDelegateVotesChanged(
  event: DelegateVotesChangedEvent
): DelegateVotesChanged {
  // Create a unique ID for the entity by combining the transaction hash and log index
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Create a new DelegateVotesChanged entity with the unique ID
  let delegateVotesChanged = new DelegateVotesChanged(id);
  // Set the entity's properties based on the event parameters
  delegateVotesChanged.delegate = event.params.delegate;
  delegateVotesChanged.previousBalance = event.params.previousBalance;
  delegateVotesChanged.newBalance = event.params.newBalance;
  // Set the block number when the event was emitted
  delegateVotesChanged.blockNumber = event.block.number;
  // Set the timestamp of the block when the event was emitted
  delegateVotesChanged.blockTimestamp = event.block.timestamp;
  // Set the transaction hash of the transaction that emitted the event
  delegateVotesChanged.transactionHash = event.transaction.hash;
  // Save the entity to the data store
  delegateVotesChanged.save();

  // Return the created entity
  return delegateVotesChanged;
}

// Function to create a Transfer entity
export function createTransfer(event: TransferEvent): Transfer {
  // Create a unique ID for the entity by combining the transaction hash and log index
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Create a new Transfer entity with the unique ID
  let transfer = new Transfer(id);

  // Set the entity's properties based on the event parameters
  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.amount = event.params.amount;
  transfer.blockNumber = event.block.number;
  transfer.blockTimestamp = event.block.timestamp;
  transfer.transactionHash = event.transaction.hash;

  // Save the entity to the data store
  transfer.save();

  // Return the created entity
  return transfer;
}
