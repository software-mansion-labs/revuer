import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Url } from '~/core'
import { Input, InputWrapper, Text } from '~/ui'
import {
  extractOrganizationName,
  extractRepositoryName,
  validateGitHubRepoLink,
} from './github-repo-url'

export type GithubConfigurationData = {
  accessToken: string
  organizationName: string
  repositoryName: string
  lastMergedPullRequestsCount: number
}

export type GithubConfigurationProps = {
  url: Url
  configuration: GithubConfigurationData
  setConfiguration: Dispatch<SetStateAction<GithubConfigurationData>>
}

export const GitHubConfiguration: FC<GithubConfigurationProps> = ({
  url,
  configuration,
  setConfiguration,
}) => {
  useEffect(
    function extractRepoInfoFromUrl() {
      if (validateGitHubRepoLink(url)) {
        setConfiguration((prev) => ({
          ...prev,
          organizationName: extractOrganizationName(url),
          repositoryName: extractRepositoryName(url),
        }))
      } else {
        setConfiguration((prev) => ({
          ...prev,
          organizationName: '',
          repositoryName: '',
        }))
      }
    },
    [url, setConfiguration]
  )

  return url && validateGitHubRepoLink(url) ? (
    <GitHubConfigurationForm
      accessToken={configuration.accessToken}
      onAccessTokenChange={(value) => {
        setConfiguration((prev) => ({ ...prev, accessToken: value ?? '' }))
      }}
      lastMergedPullRequestsCount={configuration.lastMergedPullRequestsCount}
      onLastMergedPullRequestsCountChange={(value) => {
        setConfiguration((prev) => ({
          ...prev,
          lastMergedPullRequestsCount: value ?? 0,
        }))
      }}
    />
  ) : null
}

export function useGitHubConfiguration() {
  const [configuration, setConfiguration] = useState<GithubConfigurationData>({
    accessToken: '',
    organizationName: '',
    repositoryName: '',
    lastMergedPullRequestsCount: 10,
  })

  return { configuration, setConfiguration }
}

export const GitHubConfigurationForm: FC<{
  accessToken: string | undefined
  onAccessTokenChange: (accessToken: string | undefined) => void
  lastMergedPullRequestsCount: number | undefined
  onLastMergedPullRequestsCountChange: (value: number | undefined) => void
}> = ({
  accessToken,
  onAccessTokenChange,
  lastMergedPullRequestsCount,
  onLastMergedPullRequestsCountChange,
}) => {
  return (
    <>
      <InputWrapper
        renderLabel={() => (
          <Text.Label value='GitHub Classic Personal Access Token' />
        )}
        renderFooter={() => (
          <Text.Label>
            Create and use a short lived token with read only permissions. If
            your account has an access to sensitive information, clone the repo
            of this app, verify the code, and run it locally.
          </Text.Label>
        )}
      >
        <Input
          type='password'
          value={accessToken ?? ''}
          onChange={onAccessTokenChange}
        />
      </InputWrapper>
      <InputWrapper
        renderLabel={() => (
          <Text.Label value='Number of Recently Merged Pull Requests (max 100)' />
        )}
      >
        <Input
          type='number'
          min={1}
          max={100}
          value={lastMergedPullRequestsCount?.toString() ?? '0'}
          onChange={(value) => {
            const count = parseInt(value)
            if (isNaN(count)) return onLastMergedPullRequestsCountChange(0)
            onLastMergedPullRequestsCountChange(count)
          }}
        />
      </InputWrapper>
    </>
  )
}
