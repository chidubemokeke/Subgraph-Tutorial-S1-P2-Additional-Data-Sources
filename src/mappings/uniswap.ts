import { BigInt } from "@graphprotocol/graph-ts";
import {
  UniGovApproval,
  UniGovDelegateChanged,
  UniGovDelegateVotesChanged,
  UniGovTransfer,
} from "../../generated/schema"; // Importing generated schema entities
import {
  Approval as ApprovalEvent,
  DelegateChanged as DelegateChangedEvent,
  DelegateVotesChanged as DelegateVotesChangedEvent,
  Transfer as TransferEvent,
} from "../../generated/UniGovernance/UniGovernance"; // Importing specific event types from generated artifacts

import { createOrLoadUniAccount } from "../utils/helpers";

// Handler for the Approval event
export function handleApproval(event: ApprovalEvent): void {
  // Load or create the owner account
  let ownerAccount = createOrLoadUniAccount(event.params.owner);
  // Increment the total number of approvals for this account
  ownerAccount.totalApprovals = ownerAccount.totalApprovals.plus(
    BigInt.fromI32(1)
  ); // Convert 1 to BigInt
  ownerAccount.save();

  // Create a new approval entity
  let approval = new UniGovApproval(event.transaction.hash.toHex());
  approval.ownerAccount = ownerAccount.id;
  approval.spender = event.params.spender;
  approval.amount = event.params.amount;
  approval.blockNumber = event.block.number;
  approval.blockTimestamp = event.block.timestamp;
  approval.save();
}

// Handler for the DelegateChanged event
export function handleDelegateChanged(event: DelegateChangedEvent): void {
  // Create a new delegate change entity
  let delegateChange = new UniGovDelegateChanged(
    event.transaction.hash.toHex()
  );
  delegateChange.delegator = event.params.delegator;
  delegateChange.fromDelegate = event.params.fromDelegate;
  delegateChange.toDelegate = event.params.toDelegate;
  delegateChange.blockNumber = event.block.number;
  delegateChange.blockTimestamp = event.block.timestamp;
  delegateChange.save();
}

// Handler for the DelegateVotesChanged event
export function handleDelegateVotesChanged(
  event: DelegateVotesChangedEvent
): void {
  // Create a new delegate votes change entity
  let delegateVotesChange = new UniGovDelegateVotesChanged(
    event.transaction.hash.toHex()
  );
  delegateVotesChange.delegate = event.params.delegate;
  delegateVotesChange.previousBalance = event.params.previousBalance;
  delegateVotesChange.newBalance = event.params.newBalance;
  delegateVotesChange.blockNumber = event.block.number;
  delegateVotesChange.blockTimestamp = event.block.timestamp;
  delegateVotesChange.save();
}

// Handler for the Transfer event
export function handleTransfer(event: TransferEvent): void {
  // Load or create the sender account
  let fromAccount = createOrLoadUniAccount(event.params.from);
  fromAccount.totalTransfers = fromAccount.totalTransfers.plus(
    BigInt.fromI32(1)
  );
  fromAccount.balance = fromAccount.balance.minus(event.params.amount);
  fromAccount.save();

  // Load or create the recipient account
  let toAccount = createOrLoadUniAccount(event.params.to);
  toAccount.totalTransfers = toAccount.totalTransfers.plus(BigInt.fromI32(1));
  toAccount.balance = toAccount.balance.plus(event.params.amount);
  toAccount.save();

  // Create a new transfer entity
  let transfer = new UniGovTransfer(event.transaction.hash.toHex());
  transfer.fromAccount = fromAccount.id;
  transfer.toAccount = toAccount.id;
  transfer.amount = event.params.amount;
  transfer.blockNumber = event.block.number;
  transfer.blockTimestamp = event.block.timestamp;
  transfer.save();
}

/**Handler function for UniGovApproval events
export function handleApproval(event: ApprovalEvent): void {
  // Generate a unique ID for UniGovApproval entity using transaction hash and log index
  let approvalId =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  let approval = new UniGovApproval(approvalId);

  // Populate fields of UniGovApproval entity from event parameters
  approval.ownerAccount = event.params.owner.toHex();
  approval.spender = event.params.spender;
  approval.amount = event.params.amount;
  approval.blockNumber = event.block.number;
  approval.blockTimestamp = event.block.timestamp;
  approval.save(); // Save UniGovApproval entity to the Graph's database

  // Load or create UniGovAccount entity associated with the owner
  let account = loadOrCreateUniGovAccount(event.params.owner);
  account.totalApprovals = account.totalApprovals.plus(BigInt.fromI32(1)); // Increment totalApprovals count
  account.save(); // Save UniGovAccount entity
}

// Mapping function for handling DelegateChanged events
export function handleDelegateChanged(event: DelegateChangedEvent): void {
  let delegateChange = new UniGovDelegateChanged(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  delegateChange.delegator = event.params.delegator; // Set the delegator address
  delegateChange.fromDelegate = event.params.fromDelegate; // Set the previous delegate address
  delegateChange.toDelegate = event.params.toDelegate; // Set the new delegate address
  delegateChange.blockNumber = event.block.number; // Set the block number
  delegateChange.blockTimestamp = event.block.timestamp; // Set the block timestamp
  delegateChange.save(); // Save the delegate change entity
}

// Mapping function for handling DelegateVotesChanged events
export function handleDelegateVotesChanged(
  event: DelegateVotesChangedEvent
): void {
  let votesChange = new UniGovDelegateVotesChanged(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  votesChange.delegate = event.params.delegate; // Set the delegate address
  votesChange.previousBalance = event.params.previousBalance; // Set the previous balance of votes
  votesChange.newBalance = event.params.newBalance; // Set the new balance of votes
  votesChange.blockNumber = event.block.number; // Set the block number
  votesChange.blockTimestamp = event.block.timestamp; // Set the block timestamp
  votesChange.save(); // Save the delegate votes change entity
}

// Handler function for UniGovTransfer events
export function handleTransfer(event: TransferEvent): void {
  // Generate a unique ID for UniGovTransfer entity using transaction hash and log index
  let transferId =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  let transfer = new UniGovTransfer(transferId);

  // Populate fields of UniGovTransfer entity from event parameters
  transfer.fromAccount = event.params.from.toHex();
  transfer.toAccount = event.params.to.toHex();
  transfer.amount = event.params.amount;
  transfer.blockNumber = event.block.number;
  transfer.blockTimestamp = event.block.timestamp;
  transfer.save(); // Save UniGovTransfer entity

  // Load or create UniGovAccount entity associated with the fromAccount
  let fromAccount = loadOrCreateUniGovAccount(event.params.from);
  fromAccount.balance = fromAccount.balance.minus(event.params.amount); // Update balance
  fromAccount.totalTransfers = fromAccount.totalTransfers.plus(
    BigInt.fromI32(1)
  ); // Increment totalTransfers count
  fromAccount.save(); // Save UniGovAccount entity

  // Load or create UniGovAccount entity associated with the toAccount
  let toAccount = loadOrCreateUniGovAccount(event.params.to);
  toAccount.balance = toAccount.balance.plus(event.params.amount); // Update balance
  toAccount.totalTransfers = toAccount.totalTransfers.plus(BigInt.fromI32(1)); // Increment totalTransfers count
  toAccount.save(); // Save UniGovAccount entity
}

/**import { Bytes } from "@graphprotocol/graph-ts";
import {
  Transfer as TransferEvent,
  Approval as ApprovalEvent,
  DelegateChanged as DelegateChangedEvent,
  DelegateVotesChanged as DelegateVotesChangedEvent,
} from "../../generated/UniGovernance/UniGovernance";


import {
  getOrCreateUniGovAccount,
  updateUniGovAccountBalanceAndTransfers,
  createUniGovApprovalEntity,
  createUniGovDelegateChanged,
  createUniGovDelegateVotesChanged,
  createUniGovTransferEntity,
} from "../utils/uniHelper";

// Event handler for Transfer events
export function handleTransfer(event: TransferEvent): void {
  let fromAccount = getOrCreateUniGovAccount(
    event.params.from.toHex(),
    Bytes.empty()
  );
  let toAccount = getOrCreateUniGovAccount(
    event.params.to.toHex(),
    Bytes.empty()
  );

  // Update the sender's account
  updateUniGovAccountBalanceAndTransfers(
    fromAccount,
    event.params.amount,
    true
  );

  // Update the receiver's account
  updateUniGovAccountBalanceAndTransfers(toAccount, event.params.amount, false);

  // Create and save the transfer entity
  createUniGovTransferEntity(
    event.transaction.hash,
    event.logIndex,
    event.params.from,
    event.params.to,
    event.params.amount,
    event.block.number,
    event.block.timestamp
  );
}

// Event handler for Approval events
export function handleApproval(event: ApprovalEvent): void {
  // Create and save the approval entity
  createUniGovApprovalEntity(
    event.transaction.hash,
    event.logIndex,
    event.params.spender,
    event.params.amount,
    event.block.number,
    event.block.timestamp
  );
}

// Event handler for DelegateChanged events
export function handleDelegateChanged(event: DelegateChangedEvent): void {
  // Create and save the delegate changed entity
  createUniGovDelegateChanged(
    event.transaction.hash,
    event.logIndex,
    event.params.delegator,
    event.params.fromDelegate,
    event.params.toDelegate,
    event.block
  );
}

// Event handler for DelegateVotesChanged events
export function handleDelegateVotesChanged(
  event: DelegateVotesChangedEvent
): void {
  // Create and save the delegate votes changed entity
  createUniGovDelegateVotesChanged(
    event.transaction.hash,
    event.logIndex,
    event.params.delegate,
    event.params.previousBalance,
    event.params.newBalance,
    event.block
  );
}**/
