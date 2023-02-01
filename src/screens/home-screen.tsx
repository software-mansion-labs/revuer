'use client'
import { useState } from 'react'
import { Url } from '~/core'
import { GitHubConfigurationForm, GitHubConfigurationRenderer } from '~/github'
import { Input } from '~/ui'

export function HomeScreen() {
  const [repoUrl, setRepoUrl] = useState<Url>()

  return (
    <>
      <Input
        value={repoUrl?.value}
        onChange={(value) => setRepoUrl(new Url(value))}
      />
      {repoUrl && (
        <GitHubConfigurationRenderer
          url={repoUrl}
          renderConfiguration={() => <GitHubConfigurationForm />}
        />
      )}
    </>
  )
}
