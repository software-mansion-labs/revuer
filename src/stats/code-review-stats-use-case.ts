import {
  PullRequest,
  PullRequestService,
  Review,
  User,
} from './pull-request-service'

export class CodeReviewStatsUseCase {
  execute(pullRequests: PullRequest[]): Record<string, ReviewerStatistic> {
    const usernameToStatsData: Record<string, ReviewerStatistic> = {}
    for (const service of this.createPRServices(pullRequests)) {
      for (const review of service.getReviews()) {
        if (!usernameToStatsData[review.author.username]) {
          usernameToStatsData[review.author.username] = new ReviewerStatistic(
            review.author
          )
        }
        usernameToStatsData[review.author.username].addReview(review)
      }
    }
    return usernameToStatsData
  }

  private createPRServices(pullRequests: PullRequest[]): PullRequestService[] {
    return pullRequests.map((pullRequest) => {
      return new PullRequestService(pullRequest)
    })
  }
}

export class ReviewerStatistic {
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
