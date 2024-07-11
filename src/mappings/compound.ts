import {
  Approval as CompApprovalEvent,
  Transfer as CompTransferEvent,
  DelegateChanged as CompDelegateChangedEvent,
  DelegateVotesChanged as CompDelegateVotesChangedEvent,
} from "../../generated/CompoundGovernance/CompoundGovernance";

import {
  handleCompGovApproval,
  handleCompGovTransfer,
  handleCompGovDelegateChanged,
  handleCompGovDelegateVotesChanged,
} from "../utils/compHelpers";

export function handleApproval(event: CompApprovalEvent): void {
  handleCompGovApproval(event);
}

export function handleDelegateChanged(event: CompDelegateChangedEvent): void {
  handleCompGovDelegateChanged(event);
}

export function handleDelegateVotesChanged(
  event: CompDelegateVotesChangedEvent
): void {
  handleCompGovDelegateVotesChanged(event);
}

export function handleTransfer(event: CompTransferEvent): void {
  handleCompGovTransfer(event);
}

/**Handler for the Approval event
export function handleApproval(event: ApprovalEvent): void {
  // Load or create the owner account
  let ownerAccount = createOrLoadCompAccount(event.params.owner);
  // Increment the total number of approvals for this account
  ownerAccount.totalApprovals = ownerAccount.totalApprovals.plus(
    BigInt.fromI32(1)
  );
  ownerAccount.save();

  // Create a new approval entity
  let approval = new CompGovApproval(event.transaction.hash.toHex());
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
  let delegateChange = new CompGovDelegateChanged(
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
  let delegateVotesChange = new CompGovDelegateVotesChanged(
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
  let fromAccount = createOrLoadCompAccount(event.params.from);
  fromAccount.totalTransfers = fromAccount.totalTransfers.plus(
    BigInt.fromI32(1)
  );
  fromAccount.balance = fromAccount.balance.minus(event.params.amount);
  fromAccount.save();

  // Load or create the recipient account
  let toAccount = createOrLoadCompAccount(event.params.to);
  toAccount.totalTransfers = toAccount.totalTransfers.plus(BigInt.fromI32(1));
  toAccount.balance = toAccount.balance.plus(event.params.amount);
  toAccount.save();

  // Create a new transfer entity
  let transfer = new CompGovTransfer(event.transaction.hash.toHex());
  transfer.fromAccount = fromAccount.id;
  transfer.toAccount = toAccount.id;
  transfer.amount = event.params.amount;
  transfer.blockNumber = event.block.number;
  transfer.blockTimestamp = event.block.timestamp;
  transfer.save();
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
