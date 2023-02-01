'use client'
import { useState } from 'react'
import { Url } from '~/core'
import { GitHubConfiguration, useGitHubConfiguration } from '~/github'
import { Button, Input, InputWrapper, Text } from '~/ui'

export function HomeScreen() {
  const [repoUrl, setRepoUrl] = useState<Url>()
  const { configuration, setConfiguration } = useGitHubConfiguration()

  return (
    <>
      <InputWrapper renderLabel={() => <Text value='Repo URL' />}>
        <Input
          value={repoUrl?.value}
          onChange={(value) => setRepoUrl(new Url(value))}
        />
      </InputWrapper>
      {repoUrl && (
        <GitHubConfiguration
          url={repoUrl}
          configuration={configuration}
          setConfiguration={setConfiguration}
        />
      )}
      <Button onPress={() => {}} label='Generate stats' />
    </>
  )
}
