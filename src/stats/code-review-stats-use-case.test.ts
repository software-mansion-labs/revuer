import { CodeReviewStatsUseCase } from './code-review-stats-use-case'
import { PullRequestBuilder } from './pull-request-builder'

it('should calculate stats correctly', () => {
  const useCase = new CodeReviewStatsUseCase()

  const usernameToSummary = useCase.execute([
    new PullRequestBuilder({
      id: 'pr1',
      sizeInLOC: 21,
      author: { username: '_' },
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
      .build(),
    new PullRequestBuilder({
      id: 'pr2',
      sizeInLOC: 37,
      author: { username: '_' },
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
      .build(),
  ])

  expect(usernameToSummary['REVIEWER_1'].reviewsCount).toBe(5)
  expect(usernameToSummary['REVIEWER_1'].reviewedPRsCount).toBe(2)
  expect(usernameToSummary['REVIEWER_1'].reviewsPerPR).toBe(5 / 2)
  expect(usernameToSummary['REVIEWER_1'].requestingChangesProbability).toBe(0.4)
  expect(usernameToSummary['REVIEWER_1'].averageReviewedPRSizeInLOC).toBe(
    (21 + 37) / 2
  )
  expect(
    usernameToSummary['REVIEWER_1'].averageTotalReviewedPRCommentsCount
  ).toBe(4.5)
  expect(usernameToSummary['REVIEWER_1'].averageRemarksInPRCount).toBe(
    (3 + 0 + 1 + 1 + 1) / 2
  )
  expect(usernameToSummary['REVIEWER_2'].reviewsCount).toBe(2)
  expect(usernameToSummary['REVIEWER_2'].notApprovingProbability).toBe(0.5)
})
