import { PullRequest, Review } from './types'

export class PullRequestBuilder {
  private pullRequest: PullRequest

  constructor(pullRequestCore: Omit<PullRequest, 'reviews'>) {
    this.pullRequest = { ...pullRequestCore, reviews: [] }
  }

  addReview(review: Omit<Review, 'pullRequest'>) {
    this.pullRequest.reviews.push({ ...review, pullRequest: this.pullRequest })
    return this
  }

  build(): PullRequest {
    return this.pullRequest
  }
}
