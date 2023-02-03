import {
  PullRequest,
  PullRequestService,
  Review,
  ReviewStatus,
} from './pull-request-service'

function createPullRequestService(reviewStatuses: ReviewStatus[]) {
  const reviews = reviewStatuses.map<Review>((reviewStatus) => ({
    status: reviewStatus,
    author: { username: 'USER_2' },
    pullRequest,
  }))
  const pullRequest: PullRequest = {
    sizeInLOC: 42,
    author: { username: 'USER_1' },
    reviews,
  }

  return new PullRequestService({
    sizeInLOC: 42,
    author: { username: 'USER_1' },
    reviews,
  })
}

it('should retrieve requested changes count', () => {
  const service = createPullRequestService([
    'REQUESTED_CHANGES',
    'APPROVED',
    'COMMENTED',
  ])

  const result = service.getRequestedChangesCount()

  expect(result).toBe(1)
})

it('should create username to reviewer map', () => {
  const pullRequest: PullRequest = {
    sizeInLOC: 42,
    author: { username: 'USER_1' },
    reviews: [],
  }

  const service = new PullRequestService({
    sizeInLOC: 42,
    author: { username: 'USER_1' },
    reviews: [
      { author: { username: 'USER_1' }, status: 'COMMENTED', pullRequest },
      { author: { username: 'USER_2' }, status: 'APPROVED', pullRequest },
      {
        author: { username: 'USER_3' },
        status: 'REQUESTED_CHANGES',
        pullRequest,
      },
    ],
  })

  const result = service.getUsernameToReviewer()

  expect(result).toMatchObject({
    USER_2: { username: 'USER_2' },
    USER_3: { username: 'USER_3' },
  })
})
