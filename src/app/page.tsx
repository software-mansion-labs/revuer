'use client'
import { useEffect, useState } from 'react'
import { Url } from '~/core'
import {
  fetchPullRequests,
  useGitHubConfiguration,
  useGitHubGQLClient,
} from '~/github'
import { HomeScreen } from '~/screens'

export default function Home() {
  const [repoUrl, setRepoUrl] = useState<Url | undefined>(
    new Url('https://github.com/software-mansion/protostar')
  )
  const { configuration, setConfiguration } = useGitHubConfiguration()
  const client = useGitHubGQLClient(configuration.accessToken)
  const [statisticsData, setStatisticsData] = useState<any>()

  useEffect(() => {
    console.log(statisticsData)
  }, [statisticsData])

  return (
    <HomeScreen
      repoUrl={repoUrl}
      onRepoUrlChange={setRepoUrl}
      gitHubConfigurationProps={{ configuration, setConfiguration }}
      onGenerateStatistics={async () => {
        if (client)
          setStatisticsData(await fetchPullRequests(client).toPromise())
      }}
    />
  )
}
