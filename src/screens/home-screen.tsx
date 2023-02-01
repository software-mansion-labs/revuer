'use client'
import { useState } from 'react'
import { Url } from '~/core'
import { GitHubConfigurationForm, GitHubConfigurationRenderer } from '~/github'
import { Input, InputWrapper } from '~/ui'

export function HomeScreen() {
  const [repoUrl, setRepoUrl] = useState<Url>()

  return (
    <>
      <InputWrapper>
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
