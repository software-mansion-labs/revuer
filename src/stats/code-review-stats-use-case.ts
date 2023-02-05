import { Stats } from 'fast-stats'
import {
  PullRequest,
  PullRequestService,
  Review,
  User,
} from './pull-request-service'

export class CodeReviewStatsUseCase {
  execute(pullRequests: PullRequest[]): Record<string, ReviewerStatistics> {
    const usernameToStatsData: Record<string, ReviewerStatistics> = {}
    for (const service of this.createPRServices(pullRequests)) {
      for (const review of service.getReviews()) {
        if (!usernameToStatsData[review.author.username]) {
          usernameToStatsData[review.author.username] = new ReviewerStatistics(
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

export class ReviewerStatistics {
  get reviewsCount() {
    return this.reviews.length
  }

  get reviewedPRsCount() {
    return this.reviewedPRs.length
  }

  get requestingChangesProbability() {
    return this.requestedChangesReviewsCount / (this.reviewsCount || 1)
  }

  get notApprovingProbability() {
    return (
      (this.requestedChangesReviewsCount + this.commentedReviewsCount) /
      (this.reviewsCount || 1)
    )
  }

  get averageReviewedPRSizeInLOC() {
    const pullRequestSizes = this.reviewedPRs.map((review) => {
      return review.sizeInLOC
    })
    const mean = new Stats().push(pullRequestSizes).amean()
    return isNaN(mean) ? null : mean
  }

  get averageTotalReviewedPRCommentsCount() {
    return new Stats()
      .push(this.reviewedPRs.map((pr) => pr.totalCommentsCount))
      .amean()
  }

  get averageRemarksInPRCount() {
    const prIdToRemarksCount: Record<string, number> = {}
    for (const review of this.reviews) {
      const prId = review.pullRequest.id
      if (prIdToRemarksCount[prId] === undefined) prIdToRemarksCount[prId] = 0
      prIdToRemarksCount[prId] += review.remarksCount
    }

    return new Stats().push(Object.values(prIdToRemarksCount)).amean()
  }

  get reviewsPerPR() {
    return this.reviewsCount / (this.reviewedPRsCount || 1)
  }

  get linesOfCodePerComment() {
    if (this.averageReviewedPRSizeInLOC === null) return null
    if (this.averageRemarksInPRCount === 0) return 0
    return this.averageReviewedPRSizeInLOC / this.averageRemarksInPRCount
  }

  private reviews: Review[] = []
  private acceptedReviews: Review[] = []
  private requestedChangesReviews: Review[] = []
  private commentedReviews: Review[] = []

  private get commentedReviewsCount() {
    return this.commentedReviews.length
  }

  private get requestedChangesReviewsCount() {
    return this.requestedChangesReviews.length
  }

  private get reviewedPRs() {
    const idToPR: Record<string, PullRequest> = {}
    for (const review of this.reviews) {
      idToPR[review.pullRequest.id] = review.pullRequest
    }
    return Object.values(idToPR)
  }

  constructor(public author: User) {}

  addReview(review: Review) {
    this.reviews.push(review)
    if (review.status === 'APPROVED') this.acceptedReviews.push(review)
    if (review.status === 'REQUESTED_CHANGES')
      this.requestedChangesReviews.push(review)
    if (review.status === 'COMMENTED') this.commentedReviews.push(review)
  }
}
