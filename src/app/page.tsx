'use client'
import { useState } from 'react'
import { Url } from '~/core'
import {
  fetchPullRequests,
  useGitHubConfiguration,
  useGitHubGQLClient,
} from '~/github'
import { HomeScreen } from '~/screens'
import { CodeReviewStatsUseCase, ReviewerStatistic } from '~/stats'

export default function Home() {
  const [repoUrl, setRepoUrl] = useState<Url | undefined>(
    new Url('https://github.com/software-mansion/protostar')
  )
  const { configuration, setConfiguration } = useGitHubConfiguration()
  const client = useGitHubGQLClient(configuration.accessToken)
  const [statistics, setStatistics] = useState<ReviewerStatistic[]>()

  async function handleGenerateStatistics() {
    if (client) {
      const pullRequests = await fetchPullRequests(client)
      const useCase = new CodeReviewStatsUseCase()
      const stats = Object.values(useCase.execute(pullRequests))
      setStatistics(stats)
    }
  }

  return (
    <HomeScreen
      repoUrl={repoUrl}
      onRepoUrlChange={setRepoUrl}
      gitHubConfigurationProps={{ configuration, setConfiguration }}
      onGenerateStatistics={handleGenerateStatistics}
      statistics={statistics}
    />
  )
}
