# Subgraph Tutorial - Part 2: Leveraging One Subgraph to Track Multiple Smart Contracts

Welcome back to our subgraph development masterclass! In [Part 1](https://github.com/chidubemokeke/Subgraph-Masterclass-S1-P1-ERC20/tree/main) and focus on managing complex data structures and entities within a single subgraph. We will use Compound Governance contracts as our use cases.

## Overview

[In Part 1](https://github.com/chidubemokeke/Subgraph-Masterclass-S1-P1-ERC20/tree/main), we covered the basics of subgraph development, including setting up a project and defining a schema. In this session, we will build on that foundation and delve into more advanced topics. We'll handle multiple smart contracts, incorporate custom logic, and use helper functions to manage data efficiently.

## Learning Objectives

By completing this tutorial, you will:

- **Understand Data Sources**: Extend your subgraph to monitor events from multiple smart contracts and learn how to integrate multiple data sources into your subgraph.
- **Implement Event Handlers**: Create event handlers for various contract events.
- **Utilize Helper Functions**: Understand the importance of helper functions by exploring and implementing advanced mapping functions to transform blockchain events into subgraph entities retrieval.
- **Gain insights**: into structuring GraphQL entities for comprehensive data representation.
- **Deploy**: an enhanced version of your subgraph capable of supporting more complex dApp functionalities.

## Prerequisites

Ensure you have completed [Part 1](https://github.com/chidubemokeke/Subgraph-Masterclass-S1-P1-ERC20/tree/main), of this masterclass and have the following installed:

- [Node.js](https://nodejs.org/) (version >= 16.0)
- [Yarn](https://yarnpkg.com/) package manager
- [Graph CLI](https://thegraph.com/docs/developer/cli) (installed globally)
- [The Graph Studio Account](https://thegraph.com/studio/)
- Basic understanding of GraphQL schema and mapping functions.

## Step-by-Step Guide

### Step 1: Using The Graph Studio

**Create a New Subgraph in The Graph Studio:**

- Navigate to The Graph Studio, sign in, and create a new subgraph.
- Enter the required details such as the subgraph name and description.
- You will receive a deploy key and subgraph slug (e.g., username/subgraph-name)
- Initialize your subgraph with the command from the studio.

```bash
graph init --studio <subgraph-name>
```

**Authenticate with The Graph Studio:**

- Copy the deploy key from The Graph Studio
- Run the following command in your terminal to authenticate:

```bash
graph auth --studio <ACCESS_TOKEN>
```

### Step 2: Project Structure

After initialization, your project directory should have the following structure:

```objectivec
my-subgraph/
├── abis/
│   ├── CGovernance.json
│   └── CToken.json
├── generated/
├── mappings/
│   ├── c-governance.ts
│   ├── c-token.ts
│   └── utils/
│       ├── govhelper.ts
│       ├── logic.ts
│       └── tokeGov.ts
├── schema.graphql
└── subgraph.yaml
```

- abis/: Directory containing JSON files for contract ABIs (CGovernance.json, CToken.json).
- generated/: Directory likely used for generated code or artifacts.
- mappings/: Directory for mapping scripts that define how Ethereum events are processed.
  - c-governance.ts: Mapping script for handling events related to CGovernance.
  - c-token.ts: Mapping script for handling events related to CToken.
- utils/: Subdirectory for utility scripts used within mappings.
  - govhelper.ts: Helper functions specific to governance-related mappings.
  - logic.ts: General utility functions used across different parts of the subgraph.
  - tokeGov.ts: Utility functions specific to token governance mappings.
- schema.graphql: GraphQL schema file defining entities and queries for the subgraph.
- subgraph.yaml: Configuration file defining the subgraph metadata, data sources, and mappings.

NOTE: This directory structure organizes your subgraph project into logical sections, separating contract ABIs, generated files, mappings with their respective utility scripts, and configuration files. Adjustments can be made as per your project's specific requirements and conventions.

### Step 2: Defining GraphQL Entities (schema.graphql)

In this section, we'll extend our GraphQL schema to include entities for managing DAO-related data. Open schema.graphql and add the following entities:

```gql
type DAO @entity {
  id: ID! # Unique identifier for each DAO entity
  totalProposals: BigInt! # Total number of proposals associated with the DAO
  totalVotesCast: BigInt! # Total number of votes cast across all proposals
  totalDelegatedVotesReceived: BigInt! # Total delegated votes received by the DAO
  totalDelegatedVotesGiven: BigInt! # Total delegated votes given out by the DAO
  proposals: [ProposalCreated!]! @derivedFrom(field: "dao") # Array of proposals created by the DAO, derived from the "dao" field in ProposalCreated
  activeMembers: [VoteCast!]! @derivedFrom(field: "activeMembers") # Array of votes cast by active members of the DAO
  canceled: [ProposalCanceled!] @derivedFrom(field: "dao") # Array of proposals canceled by the DAO, derived from the "dao" field in ProposalCanceled
  queued: [ProposalQueued!]! @derivedFrom(field: "dao") # Array of proposals queued by the DAO, derived from the "dao" field in ProposalQueued
  executed: [ProposalExecuted!]! @derivedFrom(field: "dao") # Array of proposals executed by the DAO, derived from the "dao" field in ProposalExecuted
}

type ProposalCreated @entity {
  id: ID! # Unique identifier for each ProposalCreated entity
  creationId: BigInt! # Unique identifier for the proposal creation event
  proposer: Bytes! # Address of the DAO account that initiated the proposal
  dao: DAO! # Reference to the DAO entity associated with this proposal
  targets: [Bytes!]! # Array of target addresses that the proposal interacts with
  values: [BigInt!]! # Array of values (amounts) sent to the targets
  signatures: [String!]! # Array of function signatures called on the targets
  calldatas: [Bytes!]! # Array of calldata bytes sent to the targets
  startBlock: BigInt! # Block number when the proposal starts
  endBlock: BigInt! # Block number when the proposal ends
  description: String! # Description of the proposal
  votesFor: BigInt! # Number of votes in favor of the proposal
  votesAgainst: BigInt! # Number of votes against the proposal
  votesAbstain: BigInt! # Number of votes abstaining from the proposal
  uniqueVoters: [Bytes!]! # Array of unique voter addresses who voted on the proposal
  executed: [ProposalExecuted!]! @derivedFrom(field: "proposal") # Array of ProposalExecuted entities derived from the "proposal" field in ProposalExecuted
  canceled: [ProposalCanceled!]! @derivedFrom(field: "proposal") # Array of ProposalCanceled entities derived from the "proposal" field in ProposalCanceled
  queued: [ProposalQueued!]! @derivedFrom(field: "proposal") # Array of ProposalQueued entities derived from the "proposal" field in ProposalQueued
  votes: [VoteCast!]! @derivedFrom(field: "voters") # Array of VoteCast entities derived from the "voters" field in VoteCast
}

type ProposalCanceled @entity {
  id: ID! # Unique identifier for each ProposalCanceled entity
  cancelId: BigInt! # Unique identifier for the proposal cancellation event
  proposal: ProposalCreated! # Reference to the ProposalCreated entity that was canceled
  dao: DAO! # Reference to the DAO entity associated with this cancellation
  blockNumber: BigInt! # Block number when the proposal was canceled
  blockTimestamp: BigInt! # Timestamp when the proposal was canceled
  transactionHash: Bytes! # Transaction hash for the cancellation event
}

type ProposalExecuted @entity {
  id: ID! # Unique identifier for each ProposalExecuted entity
  executionId: BigInt! # Unique identifier for the proposal execution event
  proposal: ProposalCreated! # Reference to the ProposalCreated entity that was executed
  dao: DAO! # Reference to the DAO entity associated with this execution
  blockNumber: BigInt! # Block number when the proposal was executed
  blockTimestamp: BigInt! # Timestamp when the proposal was executed
  transactionHash: Bytes! # Transaction hash for the execution event
}

type ProposalQueued @entity {
  id: ID! # Unique identifier for each ProposalQueued entity
  queueId: BigInt! # Unique identifier for the proposal queue event
  dao: DAO # Reference to the DAO entity associated with this queue event
  proposal: ProposalCreated! # Reference to the ProposalCreated entity that was queued
  eta: BigInt! # Estimated time of arrival for the proposal queue
  blockNumber: BigInt! # Block number when the proposal was queued
  blockTimestamp: BigInt! # Timestamp when the proposal was queued
  transactionHash: Bytes! # Transaction hash for the queue event
}

type VoteCast @entity {
  id: ID! # Unique identifier for each VoteCast entity
  voter: Bytes! # Address of the voter who cast the vote
  proposalId: BigInt! # Identifier of the proposal being voted on
  voters: ProposalCreated! # Reference to the ProposalCreated entity associated with this vote
  activeMembers: DAO! # Reference to the DAO entity of active members casting the vote
  support: Int! # Support type (0 - against, 1 - for, 2 - abstain)
  votes: BigInt! # Number of votes cast
  reason: String # Optional reason for the vote
  blockNumber: BigInt! # Block number when the vote was cast
  blockTimestamp: BigInt! # Timestamp when the vote was cast
  transactionHash: Bytes! # Transaction hash for the vote event
}

type DelegateChanged @entity {
  id: ID! # Unique identifier for each DelegateChanged entity
  delegator: Bytes! # Address of the delegator who changed delegate
  fromDelegate: Bytes! # Previous address of the delegate
  toDelegate: Bytes! # New address of the delegate
  blockNumber: BigInt! # Block number when the delegate change occurred
  blockTimestamp: BigInt! # Timestamp when the delegate change occurred
  transactionHash: Bytes! # Transaction hash for the delegate change event
}

type DelegateVotesChanged @entity {
  id: ID! # Unique identifier for each DelegateVotesChanged entity
  delegate: Bytes! # Address of the delegate whose votes changed
  previousBalance: BigInt! # Previous balance of the delegate's votes
  newBalance: BigInt! # New balance of the delegate's votes
  blockNumber: BigInt! # Block number when the votes change occurred
  blockTimestamp: BigInt! # Timestamp when the votes change occurred
  transactionHash: Bytes! # Transaction hash for the votes change event
}

type Transfer @entity {
  id: ID! # Unique identifier for each Transfer entity
  from: Bytes! # Address from which the tokens were transferred
  to: Bytes! # Address to which the tokens were transferred
  amount: BigInt! # Amount of tokens transferred
  blockNumber: BigInt! # Block number when the transfer occurred
  blockTimestamp: BigInt! # Timestamp when the transfer occurred
  transactionHash: Bytes! # Transaction hash for the transfer event
}
```

### Step 3: YAML Configuration (subgraph.yaml)

Update your subgraph.yaml file to include configurations for the new entities and data sources related to the DAO contracts. Here’s a snippet to guide you:

```yaml
specVersion: 0.0.5
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum
    name: CGovernance
    network: mainnet
    source:
      address: "0xc0Da02939E1441F497fd74F78cE7Decb17B66529"
      abi: CGovernance
      startBlock: 20046099
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.7
      language: wasm/assemblyscript
      entities:
        - ProposalCreated
        - VoteCast
        - ProposalCanceled
        - ProposalQueued
        - ProposalExecuted
      abis:
        - name: CGovernance
          file: ./abis/CGovernance.json
      eventHandlers:
        - event: ProposalCreated(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,string)
          handler: handleProposalCreated
        - event: VoteCast(indexed address,uint256,uint8,uint256,string)
          handler: handleVoteCast
        - event: ProposalCanceled(uint256)
          handler: handleProposalCanceled
        - event: ProposalQueued(uint256,uint256)
          handler: handleProposalQueued
        - event: ProposalExecuted(uint256)
          handler: handleProposalExecuted
      file: src/mappings/c-governance.ts
  - kind: ethereum
    name: CToken
    network: mainnet
    source:
      address: "0xc00e94Cb662C3520282E6f5717214004A7f26888"
      abi: CToken
      startBlock: 20046099
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.7
      language: wasm/assemblyscript
      entities:
        - DelegateChanged
        - DelegateVotesChanged
        - Transfer
      abis:
        - name: CToken
          file: ./abis/CToken.json
      eventHandlers:
        - event: DelegateChanged(indexed address,indexed address,indexed address)
          handler: handleDelegateChanged
        - event: DelegateVotesChanged(indexed address,uint256,uint256)
          handler: handleDelegateVotesChanged
        - event: Transfer(indexed address,indexed address,uint256)
          handler: handleTransfer
      file: src/mappings/c-token.ts
```
