import { Url } from '~/core'
import {
  extractOrganizationName,
  extractRepositoryName,
  validateGitHubRepoLink,
} from './github-repo-url'

it('should detect valid GitHub repo link', () => {
  const result = validateGitHubRepoLink(
    new Url('https://github.com/ORGANIZATION_NAME/REPO_NAME')
  )

  expect(result).toBe(true)
})

it('should detect invalid GitHub repo link', () => {
  const result = validateGitHubRepoLink(
    new Url('https://github.com/ORGANIZATION_NAME')
  )

  expect(result).toBe(false)
})

it('should extract organization name from a valid link', () => {
  const result = extractOrganizationName(
    new Url('https://github.com/ORGANIZATION_NAME/REPO_NAME')
  )

  expect(result).toBe('ORGANIZATION_NAME')
})

it('should extract repo name from a valid link', () => {
  const result = extractRepositoryName(
    new Url('https://github.com/ORGANIZATION_NAME/REPO_NAME')
  )

  expect(result).toBe('REPO_NAME')
})
