import { FC, useState } from 'react'
import { Url } from '~/core'
import { Input, InputWrapper, Text } from '~/ui'
import { validateGitHubRepoLink } from './github-repo-link-validator'

export const GitHubConfigurationRenderer: FC<{
  url: Url | undefined
  renderConfiguration: () => JSX.Element
}> = ({ url, renderConfiguration }) => {
  return url && validateGitHubRepoLink(url) ? renderConfiguration() : null
}

export const GitHubConfigurationForm: FC<{}> = ({}) => {
  const [] = useState()

  return (
    <InputWrapper renderLabel={() => <Text value='GitHub Access Token' />}>
      <Input value='' onChange={() => {}} />
    </InputWrapper>
  )
}
