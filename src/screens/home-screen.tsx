import { FC } from 'react'
import { Url } from '~/core'
import { GitHubConfiguration, GithubConfigurationProps } from '~/github'
import { ReviewersStatisticsTable, ReviewerStatistics } from '~/stats'
import { Button, Input, InputWrapper, Text } from '~/ui'

export type HomeScreenProps = {
  repoUrl: Url | undefined
  gitHubConfigurationProps: Omit<GithubConfigurationProps, 'url'>
  statistics: ReviewerStatistics[] | undefined
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
      <Text.Logo value='REREV' />
      <InputWrapper
        renderLabel={() => <Text.Label value='GitHub Repository URL' />}
      >
        <Input
          type='url'
          value={repoUrl?.value ?? ''}
          placeholder='https://github.com/owner/repo'
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
