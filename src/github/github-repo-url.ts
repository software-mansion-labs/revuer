import { AppError, Url } from '~/core'

const GITHUB_REPO_REGEX = /^https:\/\/github.com\/([\w-]+)\/([\w.-]+)\/?$/

export function validateGitHubRepoLink(url: Url) {
  if (!url.value) return false
  return GITHUB_REPO_REGEX.test(url.value)
}

export function extractOrganizationName(url: Url) {
  if (!url.value)
    throw new AppError("Couldn't extract organization name from empty string")
  const matches = url.value.match(GITHUB_REPO_REGEX)
  if (!matches || matches.length != 3) {
    throw new AppError("Couldn't extract organization name")
  }
  return matches[1]
}

export function extractRepositoryName(url: Url) {
  if (!url.value)
    throw new AppError("Couldn't extract repository name from empty string")
  const matches = url.value.match(GITHUB_REPO_REGEX)
  if (!matches || matches.length != 3) {
    throw new AppError("Couldn't extract repository name")
  }
  return matches[2]
}
