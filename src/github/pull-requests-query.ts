import { Client } from 'urql'
import { AppError } from '~/core'
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
            id
            additions
            deletions
            totalCommentsCount
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
                    totalCount
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
  const result = await client.query(QUERY, args).toPromise()
  if (result.error) {
    throw new AppError(result.error.message)
  }
  return convertPullRequestsQueryToPullRequests(result.data)
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
      id: pullRequestNode.id,
      author: { username: pullRequestNode.author?.login ?? '' },
      sizeInLOC: pullRequestNode.additions + pullRequestNode.deletions,
      totalCommentsCount: pullRequestNode.totalCommentsCount ?? 0,
      reviews: [],
    }

    const reviews: Review[] = []
    const reviewEdges = pullRequestNode.reviews?.edges ?? []
    for (const reviewEdge of reviewEdges) {
      const reviewNode = reviewEdge?.node
      if (!reviewNode) continue
      const commentNodes = reviewNode.comments.nodes ?? []
      const isQuickResponse =
        reviewNode.comments.totalCount === 1 && !!commentNodes[0]!.replyTo
      if (!isQuickResponse) {
        reviewNode.state
        reviews.push({
          author: { username: reviewNode.author?.login ?? '' },
          status: convertReviewStatus(reviewNode.state),
          pullRequest: pullRequest,
          remarksCount: reviewNode.comments.totalCount,
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
