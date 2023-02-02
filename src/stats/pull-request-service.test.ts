import {
  PullRequestService,
  Review,
  ReviewStatus,
} from './pull-request-service'

function createPullRequestService(reviewStatuses: ReviewStatus[]) {
  const reviews = reviewStatuses.map<Review>((reviewStatus) => ({
    status: reviewStatus,
    author: { username: 'USER_2' },
  }))
  return new PullRequestService({
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
  const service = new PullRequestService({
    author: { username: 'USER_1' },
    reviews: [
      { author: { username: 'USER_1' }, status: 'COMMENTED' },
      { author: { username: 'USER_2' }, status: 'APPROVED' },
      { author: { username: 'USER_3' }, status: 'REQUESTED_CHANGES' },
    ],
  })

  const result = service.getUsernameToReviewer()

  expect(result).toMatchObject({
    USER_2: { username: 'USER_2' },
    USER_3: { username: 'USER_3' },
  })
})
