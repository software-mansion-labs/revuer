import { PullRequestService, User } from './pull-request-service'

export class CodeReviewStatsUseCase {
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
}
