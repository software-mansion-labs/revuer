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
  | 'REQUESTED_CHANGES'
  | 'DISMISSED'
  | 'UNKNOWN'

export type Review = {
  author: User
  status: ReviewStatus
}

export class PullRequestService {
  constructor(private pullRequest: PullRequest) {}

  getRequestedChangesCount() {
    return this.pullRequest.reviews.filter(
      (review) => review.status === 'REQUESTED_CHANGES'
    ).length
  }

  getUsernameToReviewer() {
    const usernameToReviewer: Record<string, User> = {}
    for (const review of this.pullRequest.reviews) {
      if (review.author.username !== this.pullRequest.author.username)
        usernameToReviewer[review.author.username] = review.author
    }
    return usernameToReviewer
  }
}
