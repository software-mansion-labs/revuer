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

  expect(reviewers.includes('REVIEWER_1')).toBeTruthy()
  expect(reviewers.includes('REVIEWER_2')).toBeTruthy()
  expect(reviewers.includes('REVIEWER_3')).toBeTruthy()
})
