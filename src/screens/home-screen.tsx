'use client'
import { useState } from 'react'
import { Url } from '~/core'
import { GitHubConfigurationForm, GitHubConfigurationRenderer } from '~/github'
import { Input, InputWrapper, Text } from '~/ui'

export function HomeScreen() {
  const [repoUrl, setRepoUrl] = useState<Url>()

  return (
    <>
      <InputWrapper renderLabel={() => <Text value='Repo URL' />}>
        <Input
          value={repoUrl?.value}
          onChange={(value) => setRepoUrl(new Url(value))}
        />
      </InputWrapper>
      <GitHubConfigurationRenderer
        url={repoUrl}
        renderConfiguration={() => <GitHubConfigurationForm />}
      />
    </>
  )
}
