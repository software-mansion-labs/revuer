import { CodeReviewStatsUseCase } from './code-review-stats-use-case'
import { PullRequestService } from './pull-request-service'

it('should calculate stats correctly', () => {
  const useCase = new CodeReviewStatsUseCase()

  const stats = useCase.execute([
    new PullRequestService({
      sizeInLOC: 21,
      author: { username: '_' },
      reviews: [],
    })
      .addReview({
        author: { username: 'REVIEWER_1' },
        status: 'REQUESTED_CHANGES',
      })
      .addReview({ author: { username: 'REVIEWER_2' }, status: 'COMMENTED' })
      .addReview({ author: { username: 'REVIEWER_2' }, status: 'APPROVED' })
      .addReview({ author: { username: 'REVIEWER_1' }, status: 'APPROVED' })
      .toPullRequest(),
    new PullRequestService({
      sizeInLOC: 37,
      author: { username: '_' },
      reviews: [],
    })
      .addReview({
        author: { username: 'REVIEWER_1' },
        status: 'REQUESTED_CHANGES',
      })
      .addReview({ author: { username: 'REVIEWER_1' }, status: 'APPROVED' })
      .toPullRequest(),
  ])

  expect(stats['REVIEWER_1'].reviewsCount).toBe(4)
  expect(stats['REVIEWER_2'].reviewsCount).toBe(2)
  expect(stats['REVIEWER_1'].requestingChangesProbability).toBe(0.5)
  expect(stats['REVIEWER_2'].notApprovingProbability).toBe(0.5)
  expect(stats['REVIEWER_1'].medianReviewedPRSizeInLOC).toBe((21 + 37) / 2)
})
