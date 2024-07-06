// /subgraph/utils/entities.ts

/**import { BigInt, Bytes } from "@graphprotocol/graph-ts";

// Interfaces for UniGovAccount entity
export interface UniGovAccount {
  id: string; // Unique identifier for the account
  balance: BigInt; // Current balance of the account
  totalApprovals: BigInt; // Total approvals made by the account
  totalTransfers: BigInt; // Total transfers involving the account
  delegatedVotes: BigInt; // Votes delegated by the account
  delegate: Bytes; // Current delegate of the account
  ownerApprovals: UniGovApproval[]; // Approvals made by this account
  involvedTransfersFrom: UniGovTransfer[]; // Transfers where this account is the sender
  involvedTransfersTo: UniGovTransfer[]; // Transfers where this account is the receiver
  delegateChanges: UniGovDelegateChanged[]; // Changes in delegate for this account
  delegateVotesChanges: UniGovDelegateVotesChanged[]; // Changes in delegate votes for this account
  delegateHistory: UniGovDelegateHistory[]; // Historical delegates associated with this account
}

// Interfaces for CompGovAccount entity
export interface CompGovAccount {
  id: string; // Unique identifier for the account
  balance: BigInt; // Current balance of the account
  totalApprovals: BigInt; // Total approvals made by the account
  totalTransfers: BigInt; // Total transfers involving the account
  delegatedVotes: BigInt; // Votes delegated by the account
  delegate: Bytes; // Current delegate of the account
  ownerApprovals: CompGovApproval[]; // Approvals made by this account
  involvedTransfersFrom: CompGovTransfer[]; // Transfers where this account is the sender
  involvedTransfersTo: CompGovTransfer[]; // Transfers where this account is the receiver
  delegateHistory: CompGovDelegateHistory[]; // Historical delegates associated with this account
}

// Interfaces for UniGovTransfer entity
export interface UniGovTransfer {
  id: string; // Unique identifier for the transfer
  from: Bytes; // Sender of the transfer
  to: Bytes; // Receiver of the transfer
  amount: BigInt; // Amount transferred
  blockNumber: BigInt; // Block number when the transfer occurred
  blockTimestamp: BigInt; // Timestamp when the transfer occurred
  fromAccount: UniGovAccount[]; // Account entity for the sender
  toAccount: UniGovAccount[]; // Account entity for the receiver
}

// Interfaces for CompGovTransfer entity
export interface CompGovTransfer {
  id: string; // Unique identifier for the transfer
  from: Bytes; // Sender of the transfer
  to: Bytes; // Receiver of the transfer
  amount: BigInt; // Amount transferred
  blockNumber: BigInt; // Block number when the transfer occurred
  blockTimestamp: BigInt; // Timestamp when the transfer occurred
  fromAccount: CompGovAccount[]; // Account entity for the sender
  toAccount: CompGovAccount[]; // Account entity for the receiver
}

// Interfaces for UniGovApproval entity
export interface UniGovApproval {
  id: string; // Unique identifier for the approval
  spender: Bytes; // Spender of the approval
  amount: BigInt; // Approved amount
  blockNumber: BigInt; // Block number when the approval occurred
  blockTimestamp: BigInt; // Timestamp when the approval occurred
}

// Interfaces for CompGovApproval entity
export interface CompGovApproval {
  id: string; // Unique identifier for the approval
  spender: Bytes; // Spender of the approval
  amount: BigInt; // Approved amount
  blockNumber: BigInt; // Block number when the approval occurred
  blockTimestamp: BigInt; // Timestamp when the approval occurred
}

// Interfaces for UniGovDelegateChanged entity
export interface UniGovDelegateChanged {
  id: string; // Unique identifier for the delegate change
  delegator: Bytes; // Delegator involved in the change
  fromDelegate: Bytes; // Previous delegate
  toDelegate: Bytes; // New delegate
  blockNumber: BigInt; // Block number when the change occurred
  blockTimestamp: BigInt; // Timestamp when the change occurred
}

// Interfaces for CompGovDelegateChanged entity
export interface CompGovDelegateChanged {
  id: string; // Unique identifier for the delegate change
  delegator: Bytes; // Delegator involved in the change
  fromDelegate: Bytes; // Previous delegate
  toDelegate: Bytes; // New delegate
  blockNumber: BigInt; // Block number when the change occurred
  blockTimestamp: BigInt; // Timestamp when the change occurred
  delegatorAccount: CompGovAccount[]; // Account entity for the delegator
}

// Interfaces for UniGovDelegateVotesChanged entity
export interface UniGovDelegateVotesChanged {
  id: string; // Unique identifier for the delegate votes change
  delegate: Bytes; // Delegate whose votes changed
  previousBalance: BigInt; // Previous balance of votes
  newBalance: BigInt; // New balance of votes
  blockNumber: BigInt; // Block number when the change occurred
  blockTimestamp: BigInt; // Timestamp when the change occurred
}

// Interfaces for CompGovDelegateVotesChanged entity
export interface CompGovDelegateVotesChanged {
  id: string; // Unique identifier for the delegate votes change
  delegate: Bytes; // Delegate whose votes changed
  previousBalance: BigInt; // Previous balance of votes
  newBalance: BigInt; // New balance of votes
  blockNumber: BigInt; // Block number when the change occurred
  blockTimestamp: BigInt; // Timestamp when the change occurred
}

// Interfaces for UniGovDelegateHistory entity
export interface UniGovDelegateHistory {
  id: string; // Unique identifier for the delegate history entry
  account: UniGovAccount; // Account associated with the delegate history
  delegate: Bytes; // Delegate associated with the account at this point in history
  blockNumber: BigInt; // Block number when this history entry occurred
  blockTimestamp: BigInt; // Timestamp when this history entry occurred
}

// Interfaces for CompGovDelegateHistory entity
export interface CompGovDelegateHistory {
  id: string; // Unique identifier for the delegate history entry
  account: CompGovAccount; // Account associated with the delegate history
  delegate: Bytes; // Delegate associated with the account at this point in history
  blockNumber: BigInt; // Block number when this history entry occurred
  blockTimestamp: BigInt; // Timestamp when this history entry occurred
}
**/
