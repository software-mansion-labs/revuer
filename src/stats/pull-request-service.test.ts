import {
  PullRequest,
  PullRequestService,
  ReviewStatus,
} from './pull-request-service'

function createPullRequestService(reviewStatuses: ReviewStatus[]) {
  const service = new PullRequestService({
    id: '_',
    sizeInLOC: 42,
    author: { username: 'USER_1' },
    reviews: [],
  })
  for (const status of reviewStatuses) {
    service.addReview({
      status,
      author: { username: 'USER_2' },
    })
  }
  return service
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
    id: '_',
    sizeInLOC: 42,
    author: { username: 'USER_1' },
    reviews: [],
  }

  const service = new PullRequestService({
    id: '_',
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
