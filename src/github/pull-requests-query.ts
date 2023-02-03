import { Client } from 'urql'
import { graphql } from '~/generated/gql'
import {
  PullRequestReviewState,
  PullRequestsQuery,
} from '~/generated/gql/graphql'
import { PullRequest, Review, ReviewStatus } from '~/stats'

const QUERY = graphql(`
  query PullRequests(
    $repoOwner: String!
    $repoName: String!
    $lastMergedPullRequestsCount: Int!
  ) {
    repository(owner: $repoOwner, name: $repoName) {
      pullRequests(last: $lastMergedPullRequestsCount, states: [MERGED]) {
        edges {
          node {
            additions
            deletions
            author {
              login
            }
            reviews(first: 100) {
              edges {
                node {
                  id
                  state
                  author {
                    login
                  }
                  comments(first: 1) {
                    nodes {
                      bodyText
                      replyTo {
                        id
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`)

export async function fetchPullRequests(
  client: Client,
  args: {
    repoOwner: string
    repoName: string
    lastMergedPullRequestsCount: number
  }
) {
  const data = (await client.query(QUERY, args).toPromise()).data
  return convertPullRequestsQueryToPullRequests(data)
}

function convertPullRequestsQueryToPullRequests(
  pullRequestsQuery: PullRequestsQuery | undefined
): PullRequest[] {
  if (!pullRequestsQuery) return []
  const pullRequests: PullRequest[] = []
  const pullRequestEdges =
    pullRequestsQuery.repository?.pullRequests.edges ?? []
  for (const pullRequestEdge of pullRequestEdges) {
    const pullRequestNode = pullRequestEdge?.node
    if (!pullRequestNode) continue
    const pullRequest: PullRequest = {
      author: { username: pullRequestNode.author?.login ?? '' },
      sizeInLOC: pullRequestNode.additions + pullRequestNode.deletions,
      reviews: [],
    }
    const reviews: Review[] = []
    const reviewEdges = pullRequestNode.reviews?.edges ?? []
    for (const reviewEdge of reviewEdges) {
      const commentNodes = reviewEdge?.node?.comments.nodes ?? []
      const isQuickResponse =
        commentNodes.length === 1 && !!commentNodes[0]!.replyTo
      if (!isQuickResponse) {
        reviewEdge?.node?.state
        reviews.push({
          author: { username: reviewEdge?.node?.author?.login ?? '' },
          status: convertReviewStatus(reviewEdge?.node?.state),
          pullRequest: pullRequest,
        })
      }
    }
    pullRequest.reviews = reviews
    pullRequests.push(pullRequest)
  }
  return pullRequests
}

function convertReviewStatus(
  status: PullRequestReviewState | undefined
): ReviewStatus {
  switch (status) {
    case PullRequestReviewState.Approved:
      return 'APPROVED'
    case PullRequestReviewState.ChangesRequested:
      return 'REQUESTED_CHANGES'
    case PullRequestReviewState.Commented:
      return 'COMMENTED'
    case PullRequestReviewState.Dismissed:
      return 'DISMISSED'
  }
  return 'UNKNOWN'
}
