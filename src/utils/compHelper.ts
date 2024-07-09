import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { CompGovAccount } from "../../generated/schema";

// Helper function to get or create a CompGovAccount entity
export function loadOrCreateCompGovAccount(
  accountAddress: Address
): CompGovAccount {
  let account = CompGovAccount.load(accountAddress.toHex());
  if (!account) {
    account = new CompGovAccount(accountAddress.toHex());
    account.balance = BigInt.fromI32(0);
    account.totalApprovals = BigInt.fromI32(0);
    account.totalTransfers = BigInt.fromI32(0);
    account.delegatedVotes = BigInt.fromI32(0);
    account.delegate = accountAddress; // Set delegate field
  }
  return account as CompGovAccount;
}
/**import { Bytes, BigInt, ethereum } from "@graphprotocol/graph-ts";
import {
  CompGovAccount,
  CompGovApproval,
  CompGovDelegateChanged,
  CompGovDelegateVotesChanged,
  CompGovTransfer,
} from "../../generated/schema";

// Helper function to get or create a CompGovAccount entity
export function getOrCreateCompGovAccount(
  id: string, // Unique identifier for the account
  delegate: Bytes // Current delegate of the account
): CompGovAccount {
  // Try to load the CompGovAccount entity with the given id
  let account = CompGovAccount.load(id);

  // If the account doesn't exist, create a new one
  if (account == null) {
    account = new CompGovAccount(id);
    account.balance = BigInt.zero(); // Initialize balance to zero
    account.totalApprovals = BigInt.zero(); // Initialize total approvals to zero
    account.totalTransfers = BigInt.zero(); // Initialize total transfers to zero
    account.delegatedVotes = BigInt.zero(); // Initialize delegated votes to zero
    account.delegate = delegate; // Set the current delegate
  } else {
    // Update the existing account's delegate if necessary
    account.delegate = delegate;
  }

  return account as CompGovAccount; // Return the found or created CompGovAccount entity
}

// Helper function to update the account balance and transfer count
export function updateCompGovAccountBalanceAndTransfers(
  account: CompGovAccount, // The CompGovAccount entity to update
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
  account.save(); // Save the updated CompGovAccount entity to the store
}

// Helper function to create a new CompGovApproval entity
export function createCompGovApprovalEntity(
  txHash: Bytes, // Transaction hash associated with the approval event
  logIndex: BigInt, // Log index of the approval event
  spender: Bytes, // Spender who received the approval
  amount: BigInt, // Approved amount
  blockNumber: BigInt, // Block number when the approval occurred
  blockTimestamp: BigInt // Timestamp when the approval occurred
): void {
  // Create a unique ID for the CompGovApproval entity based on txHash and logIndex
  let id = txHash.toHex() + "-" + logIndex.toString();
  // Create a new CompGovApproval entity
  let approval = new CompGovApproval(id);
  approval.spender = spender;
  approval.amount = amount;
  approval.blockNumber = blockNumber;
  approval.blockTimestamp = blockTimestamp;

  // Save CompGovApproval entity
  approval.save();
}

// Helper function to create a new CompGovDelegateChanged entity
export function createCompGovDelegateChangedEntity(
  txHash: Bytes, // Transaction hash associated with the delegate change event
  logIndex: BigInt, // Log index of the delegate change event
  delegator: Bytes, // Account delegating their votes
  fromDelegate: Bytes, // Previous delegate
  toDelegate: Bytes, // New delegate
  block: ethereum.Block // Block information
): void {
  // Create a unique ID for the CompGovDelegateChanged entity based on txHash and logIndex
  let id = txHash.toHex() + "-" + logIndex.toString();
  // Create a new CompGovDelegateChanged entity
  let delegateChanged = new CompGovDelegateChanged(id);
  delegateChanged.delegator = delegator;
  delegateChanged.fromDelegate = fromDelegate;
  delegateChanged.toDelegate = toDelegate;
  delegateChanged.blockNumber = block.number;
  delegateChanged.blockTimestamp = block.timestamp;

  // Save CompGovDelegateChanged entity
  delegateChanged.save();
}

// Helper function to create a new CompGovDelegateVotesChanged entity
export function createCompGovDelegateVotesChanged(
  txHash: Bytes, // Transaction hash associated with the delegate votes changed event
  logIndex: BigInt, // Log index of the delegate votes changed event
  delegate: Bytes, // Delegate whose votes were changed
  previousBalance: BigInt, // Previous vote balance
  newBalance: BigInt, // New vote balance
  block: ethereum.Block // Block information
): void {
  // Create a unique ID for the CompGovDelegateVotesChanged entity based on txHash and logIndex
  let id = txHash.toHex() + "-" + logIndex.toString();
  // Create a new CompGovDelegateVotesChanged entity
  let delegateVotesChanged = new CompGovDelegateVotesChanged(id);
  delegateVotesChanged.delegate = delegate;
  delegateVotesChanged.previousBalance = previousBalance;
  delegateVotesChanged.newBalance = newBalance;
  delegateVotesChanged.blockNumber = block.number;
  delegateVotesChanged.blockTimestamp = block.timestamp;

  // Save CompGovDelegateVotesChanged entity
  delegateVotesChanged.save();
}

// Helper function to create a new CompGovTransfer entity
export function createCompGovTransferEntity(
  txHash: Bytes, // Transaction hash associated with the transfer event
  logIndex: BigInt, // Log index of the transfer event
  from: Bytes, // Sender of the transfer
  to: Bytes, // Receiver of the transfer
  amount: BigInt, // Amount transferred
  blockNumber: BigInt, // Block number when the transfer occurred
  blockTimestamp: BigInt // Timestamp when the transfer occurred
): void {
  // Create a unique ID for the CompGovTransfer entity based on txHash and logIndex
  let id = txHash.toHex() + "-" + logIndex.toString();
  // Create a new CompGovTransfer entity
  let transfer = new CompGovTransfer(id);
  transfer.from = from;
  transfer.to = to;
  transfer.amount = amount;
  transfer.blockNumber = blockNumber;
  transfer.blockTimestamp = blockTimestamp;
}

// Get or create the CompGovAccount entities for the sender and receiver
/**let fromAccount = getOrCreateCompGovAccount(
    from.toHexString(),
    Bytes.fromHexString("0x")
  );
  let toAccount = getOrCreateCompGovAccount(
    to.toHexString(),
    Bytes.fromHexString("0x")
  );

  // Update balances and transfer counts
  fromAccount.balance = fromAccount.balance.minus(amount);
  fromAccount.totalTransfers = fromAccount.totalTransfers.plus(
    BigInt.fromI32(1)
  );
  toAccount.balance = toAccount.balance.plus(amount);
  toAccount.totalTransfers = toAccount.totalTransfers.plus(BigInt.fromI32(1));

  // Save CompGovAccount entities
  fromAccount.save();
  toAccount.save();

  // Assign account IDs to transfer entity (wrapped in arrays as per schema)
  transfer.fromAccount.push(fromAccount.id); // Assuming fromAccount.id is an array as per schema
  transfer.toAccount.push(toAccount.id); // Assuming toAccount.id is an array as per schema

  // Save CompGovTransfer entity
  transfer.save();
}**/
