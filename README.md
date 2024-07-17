# Subgraph Masterclass - Part 2: Leveraging One Subgraph to Track Multiple Smart Contracts

Welcome to Part 2 of the Subgraph Development Masterclass. In this tutorial, we will extend the concepts from [Part 1](https://github.com/chidubemokeke/Subgraph-Masterclass-S1-P1-ERC20/tree/main) and focus on managing complex data structures and entities within a single subgraph. We will use Compound Governance contracts as our use cases.

## Overview

[In Part 1](https://github.com/chidubemokeke/Subgraph-Masterclass-S1-P1-ERC20/tree/main), we covered the basics of subgraph development, including setting up a simple subgraph to track events from a single smart contract. This part of the masterclass will guide you through creating a subgraph that indexes multiple smart contracts. By the end of this tutorial, you will have a deeper understanding of handling complex data structures within a single subgraph.

## Learning Objectives

By completing this tutorial, you will:

- **Understand Data Sources**: Extend your subgraph to monitor events from multiple smart contracts and learn how to integrate multiple data sources into your subgraph.
- **Implement Event Handlers**: Create event handlers for various contract events.
- **Utilize Helper Functions**: Understand the importance of helper functions by exploring and implementing advanced mapping functions to transform blockchain events into subgraph entities retrieval.
- Deploy and query a multi-contract subgraph using The Graph Studio.

## Prerequisites

Ensure you have completed [Part 1](https://github.com/chidubemokeke/Subgraph-Masterclass-S1-P1-ERC20/tree/main), of this masterclass and have the following installed:

- [Node.js](https://nodejs.org/) (version >= 16.0)
- [Yarn](https://yarnpkg.com/) package manager
- [Graph CLI](https://thegraph.com/docs/developer/cli) (installed globally)
- [The Graph Studio Account](https://thegraph.com/studio/)

## Step-by-Step Tutorial

