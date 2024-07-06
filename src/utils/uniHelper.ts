import { Bytes, BigInt, ethereum } from "@graphprotocol/graph-ts";
import {
  UniGovAccount,
  UniGovApproval,
  UniGovDelegateChanged,
  UniGovDelegateVotesChanged,
  UniGovTransfer,
} from "../../generated/schema";

// Helper function to get or create a UniGovAccount entity
export function getOrCreateUniGovAccount(
  id: string,
  delegate: Bytes
): UniGovAccount {
  let account = UniGovAccount.load(id);

  if (account == null) {
    account = new UniGovAccount(id);
    account.balance = BigInt.zero();
    account.totalApprovals = BigInt.zero();
    account.totalTransfers = BigInt.zero();
    account.delegatedVotes = BigInt.zero();
    account.delegate = delegate;
  } else {
    account.delegate = delegate;
  }

  return account as UniGovAccount;
}

// Helper function to update the account balance and transfer count
export function updateUniGovAccountBalanceAndTransfers(
  account: UniGovAccount, // The UniGovAccount entity to update
  amount: BigInt, // Amount to add or subtract from the balance
  isSender: boolean // Indicates if the account is the sender in a transfer
): void {
  // Adjust the balance based on whether the account is the sender or receiver
  if (isSender) {
    account.balance = account.balance.minus(amount); // Subtract the amount from the balance
  } else {
    account.balance = account.balance.plus(amount); // Add the amount to the balance
  }
  account.totalTransfers = account.totalTransfers.plus(BigInt.fromI32(1)); // Increment total transfers
  account.save(); // Save the updated UniGovAccount entity to the store
}

// Helper function to create a new UniGovApproval entity
export function createUniGovApprovalEntity(
  txHash: Bytes, // Transaction hash associated with the approval event
  logIndex: BigInt, // Log index of the approval event
  spender: Bytes, // Spender of the tokens being approved
  amount: BigInt, // Amount of tokens approved
  blockNumber: BigInt, // Block number when the approval occurred
  blockTimestamp: BigInt // Timestamp when the approval occurred
): void {
  // Create a unique ID for the UniGovApproval entity based on txHash and logIndex
  let id = txHash.toHex() + "-" + logIndex.toString();
  // Create a new UniGovApproval entity
  let approval = new UniGovApproval(id);
  approval.spender = spender; // Set the spender of the approval
  approval.amount = amount; // Set the approved amount
  approval.blockNumber = blockNumber; // Set the block number of the approval
  approval.blockTimestamp = blockTimestamp; // Set the block timestamp of the approval
  approval.save(); // Save the created UniGovApproval entity to the store
}

// Helper function to create a new UniGovDelegateChanged entity
export function createUniGovDelegateChanged(
  txHash: Bytes, // Transaction hash associated with the delegate change event
  logIndex: BigInt, // Log index of the delegate change event
  delegator: Bytes, // Delegator involved in the change
  fromDelegate: Bytes, // Previous delegate before the change
  toDelegate: Bytes, // New delegate after the change
  block: ethereum.Block // Ethereum block information when the delegate change occurred
): void {
  // Create a unique ID for the UniGovDelegateChanged entity based on txHash and logIndex
  let id = txHash.toHex() + "-" + logIndex.toString();
  // Create a new UniGovDelegateChanged entity
  let delegateChanged = new UniGovDelegateChanged(id);
  delegateChanged.delegator = delegator; // Set the delegator involved in the change
  delegateChanged.fromDelegate = fromDelegate; // Set the previous delegate
  delegateChanged.toDelegate = toDelegate; // Set the new delegate
  delegateChanged.blockNumber = block.number; // Set the block number of the delegate change
  delegateChanged.blockTimestamp = block.timestamp; // Set the block timestamp of the delegate change
  delegateChanged.save(); // Save the created UniGovDelegateChanged entity to the store
}

// Helper function to create a new UniGovDelegateVotesChanged entity
export function createUniGovDelegateVotesChanged(
  txHash: Bytes, // Transaction hash associated with the delegate votes change event
  logIndex: BigInt, // Log index of the delegate votes change event
  delegate: Bytes, // Delegate whose votes changed
  previousBalance: BigInt, // Previous balance of votes
  newBalance: BigInt, // New balance of votes
  block: ethereum.Block // Ethereum block information when the delegate votes change occurred
): void {
  // Create a unique ID for the UniGovDelegateVotesChanged entity based on txHash and logIndex
  let id = txHash.toHex() + "-" + logIndex.toString();
  // Create a new UniGovDelegateVotesChanged entity
  let delegateVotesChanged = new UniGovDelegateVotesChanged(id);
  delegateVotesChanged.delegate = delegate; // Set the delegate whose votes changed
  delegateVotesChanged.previousBalance = previousBalance; // Set the previous balance of votes
  delegateVotesChanged.newBalance = newBalance; // Set the new balance of votes
  delegateVotesChanged.blockNumber = block.number; // Set the block number of the delegate votes change
  delegateVotesChanged.blockTimestamp = block.timestamp; // Set the block timestamp of the delegate votes change
  delegateVotesChanged.save(); // Save the created UniGovDelegateVotesChanged entity to the store
}

export function createUniGovTransferEntity(
  txHash: Bytes, // Transaction hash associated with the transfer event
  logIndex: BigInt, // Log index of the transfer event
  from: Bytes, // Sender of the transfer
  to: Bytes, // Receiver of the transfer
  amount: BigInt, // Amount transferred
  blockNumber: BigInt, // Block number when the transfer occurred
  blockTimestamp: BigInt // Timestamp when the transfer occurred
): void {
  // Create a unique ID for the UniGovTransfer entity based on txHash and logIndex
  let id = txHash.toHex() + "-" + logIndex.toString();
  // Create a new UniGovTransfer entity
  let transfer = new UniGovTransfer(id);
  transfer.from = from; // Set the sender of the transfer
  transfer.to = to; // Set the receiver of the transfer
  transfer.amount = amount; // Set the amount transferred
  transfer.blockNumber = blockNumber; // Set the block number of the transfer
  transfer.blockTimestamp = blockTimestamp; // Set the block timestamp of the transfer
  transfer.save(); // Save the created UniGovTransfer entity to the store
}
