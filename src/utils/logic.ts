// Importing necessary types and classes from the @graphprotocol/graph-ts library
import { BigInt, Bytes, Address } from "@graphprotocol/graph-ts";
import { DAO, DelegateTracker, ProposalCreated } from "../../generated/schema";

// Function to get or create a DAO entity and return it
export function getOrCreateDAO(id: Bytes): DAO {
  // Load DAO entity from the graph datastore using its ID
  let dao = DAO.load(id.toHexString());

  // If DAO entity doesn't exist, create a new one
  if (!dao) {
    dao = new DAO(id.toHexString()); // Instantiate new DAO entity with the provided ID
    dao.totalProposals = BigInt.fromI32(0); // Initialize totalProposals count as BigInt 0
    dao.totalVotesCast = BigInt.fromI32(0); // Initialize totalVotesCast count as BigInt 0
    dao.totalDelegatedVotesReceived = BigInt.fromI32(0); // Initialize totalDelegatedVotesReceived count as BigInt 0
    dao.totalDelegatedVotesGiven = BigInt.fromI32(0); // Initialize totalDelegatedVotesGiven count as BigInt 0
    dao.totalTransfers = BigInt.fromI32(0); // Initialize totalTransfers count as BigInt 0
    dao.totalAmountTransferred = BigInt.fromI32(0); // Initialize totalAmountTransferred count as BigInt 0
    dao.totalDelegateChanges = BigInt.fromI32(0); // Initialize totalDelegateChanges count as BigInt 0
    dao.averageVotesPerProposal = BigInt.fromI32(0); // Initialize averageVotesPerProposal count as BigInt 0
    dao.uniqueVotersCount = BigInt.fromI32(0); // Initialize uniqueVotersCount as BigInt 0

    dao.save(); // Save the newly created DAO entity to the graph datastore
  }

  // Return the DAO entity (either loaded or newly created)
  return dao as DAO;
}

// Convert integer 1 to BigInt for increment operations
let increment = BigInt.fromI32(1);

// Function to increment proposal count
export function incrementProposalCount(dao: DAO): void {
  dao.totalProposals = dao.totalProposals.plus(increment); // Increment totalProposals count by 1
  dao.save(); // Save the updated DAO entity to the graph datastore
}

// Function to increment vote count
export function incrementVoteCount(dao: DAO): void {
  dao.totalVotesCast = dao.totalVotesCast.plus(increment); // Increment totalVotesCast count by 1
  dao.save(); // Save the updated DAO entity to the graph datastore
}

// Function to decrement proposal count
export function decrementProposalCount(dao: DAO): void {
  dao.totalProposals = dao.totalProposals.minus(increment); // Decrement totalProposals count by 1
  dao.save(); // Save the updated DAO entity to the graph datastore
}

// Helper function to calculate and update the average votes per proposal
export function updateAverageVotesPerProposal(proposal: ProposalCreated): void {
  // Check if the proposal is valid
  if (!proposal) {
    return; // Exit the function if the proposal is invalid
  }

  // Load the DAO entity associated with the proposal
  let dao = DAO.load(proposal.dao);

  // Check if the DAO entity exists
  if (!dao) {
    return; // Exit the function if the DAO entity is not found
  }

  // Calculate the total votes for the proposal
  let totalVotes = proposal.votesFor
    .plus(proposal.votesAgainst)
    .plus(proposal.votesAbstain);

  // Update the DAO entity with new values
  let totalProposals = dao.totalProposals;

  // Calculate the average votes per proposal
  if (totalProposals.equals(BigInt.fromI32(0))) {
    dao.averageVotesPerProposal = BigInt.fromI32(0); // Set average votes to 0 if there are no proposals
  } else {
    let totalVotesSum = dao.totalVotesCast.plus(totalVotes); // Sum of all votes cast
    dao.averageVotesPerProposal = totalVotesSum.div(totalProposals); // Calculate average votes per proposal
  }

  // Save the updated DAO entity
  dao.save();
}

// Function to get or create a DelegateTracker entity
export function getOrCreateDelegateTracker(
  daoId: string,
  delegateAddress: Bytes
): DelegateTracker {
  // Create a unique ID for the DelegateTracker entity by combining DAO ID and delegate address
  let id = daoId + "-" + delegateAddress.toHex();
  // Load DelegateTracker entity from the graph datastore using its ID
  let delegateTracker = DelegateTracker.load(id);

  // If DelegateTracker entity doesn't exist, create a new one
  if (delegateTracker == null) {
    delegateTracker = new DelegateTracker(id); // Instantiate new DelegateTracker entity with the unique ID
    delegateTracker.dao = daoId; // Assign the DAO ID
    delegateTracker.balance = BigInt.zero(); // Initialize balance with zero
    delegateTracker.changeCount = BigInt.zero(); // Initialize changeCount with zero
    delegateTracker.voteCount = BigInt.zero(); // Initialize voteCount with zero
    delegateTracker.transferCount = BigInt.zero(); // Initialize transferCount with zero

    delegateTracker.save(); // Save the newly created DelegateTracker entity to the graph datastore
  }

  // Return the DelegateTracker entity (either loaded or newly created)
  return delegateTracker as DelegateTracker;
}

// Convert the targets array (Address[]) from the event to an array of Bytes[]
// The targets field in the event parameters is of type Address[]
// You need to convert each Address[] to Bytes[].
// Function to convert an array of Address objects to an array of Bytes objects
export function convertAddressesToBytesArray(addresses: Address[]): Bytes[] {
  // Initialize an empty array to hold the converted Bytes objects
  let bytesArray: Bytes[] = [];

  // Loop through each Address in the input array
  for (let i = 0; i < addresses.length; i++) {
    // Convert the Address to a hex string, then to a Bytes object, and add it to the bytesArray
    bytesArray.push(Bytes.fromHexString(addresses[i].toHexString()));
  }

  // Return the array of Bytes objects
  return bytesArray;
}

// Function to return an array of BigInt objects as is
export function convertValuesToBigIntArray(values: BigInt[]): BigInt[] {
  // Directly return the input array without any modification
  return values; // No need to convert, just return the array as is
}

// Function to convert an array of Bytes objects to an array of Bytes objects
export function convertCallDataToBytesArray(values: Bytes[]): Bytes[] {
  // Initialize an empty array to hold the Bytes objects
  let calldatasBytes: Bytes[] = [];

  // Loop through each Bytes object in the input array
  for (let i = 0; i < values.length; i++) {
    // Add each Bytes object to the calldatasBytes array
    calldatasBytes.push(values[i]);
  }

  // Return the array of Bytes objects
  return calldatasBytes;
}

// Function to convert an array of string objects to an array of string objects
export function convertStringsToStringsArray(strings: string[]): string[] {
  // Initialize an empty array to hold the strings
  let stringsArray: string[] = [];

  // Loop through each string in the input array
  for (let i = 0; i < strings.length; i++) {
    // Add each string to the stringsArray
    stringsArray.push(strings[i]);
  }

  // Return the array of strings
  return stringsArray;
}
