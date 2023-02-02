import { Client } from 'urql'
import { graphql } from '~/generated/gql'
import {
  PullRequestReviewState,
  PullRequestsQuery,
} from '~/generated/gql/graphql'
import { PullRequest, Review, ReviewStatus } from '~/stats'

const QUERY = graphql(`
  query PullRequests {
    repository(owner: "software-mansion", name: "protostar") {
      pullRequests(last: 5) {
        edges {
          node {
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

export async function fetchPullRequests(client: Client) {
  const data = (await client.query(QUERY, {}).toPromise()).data
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
    const reviews: Review[] = []
    const reviewEdges = pullRequestEdge?.node?.reviews?.edges ?? []
    for (const reviewEdge of reviewEdges) {
      const commentNodes = reviewEdge?.node?.comments.nodes ?? []
      const isQuickResponse =
        commentNodes.length === 1 && !!commentNodes[0]!.replyTo
      if (!isQuickResponse) {
        reviewEdge?.node?.state
        reviews.push({
          author: { username: reviewEdge?.node?.author?.login ?? '' },
          status: convertReviewStatus(reviewEdge?.node?.state),
        })
      }
    }
    pullRequests.push({
      author: { username: pullRequestEdge?.node?.author?.login ?? '' },
      reviews: reviews,
    })
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
      return 'REJECTED'
    case PullRequestReviewState.Commented:
      return 'COMMENTED'
    case PullRequestReviewState.Dismissed:
      return 'DISMISSED'
  }
  return 'UNKNOWN'
}
