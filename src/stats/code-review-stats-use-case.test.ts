import { CodeReviewStatsUseCase } from './code-review-stats-use-case'
import { PullRequestService } from './pull-request-service'

it('should calculate stats correctly', () => {
  const useCase = new CodeReviewStatsUseCase()

  const stats = useCase.execute([
    new PullRequestService({
      id: 'pr1',
      sizeInLOC: 21,
      author: { username: '_' },
      reviews: [],
      totalCommentsCount: 7,
    })
      .addReview({
        author: { username: 'REVIEWER_1' },
        status: 'REQUESTED_CHANGES',
        remarksCount: 3,
      })
      .addReview({
        author: { username: 'REVIEWER_2' },
        status: 'COMMENTED',
        remarksCount: 2,
      })
      .addReview({
        author: { username: 'REVIEWER_2' },
        status: 'APPROVED',
        remarksCount: 1,
      })
      .addReview({
        author: { username: 'REVIEWER_1' },
        status: 'COMMENTED',
        remarksCount: 0,
      })
      .addReview({
        author: { username: 'REVIEWER_1' },
        status: 'APPROVED',
        remarksCount: 1,
      })
      .toPullRequest(),
    new PullRequestService({
      id: 'pr2',
      sizeInLOC: 37,
      author: { username: '_' },
      reviews: [],
      totalCommentsCount: 2,
    })
      .addReview({
        author: { username: 'REVIEWER_1' },
        status: 'REQUESTED_CHANGES',
        remarksCount: 1,
      })
      .addReview({
        author: { username: 'REVIEWER_1' },
        status: 'APPROVED',
        remarksCount: 1,
      })
      .toPullRequest(),
  ])

  expect(stats['REVIEWER_1'].reviewsCount).toBe(5)
  expect(stats['REVIEWER_1'].reviewedPRsCount).toBe(2)
  expect(stats['REVIEWER_1'].requestingChangesProbability).toBe(0.4)
  expect(stats['REVIEWER_1'].averageReviewedPRSizeInLOC).toBe((21 + 37) / 2)
  expect(stats['REVIEWER_1'].averageTotalReviewedPRCommentsCount).toBe(4.5)
  expect(stats['REVIEWER_1'].averageRemarksInPRCount).toBe(
    (3 + 0 + 1 + 1 + 1) / 2
  )
  expect(stats['REVIEWER_2'].reviewsCount).toBe(2)
  expect(stats['REVIEWER_2'].notApprovingProbability).toBe(0.5)
})
