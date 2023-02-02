import { CodeReviewStatsUseCase } from './code-review-stats-use-case'
import { PullRequest, PullRequestService } from './pull-request-service'

function createCodeReviewStatsUseCase(pullRequests: PullRequest[]) {
  const pullRequestServices = pullRequests.map((pullRequest) => {
    return new PullRequestService(pullRequest)
  })
  return new CodeReviewStatsUseCase(pullRequestServices)
}

it('should list reviewers', () => {
  const useCase = createCodeReviewStatsUseCase([
    {
      author: { username: '_' },
      reviews: [
        { author: { username: 'REVIEWER_1' }, status: 'APPROVED' },
        { author: { username: 'REVIEWER_2' }, status: 'APPROVED' },
      ],
    },
    {
      author: { username: '_' },
      reviews: [{ author: { username: 'REVIEWER_3' }, status: 'APPROVED' }],
    },
  ])

  const reviewers = useCase.getReviewerUsernames()

  expect(reviewers.length).toBe(3)
  expect(reviewers.includes('REVIEWER_1')).toBeTruthy()
  expect(reviewers.includes('REVIEWER_2')).toBeTruthy()
  expect(reviewers.includes('REVIEWER_3')).toBeTruthy()
})

it('should show sample count per reviewer', () => {
  const useCase = createCodeReviewStatsUseCase([
    {
      author: { username: '_' },
      reviews: [
        { author: { username: 'REVIEWER_1' }, status: 'REQUESTED_CHANGES' },
        { author: { username: 'REVIEWER_2' }, status: 'APPROVED' },
        { author: { username: 'REVIEWER_1' }, status: 'APPROVED' },
      ],
    },
    {
      author: { username: '_' },
      reviews: [{ author: { username: 'REVIEWER_1' }, status: 'APPROVED' }],
    },
  ])

  const reviewer1SampleSize =
    useCase.getReviewerStatsData('REVIEWER_1').reviews.length
  const reviewer2SampleSize =
    useCase.getReviewerStatsData('REVIEWER_2').reviews.length

  expect(reviewer1SampleSize).toBe(3)
  expect(reviewer2SampleSize).toBe(1)
})
