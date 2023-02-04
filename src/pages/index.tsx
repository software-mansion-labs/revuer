import Head from 'next/head'
import { useState } from 'react'
import { AppError, Url } from '~/core'
import {
  fetchPullRequests,
  useGitHubConfiguration,
  useGitHubGQLClient,
} from '~/github'
import { HomeScreen } from '~/screens'
import { CodeReviewStatsUseCase, ReviewerStatistics } from '~/stats'

export default function Home() {
  const [repoUrl, setRepoUrl] = useState<Url>()
  const { configuration, setConfiguration } = useGitHubConfiguration()
  const client = useGitHubGQLClient(configuration.accessToken)
  const [statistics, setStatistics] = useState<ReviewerStatistics[]>()

  async function handleGenerateStatistics() {
    if (client) {
      try {
        const pullRequests = await fetchPullRequests(client, {
          repoName: configuration.repositoryName,
          repoOwner: configuration.organizationName,
          lastMergedPullRequestsCount:
            configuration.lastMergedPullRequestsCount,
        })
        const useCase = new CodeReviewStatsUseCase()
        const stats = Object.values(useCase.execute(pullRequests))
        setStatistics(stats)
      } catch (err) {
        if (err instanceof AppError) {
          alert(err.message)
        }
      }
    }
  }

  return (
    <>
      <Head>
        <title>Revuer | GitHub Code Review Statistics</title>
        <meta
          name='description'
          content="Optimize your code review process with our website that provides in-depth statistics from your Github repository. Get a clear picture of your team's review activity. Start using our website today for a better code review experience."
        />
      </Head>
      <HomeScreen
        repoUrl={repoUrl}
        onRepoUrlChange={setRepoUrl}
        gitHubConfigurationProps={{ configuration, setConfiguration }}
        onGenerateStatistics={handleGenerateStatistics}
        statistics={statistics}
      />
    </>
  )
}
