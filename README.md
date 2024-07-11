# Subgraph Masterclass - Part 2: Leveraging One Subgraph to Track Multiple Smart Contracts

Welcome to Part 2 of the Subgraph Development Masterclass. In this tutorial, we will extend the concepts from [Part 1](https://github.com/chidubemokeke/Subgraph-Masterclass-S1-P1-ERC20/tree/main) and focus on managing complex data structures and entities within a single subgraph. We will use Uniswap and Compound Governance contracts as our use cases.

## Overview

[In Part 1](https://github.com/chidubemokeke/Subgraph-Masterclass-S1-P1-ERC20/tree/main), we covered the basics of subgraph development, including setting up a simple subgraph to track events from a single smart contract. This part of the masterclass will guide you through the process of creating a subgraph that indexes multiple smart contracts. By the end of this tutorial, you will have a deeper understanding of how to handle complex data structures within a single subgraph..

## Learning Objectives

By completing this tutorial, you will:

- **Understand Data Sources**: Extend your subgraph to monitor events from multiple smart contracts and learn how to integrate multiple data sources into your subgraph.
- **Implement Event Handlers**: Create event handlers for various contract events.
- **Utilize Helper Functions**: Understand the importance of helper functions by exploring and implementing Implement advanced mapping functions to transform blockchain events into subgraph entities retrieval.
- Deploy and query a multi-contract subgraph using The Graph Studio.

## Prerequisites

Ensure you have completed [Part 1](https://github.com/chidubemokeke/Subgraph-Masterclass-S1-P1-ERC20/tree/main), of this masterclass and have the following installed:

- [Node.js](https://nodejs.org/) (version >= 16.0)
- [Yarn](https://yarnpkg.com/) package manager
- [Graph CLI](https://thegraph.com/docs/developer/cli) (installed globally)
- [The Graph Studio Account](https://thegraph.com/studio/)

## Step-by-Step Tutorial

Step 1: Using The Graph Studio

Create a New Subgraph in The Graph Studio:

- Navigate to The Graph Studio, sign in, and create a new subgraph.
- Enter the required details such as the subgraph name and description.
- You will receive a deploy key and subgraph slug (e.g., username/subgraph-name).
- Initialize your subgraph with the command from the studio.

```bash
graph init --studio <subgraph-name>

```

Authenticate with The Graph Studio:

- Copy the deploy key from The Graph Studio.
- Run the following command in your terminal to authenticate:

```bashß
graph auth --studio <ACCESS_TOKEN>>
```

### Step 2: Understanding the Project Structure

The initialized project contains the following structure:

- **subgraph.yaml**: Defines the subgraph manifest.
- **schema.graphql**: Contains the GraphQL schema.
- **src/**: Contains the source files.
  - **mappings/**: Contains the mapping functions.
    - **uniswap.ts**: Handles the mappings for the Uniswap contract.
    - **compound.ts**: Handles the mappings for the Compound Governance contract.
  - **utils/**: Contains utility files.
    - **uniHelper.ts**: Contains helper functions for Uniswap.
    - **compHelper.ts**: Contains helper functions for Compound Governance.
- **abis/**: Contains the contract ABI files.
  - **Uniswap.json**: ABI for the Uniswap contract.
  - **Compound.json**: ABI for the Compound Governance contract.
- **generated/**: Contains auto-generated files.
  - **schema.ts**: Type definitions generated from the GraphQL schema.

### Step 3: Defining your GraphQL Entities (`schema.graphql`)

Define entities to handle both Uniswap and Compound Governance contracts:

```graphql
type UniGovTransfer @entity {
  id: ID!
  from: UniGovAccount!
  to: UniGovAccount!
  value: BigInt!
  timestamp: BigInt!
}

type UniGovAccount @entity {
  id: ID!
  sentTransfers: [UniGovTransfer!]! @derivedFrom(field: "from")
  receivedTransfers: [UniGovTransfer!]! @derivedFrom(field: "to")
  totalSent: BigInt!
  totalReceived: BigInt!
  sentCount: Int!
  receivedCount: Int!
}

type CompGovTransfer @entity {
  id: ID!
  from: CompGovAccount!
  to: CompGovAccount!
  value: BigInt!
  timestamp: BigInt!
}

type CompGovAccount @entity {
  id: ID!
  sentTransfers: [CompGovTransfer!]! @derivedFrom(field: "from")
  receivedTransfers: [CompGovTransfer!]! @derivedFrom(field: "to")
  totalSent: BigInt!
  totalReceived: BigInt!
  sentCount: Int!
  receivedCount: Int!
}
```

## Step 4: YAML Configuration (subgraph.yaml)

Configure your subgraph to handle both Uniswap and Compound Governance contracts:

```yaml
specVersion: 0.0.5
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum
    name: UniGovernance
    network: mainnet
    source:
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
      abi: UniGovernance
      startBlock: 18861674
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.7
      language: wasm/assemblyscript
      entities:
        - Approval
        - DelegateChanged
        - DelegateVotesChanged
        - Transfer
      abis:
        - name: UniGovernance
          file: ./abis/UniGovernance.json
      eventHandlers:
        - event: Approval(indexed address,indexed address,uint256)
          handler: handleApproval
        - event: DelegateChanged(indexed address,indexed address,indexed address)
          handler: handleDelegateChanged
        - event: DelegateVotesChanged(indexed address,uint256,uint256)
          handler: handleDelegateVotesChanged
        - event: Transfer(indexed address,indexed address,uint256)
          handler: handleTransfer
      file: ./src/mappings/uniswap.ts
  - kind: ethereum
    name: CompoundGovernance
    network: mainnet
    source:
      address: "0xc00e94Cb662C3520282E6f5717214004A7f26888"
      abi: CompoundGovernance
      startBlock: 18861674
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.7
      language: wasm/assemblyscript
      entities:
        - Approval
        - DelegateChanged
        - DelegateVotesChanged
        - Transfer
      abis:
        - name: CompoundGovernance
          file: ./abis/Compoundgovernance.json
      eventHandlers:
        - event: Approval(indexed address,indexed address,uint256)
          handler: handleApproval
        - event: DelegateChanged(indexed address,indexed address,indexed address)
          handler: handleDelegateChanged
        - event: DelegateVotesChanged(indexed address,uint256,uint256)
          handler: handleDelegateVotesChanged
        - event: Transfer(indexed address,indexed address,uint256)
          handler: handleTransfer
      file: ./src/mappings/compound.ts
```

## Step 5: Creating Helper Functions

````gql
Create helper functions to manage the loading and creation of accounts for both Uniswap and Compound Governance.

// src/utils/uniHelper.ts

// Import the UniGovAccount entity type
import { UniGovAccount } from "../generated/schema"

// Function to load an existing account or create a new one if it doesn't exist
export function createOrLoadAccount(address: string): UniGovAccount {
  // Try to load the account by its address
  let account = UniGovAccount.load(address)
  // If the account doesn't exist, create a new one
  if (account == null) {
    account = new UniGovAccount(address)
    account.save()
  }
  return account
}

// src/utils/compHelper.ts

1// Import the CompGovAccount entity type
import { CompGovAccount } from "../generated/schema"

```// Function to load an existing account or create a new one if it doesn't exist
export function createOrLoadAccount(address: string): CompGovAccount {
  // Try to load the account by its address
  let account = CompGovAccount.load(address)
  // If the account doesn't exist, create a new one
  if (account == null) {
    account = new CompGovAccount(address)
    account.save()
  }
  return account
}```
````
