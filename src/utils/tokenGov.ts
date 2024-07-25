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
import { BigInt, Bytes } from "@graphprotocol/graph-ts";

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
  delegateChanged.dao = dao.id; // Reference the DAO entity
  delegateChanged.delegate = delegateChanged.id; // Reference the DelegateTracker entity
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

  // Increment the changeCount for the DelegateTracker entities
  toDelegateTracker.changeCount = toDelegateTracker.changeCount.plus(
    BigInt.fromI32(1)
  );

  // Save the updated DAO and DelegateTracker entities to the data store
  dao.save();
  toDelegateTracker.save();

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
  let dao = getOrCreateDAO(event.address as Bytes);

  // Get or create DelegateTracker entities for the delegate
  let delegateTracker = getOrCreateDelegateTracker(
    dao.id, // DAO ID
    event.params.delegate // Delegate address
  );

  // Create a new DelegateVotesChanged entity with the unique ID
  let delegateVotesChanged = new DelegateVotesChanged(id);
  delegateVotesChanged.dao = dao.id; // Reference the DAO entity
  delegateVotesChanged.votes = delegateTracker.id; // Reference the DelegateTracker entity
  delegateVotesChanged.delegate = event.params.delegate;
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

  // Increment the voteCount for the DelegateTracker entity
  delegateTracker.voteCount = delegateTracker.voteCount.plus(BigInt.fromI32(1));

  // Save the updated DAO and DelegateTracker entities to the data store
  dao.save();
  delegateTracker.save();

  // Return the created DelegateVotesChanged entity
  return delegateVotesChanged;
}

// Function to create a Transfer entity from a TransferEvent
export function createTransfer(event: TransferEvent): Transfer {
  // Create a unique ID for the entity by combining the transaction hash and log index
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Get or create the DAO entity
  let dao = getOrCreateDAO(event.address);

  // Get or create DelegateTracker entities for the 'from' and 'to' addresses
  let fromDelegateTracker = getOrCreateDelegateTracker(
    dao.id, // DAO ID
    event.params.from // Delegate address (from)
  );
  let toDelegateTracker = getOrCreateDelegateTracker(
    dao.id, // DAO ID
    event.params.to // Delegate address (to)
  );

  // Create a new Transfer entity with the unique ID
  let transfer = new Transfer(id);
  transfer.dao = dao.id; // Reference the DAO entity
  transfer.transferId = event.params._event.logIndex;
  transfer.transfers = transfer.id; // Reference the Transfer entity itself
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

  // Update the DelegateTracker fields for 'from' address
  fromDelegateTracker.balance = fromDelegateTracker.balance.minus(
    event.params.amount
  );
  fromDelegateTracker.transferCount = fromDelegateTracker.transferCount.plus(
    BigInt.fromI32(1)
  );

  // Update the DelegateTracker fields for 'to' address
  toDelegateTracker.balance = toDelegateTracker.balance.plus(
    event.params.amount
  );
  toDelegateTracker.transferCount = toDelegateTracker.transferCount.plus(
    BigInt.fromI32(1)
  );

  // Save the updated DAO and DelegateTracker entities to the data store
  dao.save();
  fromDelegateTracker.save();
  toDelegateTracker.save();

  // Return the created Transfer entity
  return transfer;
}
