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
      <ContentContainer>
        <WidthLimiter>
          <Text.Logo value='REVUE' align='center' />
          <Text.Button value='Code Review Statistics' align='center' />
          <Gutter />
          <Gutter />
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
          <Gutter />
          <Gutter />
          <Gutter />
          {statistics !== undefined && (
            <ReviewersStatisticsTable statistics={statistics} />
          )}
        </WidthLimiter>
      </ContentContainer>
      <Gradient />
    </Container>
  )
}

const Container = styled('div', {
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

const ContentContainer = styled('div', {
  padding: 16,
  absoluteFill: true,
  zIndex: 1,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
})

const WidthLimiter = styled('div', {
  maxWidth: 1200,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
})

const Gutter = styled('div', {
  height: 16,
})

const Gradient = styled('div', {
  background: 'radial-gradient(circle, $primary95 0%, rgba(0,0,0,0) 100%)',
  absoluteFill: true,
  zIndex: 0,
  transform: 'translateY(-50%) scale(2)',
})
