import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts";
import {
  UniGovAccount,
  UniGovApproval,
  UniGovTransfer,
  UniGovDelegateChanged,
  UniGovDelegateVotesChanged,
  VoteBalance as UniVoteBalance,
} from "../../generated/schema";
import {
  Approval as ApprovalEvent,
  Transfer as TransferEvent,
  DelegateChanged as DelegateChangedEvent,
  DelegateVotesChanged as DelegateVotesChangedEvent,
} from "../../generated/UniGovernance/UniGovernance";

// Helper function to create or load an account for UniGov
export function createOrLoadUniAccount(accountAddress: Address): UniGovAccount {
  let account = UniGovAccount.load(accountAddress.toHex());
  if (!account) {
    account = new UniGovAccount(accountAddress.toHex());
    account.balance = BigInt.fromI32(0);
    account.totalApprovals = BigInt.fromI32(0);
    account.totalTransfers = BigInt.fromI32(0);
    account.delegatedVotes = BigInt.fromI32(0); // Initialize delegatedVotes
    account.delegate = Bytes.fromHexString(
      "0x0000000000000000000000000000000000000000"
    ) as Bytes; // Initialize delegate with zero address
  } else if (account.delegate.equals(Bytes.fromHexString("0x"))) {
    account.delegate = Bytes.fromHexString(
      "0x0000000000000000000000000000000000000000"
    ) as Bytes; // Ensure delegate is set to zero address if uninitialized
  }
  return account as UniGovAccount;
}

// Helper function to create or load a VoteBalance entity for UniGov
export function createOrLoadVoteBalance(
  accountAddress: Address,
  entityName: string
): UniVoteBalance {
  let voteBalance: UniVoteBalance;
  voteBalance = UniVoteBalance.load(accountAddress.toHex()) as UniVoteBalance;
  if (!voteBalance) {
    voteBalance = new UniVoteBalance(accountAddress.toHex());
    voteBalance.balance = BigInt.fromI32(0);
    voteBalance.delegatedVotes = BigInt.fromI32(0);
    voteBalance.yesVotes = BigInt.fromI32(0); // Initialize yesVotes
    // Initialize other fields as needed for UniGov
  }
  return voteBalance;
}

// Helper function to handle UniGovApproval event
export function handleUniGovApproval(event: ApprovalEvent): void {
  // Generate a unique ID for the approval event
  let approvalId =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Create a new approval entity
  let approval = new UniGovApproval(approvalId);

  // Load or create the UniGovAccount entity for the owner of the approval
  let ownerAccount = createOrLoadUniAccount(event.params.owner);

  // Update VoteBalance entity for the owner of the approval
  let ownerVoteBalance = createOrLoadVoteBalance(event.params.owner, "UniGov");
  ownerVoteBalance.totalApprovals = ownerVoteBalance.totalApprovals.plus(
    BigInt.fromI32(1)
  );
  ownerVoteBalance.save();

  // Increment the totalApprovals for the owner account
  ownerAccount.totalApprovals = ownerAccount.totalApprovals.plus(
    BigInt.fromI32(1)
  );
  ownerAccount.save();

  // Set approval fields
  approval.ownerAccount = ownerAccount.id;
  approval.spender = event.params.spender;
  approval.amount = event.params.amount;
  approval.blockNumber = event.block.number;
  approval.blockTimestamp = event.block.timestamp;
  approval.save();
}

// Helper function to handle UniGovTransfer event
export function handleUniGovTransfer(event: TransferEvent): void {
  // Generate a unique ID for the transfer event
  let transferId =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Create a new transfer entity
  let transfer = new UniGovTransfer(transferId);

  // Load or create the UniGovAccount entities for the sender and receiver
  let senderAccount = createOrLoadUniAccount(event.params.from);
  let receiverAccount = createOrLoadUniAccount(event.params.to);

  // Update VoteBalance entities for the sender and receiver
  let senderVoteBalance = createOrLoadVoteBalance(event.params.from, "UniGov");
  let receiverVoteBalance = createOrLoadVoteBalance(event.params.to, "UniGov");
  senderVoteBalance.totalTransfers = senderVoteBalance.totalTransfers.plus(
    BigInt.fromI32(1)
  );
  receiverVoteBalance.totalTransfers = receiverVoteBalance.totalTransfers.plus(
    BigInt.fromI32(1)
  );
  senderVoteBalance.balance = senderVoteBalance.balance.minus(
    event.params.amount
  );
  receiverVoteBalance.balance = receiverVoteBalance.balance.plus(
    event.params.amount
  );
  senderVoteBalance.save();
  receiverVoteBalance.save();

  // Increment the totalTransfers for the sender and receiver accounts
  senderAccount.totalTransfers = senderAccount.totalTransfers.plus(
    BigInt.fromI32(1)
  );
  receiverAccount.totalTransfers = receiverAccount.totalTransfers.plus(
    BigInt.fromI32(1)
  );
  senderAccount.balance = senderAccount.balance.minus(event.params.amount);
  receiverAccount.balance = receiverAccount.balance.plus(event.params.amount);
  senderAccount.save();
  receiverAccount.save();

  // Set transfer fields
  transfer.fromAccount = senderAccount.id;
  transfer.toAccount = receiverAccount.id;
  transfer.amount = event.params.amount;
  transfer.blockNumber = event.block.number;
  transfer.blockTimestamp = event.block.timestamp;
  transfer.save();
}

// Helper function to handle UniGovDelegateChanged event
export function handleUniGovDelegateChanged(event: DelegateChangedEvent): void {
  // Create a unique ID for the delegate changed event
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Create a new delegate changed entity
  let delegateChanged = new UniGovDelegateChanged(id);
  delegateChanged.delegator = event.params.delegator;
  delegateChanged.fromDelegate = event.params.fromDelegate;
  delegateChanged.toDelegate = event.params.toDelegate;
  delegateChanged.blockNumber = event.block.number;
  delegateChanged.blockTimestamp = event.block.timestamp;
  delegateChanged.save();

  // Update delegate field in UniGovAccount entities
  let delegatorAccount = createOrLoadUniAccount(event.params.delegator);
  delegatorAccount.delegate = event.params.toDelegate;
  delegatorAccount.save();

  // Update VoteBalance entities for from and to delegates
  let fromVoteBalance = createOrLoadVoteBalance(
    event.params.fromDelegate,
    "UniGov"
  );
  let toVoteBalance = createOrLoadVoteBalance(
    event.params.toDelegate,
    "UniGov"
  );

  // Adjust the vote balances based on your contract's logic
  // Example: Decrease fromDelegate's vote balance and increase toDelegate's vote balance
  fromVoteBalance.delegatedVotes = fromVoteBalance.delegatedVotes.minus(
    BigInt.fromI32(1)
  );
  toVoteBalance.delegatedVotes = toVoteBalance.delegatedVotes.plus(
    BigInt.fromI32(1)
  );

  fromVoteBalance.save();
  toVoteBalance.save();
}

// Helper function to handle UniGovDelegateVotesChanged event
export function handleUniGovDelegateVotesChanged(
  event: DelegateVotesChangedEvent
): void {
  // Create a unique ID for the delegate votes changed event
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Create a new delegate votes changed entity
  let delegateVotesChanged = new UniGovDelegateVotesChanged(id);
  delegateVotesChanged.delegate = event.params.delegate;
  delegateVotesChanged.previousBalance = event.params.previousBalance;
  delegateVotesChanged.newBalance = event.params.newBalance;
  delegateVotesChanged.blockNumber = event.block.number;
  delegateVotesChanged.blockTimestamp = event.block.timestamp;
  delegateVotesChanged.save();

  // Update VoteBalance entity for the delegate
  let delegateVoteBalance = createOrLoadVoteBalance(
    event.params.delegate,
    "UniGov"
  );
  delegateVoteBalance.delegatedVotes = event.params.newBalance;
  delegateVoteBalance.save();
}
