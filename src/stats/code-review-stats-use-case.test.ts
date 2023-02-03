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
        totalCommentsCount: 3,
      })
      .addReview({
        author: { username: 'REVIEWER_2' },
        status: 'COMMENTED',
        totalCommentsCount: 2,
      })
      .addReview({
        author: { username: 'REVIEWER_2' },
        status: 'APPROVED',
        totalCommentsCount: 1,
      })
      .addReview({
        author: { username: 'REVIEWER_1' },
        status: 'APPROVED',
        totalCommentsCount: 1,
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
        totalCommentsCount: 1,
      })
      .addReview({
        author: { username: 'REVIEWER_1' },
        status: 'APPROVED',
        totalCommentsCount: 1,
      })
      .toPullRequest(),
  ])

  expect(stats['REVIEWER_1'].reviewsCount).toBe(4)
  expect(stats['REVIEWER_1'].requestingChangesProbability).toBe(0.5)
  expect(stats['REVIEWER_1'].averagedReviewedPRSizeInLOC).toBe((21 + 37) / 2)
  expect(stats['REVIEWER_1'].averageTotalReviewedPRCommentsCount).toBe(4.5)
  expect(stats['REVIEWER_1'].averageCommentsInReviewCount).toBe(6 / 4)
  expect(stats['REVIEWER_2'].reviewsCount).toBe(2)
  expect(stats['REVIEWER_2'].notApprovingProbability).toBe(0.5)
})
