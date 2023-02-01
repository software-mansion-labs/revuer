import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Url } from '~/core'
import { Input, InputWrapper, Text } from '~/ui'
import {
  validateGitHubRepoLink,
  extractRepositoryName,
  extractOrganizationName,
} from './github-repo-url'

export type GithubConfigurationData = {
  accessToken: string
  organizationName: string
  repositoryName: string
}

export const GitHubConfiguration: FC<{
  url: Url
  configuration: GithubConfigurationData
  setConfiguration: Dispatch<SetStateAction<GithubConfigurationData>>
}> = ({ url, configuration, setConfiguration }) => {
  useEffect(
    function extractRepoInfoFromUrl() {
      setConfiguration((prev) => ({
        ...prev,
        organizationName: extractOrganizationName(url),
        repositoryName: extractRepositoryName(url),
      }))
    },
    [url, setConfiguration]
  )

  return url && validateGitHubRepoLink(url) ? (
    <GitHubConfigurationForm
      accessToken={configuration.accessToken}
      onAccessTokenChange={(value) => {
        setConfiguration((prev) => ({ ...prev, accessToken: value ?? '' }))
      }}
    />
  ) : null
}

export function useGitHubConfiguration() {
  const [configuration, setConfiguration] = useState<GithubConfigurationData>({
    accessToken: '',
    organizationName: '',
    repositoryName: '',
  })

  return { configuration, setConfiguration }
}

export const GitHubConfigurationForm: FC<{
  accessToken: string | undefined
  onAccessTokenChange: (accessToken: string | undefined) => void
}> = ({ accessToken, onAccessTokenChange }) => {
  return (
    <InputWrapper renderLabel={() => <Text value='GitHub Access Token' />}>
      <Input value={accessToken} onChange={onAccessTokenChange} />
    </InputWrapper>
  )
}
