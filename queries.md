# Sample Queries

## Compound Governance accounts with the highest delegated votes and the Uniswap Governance accounts with the highest balances

```graphql
{
  topCompGovDelegates: compGovAccounts(
    orderBy: delegatedVotes
    orderDirection: desc
    first: 10
  ) {
    id
    balance
    totalTransfers
    delegatedVotes
    delegate
  }
  topUniGovAccounts: uniGovAccounts(
    orderBy: balance
    orderDirection: desc
    first: 10
  ) {
    id
    balance
    totalTransfers
    delegatedVotes
    delegate
  }
}
```

## Comparison of Transfer Activities Between Uniswap and Compound

```graphql
{
  uniswapActivity: uniGovTransfers(
    first: 10
    orderBy: blockTimestamp
    orderDirection: desc
  ) {
    id
    from
    to
    amount
    blockTimestamp
  }
  compoundActivity: compGovTransfers(
    first: 10
    orderBy: blockTimestamp
    orderDirection: desc
  ) {
    id
    from
    to
    amount
    blockTimestamp
  }
}
```

## Transfer History of a Specific Account

```graphql
{
  uniGovTransfers(
    where: { from: "0xAccountAddress" }
    orderBy: blockTimestamp
    orderDirection: desc
  ) {
    id
    from
    to
    amount
    blockNumber
    blockTimestamp
  }
  compGovTransfers(
    where: { from: "0xAccountAddress" }
    orderBy: blockTimestamp
    orderDirection: desc
  ) {
    id
    from
    to
    amount
    blockNumber
    blockTimestamp
  }
}
```
