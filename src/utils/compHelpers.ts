import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts";
import {
  CompGovAccount,
  CompGovApproval,
  CompGovTransfer,
  CompGovDelegateChanged,
  CompGovDelegateVotesChanged,
  VoteBalance as CompVoteBalance,
} from "../../generated/schema";
import {
  Approval as ApprovalEvent,
  Transfer as TransferEvent,
  DelegateChanged as DelegateChangedEvent,
  DelegateVotesChanged as DelegateVotesChangedEvent,
} from "../../generated/CompoundGovernance/CompoundGovernance";

// Helper function to create or load an account for CompGov
export function createOrLoadCompAccount(
  accountAddress: Address
): CompGovAccount {
  let account = CompGovAccount.load(accountAddress.toHex());
  if (!account) {
    account = new CompGovAccount(accountAddress.toHex());
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
  return account as CompGovAccount;
}

// Helper function to create or load a VoteBalance entity for CompGov
export function createOrLoadVoteBalance(
  accountAddress: Address,
  entityName: string
): CompVoteBalance {
  let voteBalance: CompVoteBalance;
  voteBalance = CompVoteBalance.load(accountAddress.toHex()) as CompVoteBalance;
  if (!voteBalance) {
    voteBalance = new CompVoteBalance(accountAddress.toHex());
    voteBalance.balance = BigInt.fromI32(0);
    voteBalance.delegatedVotes = BigInt.fromI32(0);
    voteBalance.yesVotes = BigInt.fromI32(0); // Initialize yesVotes
    // Initialize other fields as needed for CompGov
  }
  return voteBalance;
}

// Helper function to handle CompGovApproval event
export function handleCompGovApproval(event: ApprovalEvent): void {
  // Generate a unique ID for the approval event
  let approvalId =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Create a new approval entity
  let approval = new CompGovApproval(approvalId);

  // Load or create the CompGovAccount entity for the owner of the approval
  let ownerAccount = createOrLoadCompAccount(event.params.owner);

  // Update VoteBalance entity for the owner of the approval
  let ownerVoteBalance = createOrLoadVoteBalance(event.params.owner, "CompGov");
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

// Helper function to handle CompGovTransfer event
export function handleCompGovTransfer(event: TransferEvent): void {
  // Generate a unique ID for the transfer event
  let transferId =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Create a new transfer entity
  let transfer = new CompGovTransfer(transferId);

  // Load or create the CompGovAccount entities for the sender and receiver
  let senderAccount = createOrLoadCompAccount(event.params.from);
  let receiverAccount = createOrLoadCompAccount(event.params.to);

  // Update VoteBalance entities for the sender and receiver
  let senderVoteBalance = createOrLoadVoteBalance(event.params.from, "CompGov");
  let receiverVoteBalance = createOrLoadVoteBalance(event.params.to, "CompGov");
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

// Helper function to handle CompGovDelegateChanged event
export function handleCompGovDelegateChanged(
  event: DelegateChangedEvent
): void {
  // Create a unique ID for the delegate changed event
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Create a new delegate changed entity
  let delegateChanged = new CompGovDelegateChanged(id);
  delegateChanged.delegate = event.params.delegator;
  delegateChanged.fromDelegate = event.params.fromDelegate;
  delegateChanged.toDelegate = event.params.toDelegate;
  delegateChanged.blockNumber = event.block.number;
  delegateChanged.blockTimestamp = event.block.timestamp;
  delegateChanged.save();

  // Update delegate field in CompGovAccount entities
  let delegatorAccount = createOrLoadCompAccount(event.params.delegator);
  delegatorAccount.delegate = event.params.toDelegate;
  delegatorAccount.save();

  // Update VoteBalance entities for from and to delegates
  let fromVoteBalance = createOrLoadVoteBalance(
    event.params.fromDelegate,
    "CompGov"
  );
  let toVoteBalance = createOrLoadVoteBalance(
    event.params.toDelegate,
    "CompGov"
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

// Helper function to handle CompGovDelegateVotesChanged event
export function handleCompGovDelegateVotesChanged(
  event: DelegateVotesChangedEvent
): void {
  // Create a unique ID for the delegate votes changed event
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Create a new delegate votes changed entity
  let delegateVotesChanged = new CompGovDelegateVotesChanged(id);
  delegateVotesChanged.delegate = event.params.delegate;
  delegateVotesChanged.previousBalance = event.params.previousBalance;
  delegateVotesChanged.newBalance = event.params.newBalance;
  delegateVotesChanged.blockNumber = event.block.number;
  delegateVotesChanged.blockTimestamp = event.block.timestamp;
  delegateVotesChanged.save();

  // Update VoteBalance entity for the delegate
  let delegateVoteBalance = createOrLoadVoteBalance(
    event.params.delegate,
    "CompGov"
  );
  delegateVoteBalance.delegatedVotes = event.params.newBalance;
  delegateVoteBalance.save();
}
