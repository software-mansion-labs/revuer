export type User = {
  username: string
}

export type PullRequest = {
  author: User
  reviews: Review[]
}

export type ReviewStatus =
  | 'APPROVED'
  | 'COMMENTED'
  | 'REJECTED'
  | 'DISMISSED'
  | 'UNKNOWN'

export type Review = {
  author: User
  status: ReviewStatus
}

export class CodeReviewStats {
  constructor(private pullRequest: PullRequest) {}

  getRequestChangesCount() {
    return this.pullRequest.reviews.filter(
      (review) => review.status === 'REJECTED'
    ).length
  }
}
