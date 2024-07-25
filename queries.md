# Queries

## Examples

### This query fetches the top two proposals with the highest Yes and No votes

```gql
{
  highestYesVotes: proposalCreateds(
    orderBy: votesFor
    orderDirection: desc
    first: 1
  ) {
    id
    description
    votesFor
    startBlock
    endBlock
  }
  highestNoVotes: proposalCreateds(
    orderBy: votesAgainst
    orderDirection: desc
    first: 1
  ) {
    id
    description
    votesAgainst
    startBlock
    endBlock
  }
}
```

## This query fetches the top 5 vote casts from the voteCasts entity, ordered by the number of votes in descending order

```gql
{
  voteCasts(
    first: 5 # Adjust the limit if needed
    orderBy: votes
    orderDirection: desc
  ) {
    id
    voter
    votes
    support
    proposal {
      id
    }
  }
}
```
