'use client'
import { FC } from 'react'
import { Url } from '~/core'
import { GitHubConfiguration, GithubConfigurationProps } from '~/github'
import { ReviewersStatisticsTable, ReviewerStatistic } from '~/stats'
import { Button, Input, InputWrapper, Text } from '~/ui'

export type HomeScreenProps = {
  repoUrl: Url | undefined
  gitHubConfigurationProps: Omit<GithubConfigurationProps, 'url'>
  statistics: ReviewerStatistic[] | undefined
  onRepoUrlChange: (url: Url | undefined) => void
  onGenerateStatistics: () => Promise<any>
}

export const HomeScreen: FC<HomeScreenProps> = ({
  repoUrl,
  gitHubConfigurationProps,
  statistics,
  onRepoUrlChange,
  onGenerateStatistics,
}) => {
  return (
    <>
      <InputWrapper renderLabel={() => <Text value='Repo URL' />}>
        <Input
          value={repoUrl?.value ?? ''}
          onChange={(value) => onRepoUrlChange(new Url(value))}
        />
      </InputWrapper>
      {repoUrl && (
        <GitHubConfiguration {...gitHubConfigurationProps} url={repoUrl} />
      )}
      <Button onPress={onGenerateStatistics} label='Generate stats' />
      {statistics !== undefined && (
        <ReviewersStatisticsTable statistics={statistics} />
      )}
    </>
  )
}
