import { CodeReviewStatsUseCase } from './code-review-stats-use-case'

it('should calculate stats correctly', () => {
  const useCase = new CodeReviewStatsUseCase()

  const stats = useCase.execute([
    {
      author: { username: '_' },
      reviews: [
        { author: { username: 'REVIEWER_1' }, status: 'REQUESTED_CHANGES' },
        { author: { username: 'REVIEWER_2' }, status: 'COMMENTED' },
        { author: { username: 'REVIEWER_2' }, status: 'APPROVED' },
        { author: { username: 'REVIEWER_1' }, status: 'APPROVED' },
      ],
    },
    {
      author: { username: '_' },
      reviews: [{ author: { username: 'REVIEWER_1' }, status: 'APPROVED' }],
    },
  ])

  expect(stats['REVIEWER_1'].reviewsCount).toBe(3)
  expect(stats['REVIEWER_2'].reviewsCount).toBe(2)
  expect(stats['REVIEWER_1'].requestedChangesPerAccepted).toBe(0.5)
  expect(stats['REVIEWER_2'].commentedPerAccepted).toBe(1)
})
