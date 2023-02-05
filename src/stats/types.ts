export type User = {
  username: string
}

export type PullRequest = {
  id: string
  author: User
  reviews: Review[]
  sizeInLOC: number
  totalCommentsCount: number
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
  pullRequest: PullRequest
  remarksCount: number
}
