'use client'
import { useState } from 'react'
import { Url } from '~/core'
import { useGitHubConfiguration } from '~/github'
import { HomeScreen } from '~/screens'

export default function Home() {
  const [repoUrl, setRepoUrl] = useState<Url>()
  const { configuration, setConfiguration } = useGitHubConfiguration()

  return (
    <HomeScreen
      repoUrl={repoUrl}
      onRepoUrlChange={setRepoUrl}
      gitHubConfigurationProps={{ configuration, setConfiguration }}
    />
  )
}
