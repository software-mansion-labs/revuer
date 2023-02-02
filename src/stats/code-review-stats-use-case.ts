import { PullRequestService, Review, User } from './pull-request-service'

export class CodeReviewStatsUseCase {
  private usernameToStatsData?: Record<string, ReviewerStatsData>

  constructor(private pullRequestServices: PullRequestService[]) {}

  getReviewerUsernames(): string[] {
    const usernameToReviewer: Record<string, User> = {}
    for (const service of this.pullRequestServices) {
      for (const reviewer of service.getReviewers()) {
        usernameToReviewer[reviewer.username] = reviewer
      }
    }
    return Object.keys(usernameToReviewer)
  }

  getReviewerStatsData(username: string): ReviewerStatsData {
    if (!this.usernameToStatsData) {
      this.usernameToStatsData = {}
      for (const service of this.pullRequestServices) {
        for (const review of service.getReviews()) {
          if (!this.usernameToStatsData[review.author.username]) {
            this.usernameToStatsData[review.author.username] =
              new ReviewerStatsData(review.author)
          }
          this.usernameToStatsData[review.author.username].addReview(review)
        }
      }
    }
    return this.usernameToStatsData[username]
  }
}

class ReviewerStatsData {
  public reviews: Review[] = []
  public acceptedReviews: Review[] = []
  public requestedChangesReviews: Review[] = []
  public commentedReviews: Review[] = []

  constructor(public author: User) {}

  addReview(review: Review) {
    this.reviews.push(review)
    if (review.status === 'APPROVED') this.acceptedReviews.push(review)
    if (review.status === 'REQUESTED_CHANGES')
      this.requestedChangesReviews.push(review)
    if (review.status === 'COMMENTED') this.commentedReviews.push(review)
  }
}
