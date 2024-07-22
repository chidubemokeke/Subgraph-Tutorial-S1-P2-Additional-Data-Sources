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
import { getOrCreateDAO, getOrCreateDelegateTracker } from "./logic";
import { BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";

// Function to create a DelegateChanged entity from a DelegateChangedEvent
export function createDelegateChanged(
  event: DelegateChangedEvent
): DelegateChanged {
  // Create a unique ID for the entity by combining the transaction hash and log index
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Get or create the DAO entity
  let dao = getOrCreateDAO(event.address);

  // Get or create DelegateTracker entities for the new delegate
  let toDelegateTracker = getOrCreateDelegateTracker(
    dao.id, // DAO ID
    event.params.toDelegate // Delegate address (to)
  );

  // Create a new DelegateChanged entity with the unique ID
  let delegateChanged = new DelegateChanged(id);
  delegateChanged.dao = dao.id;
  delegateChanged.delegate = toDelegateTracker.id; // Reference the DelegateTracker entity
  delegateChanged.delegator = event.params.delegator;
  delegateChanged.fromDelegate = event.params.fromDelegate;
  delegateChanged.toDelegate = event.params.toDelegate;
  delegateChanged.blockNumber = event.block.number;
  delegateChanged.blockTimestamp = event.block.timestamp;
  delegateChanged.transactionHash = event.transaction.hash;

  // Save the DelegateChanged entity to the data store
  delegateChanged.save();

  // Update the total delegated votes received and given for the DAO
  dao.totalDelegatedVotesReceived = dao.totalDelegatedVotesReceived.plus(
    BigInt.fromI32(1)
  );
  dao.totalDelegatedVotesGiven = dao.totalDelegatedVotesGiven.plus(
    BigInt.fromI32(1)
  );

  // Increment the totalDelegateChanges for the DAO
  dao.totalDelegateChanges = dao.totalDelegateChanges.plus(BigInt.fromI32(1));

  // Save the updated DAO entity to the data store
  dao.save();

  // Return the created DelegateChanged entity
  return delegateChanged;
}

// Function to create a DelegateVotesChanged entity from a DelegateVotesChangedEvent
export function createDelegateVotesChanged(
  event: DelegateVotesChangedEvent
): DelegateVotesChanged {
  // Create a unique ID for the entity by combining the transaction hash and log index
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Get or create the DAO entity
  let dao = getOrCreateDAO(event.address);

  // Get or create DelegateTracker entities for the delegate
  let delegateTracker = getOrCreateDelegateTracker(
    dao.id, // DAO ID
    event.params.delegate // Delegate address
  );

  // Create a new DelegateVotesChanged entity with the unique ID
  let delegateVotesChanged = new DelegateVotesChanged(id);
  delegateVotesChanged.dao = dao.id;
  delegateVotesChanged.votes = delegateTracker.id; // Reference the DelegateTracker entity
  delegateVotesChanged.previousBalance = event.params.previousBalance;
  delegateVotesChanged.newBalance = event.params.newBalance;
  delegateVotesChanged.blockNumber = event.block.number;
  delegateVotesChanged.blockTimestamp = event.block.timestamp;
  delegateVotesChanged.transactionHash = event.transaction.hash;

  // Save the DelegateVotesChanged entity to the data store
  delegateVotesChanged.save();

  // Update the total delegated votes received for the DAO
  let votesChange = event.params.newBalance.minus(event.params.previousBalance);
  if (votesChange.gt(BigInt.fromI32(0))) {
    dao.totalDelegatedVotesReceived =
      dao.totalDelegatedVotesReceived.plus(votesChange);
  } else {
    dao.totalDelegatedVotesReceived = dao.totalDelegatedVotesReceived.minus(
      votesChange.abs()
    );
  }

  // Save the updated DAO entity to the data store
  dao.save();

  // Return the created entity
  return delegateVotesChanged;
}

// Function to create a Transfer entity from a TransferEvent
export function createTransfer(event: TransferEvent): Transfer {
  // Create a unique ID for the entity by combining the transaction hash and log index
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Get or create the DAO entity
  let dao = getOrCreateDAO(event.address);

  // Create a new Transfer entity with the unique ID
  let transfer = new Transfer(id);
  transfer.dao = dao.id;
  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.amount = event.params.amount;
  transfer.blockNumber = event.block.number;
  transfer.blockTimestamp = event.block.timestamp;
  transfer.transactionHash = event.transaction.hash;

  // Save the Transfer entity to the data store
  transfer.save();

  // Update the totalTransfers field for the DAO
  dao.totalTransfers = dao.totalTransfers.plus(BigInt.fromI32(1));

  // Update the totalAmountTransferred field for the DAO
  dao.totalAmountTransferred = dao.totalAmountTransferred.plus(
    event.params.amount
  );

  // Save the updated DAO entity to the data store
  dao.save();

  // Return the created entity
  return transfer;
}
