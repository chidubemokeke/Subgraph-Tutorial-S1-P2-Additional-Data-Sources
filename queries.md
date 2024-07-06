# Sample Queries

## Most active accounts by total transfers and the accounts with the highest balance

```graphql
{
  mostActiveUniGovAccounts: uniGovAccounts(
    first: 10
    orderBy: totalTransfers
    orderDirection: desc
  ) {
    id
    totalTransfers
    balance
    totalApprovals
    delegatedVotes
    delegate
  }
  mostActiveCompGovAccounts: compGovAccounts(
    first: 10
    orderBy: totalTransfers
    orderDirection: desc
  ) {
    id
    totalTransfers
    balance
    totalApprovals
    delegatedVotes
    delegate
  }
  highestBalanceUniGovAccounts: uniGovAccounts(
    first: 10
    orderBy: balance
    orderDirection: desc
  ) {
    id
    balance
    totalTransfers
    totalApprovals
    delegatedVotes
    delegate
  }
  highestBalanceCompGovAccounts: compGovAccounts(
    first: 10
    orderBy: balance
    orderDirection: desc
  ) {
    id
    balance
    totalTransfers
    totalApprovals
    delegatedVotes
    delegate
  }
}
```
