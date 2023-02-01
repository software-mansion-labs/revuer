import { FC, useState } from 'react'
import { Url } from '~/core'
import { Input } from '~/ui'
import { validateGitHubRepoLink } from './github-repo-link-validator'

export const GitHubConfigurationRenderer: FC<{
  url: Url | undefined
  renderConfiguration: () => JSX.Element
}> = ({ url, renderConfiguration }) => {
  return url && validateGitHubRepoLink(url) ? renderConfiguration() : null
}

export const GitHubConfigurationForm: FC<{}> = ({}) => {
  const [] = useState()

  return <Input value='' onChange={() => {}} />
}
