import { CodeReviewStatsUseCase } from './code-review-stats-use-case'

it('should show sample count per reviewer', () => {
  const useCase = new CodeReviewStatsUseCase()

  const stats = useCase.execute([
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

  expect(stats['REVIEWER_1'].reviews.length).toBe(3)
  expect(stats['REVIEWER_2'].reviews.length).toBe(1)
})
