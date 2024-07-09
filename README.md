# Subgraph Masterclass - Part 2: Additional Data Sources

Welcome to Part 2 of the Subgraph Development Masterclass for Beginners. In this tutorial, we will build upon the foundational knowledge from Part 1 and explore how to incorporate additional data sources into your subgraph. we will leverage The Graph Studio to create a subgraph that indexes events from multiple data sources on the Ethereum blockchain focusing on governance contracts as a use case.

## Objectives

- **Understand Data Sources**: Learn how to integrate multiple data sources into your subgraph using The Graph.
- **Implement Event Handlers**: Create event handlers for various contract events.
- **Utilize Helper Functions**: Understand the importance of helper functions by exploring and implementing helper functions for managing entity creation and retrieval.
- \*\*

## Setup

### Prerequisites

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version >= 16.0)
- [Yarn](https://yarnpkg.com/) package manager
- [Graph CLI](https://thegraph.com/docs/developer/cli) (installed globally)

### Clone the Repository

Clone your subgraph repository to your local machine:

```bash
git clone https://github.com/chidubemokeke/Subgraph-Masterclass-S1-P2-Data-Source.git
cd repository

```

## Install Dependencies

Install project dependencies using Yarn:

```bash
yarn install

```

## Implementation

1. Subgraph Definition

The subgraph is designed to index and query events from both Uniswap Governance and Compound Governance contracts. Here’s how we define our schema and mappings
