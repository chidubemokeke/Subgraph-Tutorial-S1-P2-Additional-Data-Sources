import { BigInt } from "@graphprotocol/graph-ts";
import {
  CompGovAccount,
  CompGovApproval,
  CompGovDelegateChanged,
  CompGovDelegateVotesChanged,
  CompGovTransfer,
} from "../../generated/schema";

import {
  Approval as ApprovalEvent,
  DelegateChanged as DelegateChangedEvent,
  DelegateVotesChanged as DelegateVotesChangedEvent,
  Transfer as TransferEvent,
} from "../../generated/CompoundGovernance/CompoundGovernance";

import { loadOrCreateCompGovAccount } from "../utils/compHelper";

// Handler function for CompGovApproval events
export function handleApproval(event: ApprovalEvent): void {
  let approval = new CompGovApproval(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  approval.ownerAccount = event.params.owner.toHex();
  approval.spender = event.params.spender;
  approval.amount = event.params.amount;
  approval.blockNumber = event.block.number;
  approval.blockTimestamp = event.block.timestamp;

  approval.save();

  let account = loadOrCreateCompGovAccount(event.params.owner);
  account.totalApprovals = account.totalApprovals.plus(BigInt.fromI32(1));
  account.save();
}

// Handler function for CompGovDelegateChanged events
export function handleDelegateChanged(event: DelegateChangedEvent): void {
  let delegateChanged = new CompGovDelegateChanged(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  delegateChanged.delegator = event.params.delegator;
  delegateChanged.fromDelegate = event.params.fromDelegate;
  delegateChanged.toDelegate = event.params.toDelegate;
  delegateChanged.blockNumber = event.block.number;
  delegateChanged.blockTimestamp = event.block.timestamp;

  delegateChanged.save();
}

// Handler function for CompGovDelegateVotesChanged events
export function handleDelegateVotesChanged(
  event: DelegateVotesChangedEvent
): void {
  let delegateVotesChanged = new CompGovDelegateVotesChanged(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  delegateVotesChanged.delegate = event.params.delegate;
  delegateVotesChanged.previousBalance = event.params.previousBalance;
  delegateVotesChanged.newBalance = event.params.newBalance;
  delegateVotesChanged.blockNumber = event.block.number;
  delegateVotesChanged.blockTimestamp = event.block.timestamp;

  delegateVotesChanged.save();
}

// Handler function for CompGovTransfer events
export function handleTransfer(event: TransferEvent): void {
  let transfer = new CompGovTransfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  transfer.fromAccount = event.params.from.toHex();
  transfer.toAccount = event.params.to.toHex();
  transfer.amount = event.params.amount;
  transfer.blockNumber = event.block.number;
  transfer.blockTimestamp = event.block.timestamp;

  transfer.save();

  let fromAccount = loadOrCreateCompGovAccount(event.params.from);
  fromAccount.balance = fromAccount.balance.minus(event.params.amount);
  fromAccount.totalTransfers = fromAccount.totalTransfers.plus(
    BigInt.fromI32(1)
  );
  fromAccount.save();

  let toAccount = loadOrCreateCompGovAccount(event.params.to);
  toAccount.balance = toAccount.balance.plus(event.params.amount);
  toAccount.totalTransfers = toAccount.totalTransfers.plus(BigInt.fromI32(1));
  toAccount.save();
}

/**import { Bytes } from "@graphprotocol/graph-ts";
import {
  Transfer as TransferEvent,
  Approval as ApprovalEvent,
  DelegateChanged as DelegateChangedEvent,
  DelegateVotesChanged as DelegateVotesChangedEvent,
} from "../../generated/CompoundGovernance/CompoundGovernance";
import {
  getOrCreateCompGovAccount,
  updateCompGovAccountBalanceAndTransfers,
  createCompGovTransferEntity,
  createCompGovApprovalEntity,
  createCompGovDelegateChangedEntity,
  createCompGovDelegateVotesChanged,
} from "../utils/compHelper";

export function handleTransfer(event: TransferEvent): void {
  let fromAccount = getOrCreateCompGovAccount(
    event.params.from.toHex(),
    Bytes.empty()
  );
  let toAccount = getOrCreateCompGovAccount(
    event.params.to.toHex(),
    Bytes.empty()
  );

  // Update the sender's account
  updateCompGovAccountBalanceAndTransfers(
    fromAccount,
    event.params.amount,
    true
  );

  // Update the receiver's account
  updateCompGovAccountBalanceAndTransfers(
    toAccount,
    event.params.amount,
    false
  );

  // Create and save the transfer entity
  createCompGovTransferEntity(
    event.transaction.hash,
    event.logIndex,
    event.params.from,
    event.params.to,
    event.params.amount,
    event.block.number,
    event.block.timestamp
  );
}

export function handleApproval(event: ApprovalEvent): void {
  // Create and save the approval entity
  createCompGovApprovalEntity(
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
  createCompGovDelegateChangedEntity(
    event.transaction.hash,
    event.logIndex,
    event.params.delegator,
    event.params.fromDelegate,
    event.params.toDelegate,
    event.block
  );
}

export function handleDelegateVotesChanged(
  event: DelegateVotesChangedEvent
): void {
  // Create and save the delegate votes changed entity
  createCompGovDelegateVotesChanged(
    event.transaction.hash,
    event.logIndex,
    event.params.delegate,
    event.params.previousBalance,
    event.params.newBalance,
    event.block
  );

  // Update the delegate's account if necessary
  let delegateAccount = getOrCreateCompGovAccount(
    event.params.delegate.toHex(),
    Bytes.empty()
  );

  delegateAccount.delegatedVotes = event.params.newBalance;
  delegateAccount.save();
}**/
