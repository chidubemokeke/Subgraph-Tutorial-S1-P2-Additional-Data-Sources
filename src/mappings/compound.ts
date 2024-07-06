import { Bytes } from "@graphprotocol/graph-ts";
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
}
