import { FC } from 'react'
import { Url } from '~/core'
import { GitHubConfiguration, GithubConfigurationProps } from '~/github'
import { ReviewersStatisticsTable, ReviewerStatistics } from '~/stats'
import { styled } from '~/styling'
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
    <Container>
      <Text.Logo value='REREVIEW' align='center' />
      <Gutter />
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
      <Gutter />
      <Button
        onPress={onGenerateStatistics}
        label='GENERATE STATS'
        disabled={!gitHubConfigurationProps.configuration.accessToken}
      />
      <Gutter />
      {statistics !== undefined && (
        <ReviewersStatisticsTable statistics={statistics} />
      )}
    </Container>
  )
}

const Container = styled('div', {
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

const Gutter = styled('div', {
  height: 16,
})
