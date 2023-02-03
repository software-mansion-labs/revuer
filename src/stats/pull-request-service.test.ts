import { PullRequestService, ReviewStatus } from './pull-request-service'

function createPullRequestService(reviewStatuses: ReviewStatus[]) {
  const service = new PullRequestService({
    id: '_',
    sizeInLOC: 42,
    author: { username: 'USER_1' },
    reviews: [],
    totalCommentsCount: 0,
  })
  for (const status of reviewStatuses) {
    service.addReview({
      status,
      author: { username: 'USER_2' },
      totalCommentsCount: 0,
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
  const service = new PullRequestService({
    id: '_',
    sizeInLOC: 42,
    author: { username: 'USER_1' },
    reviews: [],
    totalCommentsCount: 6,
  })

  service
    .addReview({
      author: { username: 'USER_1' },
      status: 'COMMENTED',
      totalCommentsCount: 1,
    })
    .addReview({
      author: { username: 'USER_2' },
      status: 'APPROVED',
      totalCommentsCount: 2,
    })
    .addReview({
      author: { username: 'USER_3' },
      status: 'REQUESTED_CHANGES',
      totalCommentsCount: 3,
    })

  const result = service.getUsernameToReviewer()

  expect(result).toMatchObject({
    USER_2: { username: 'USER_2' },
    USER_3: { username: 'USER_3' },
  })
})
