import { Bytes } from "@graphprotocol/graph-ts";
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
} from "../utils/unihelper";

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
}
