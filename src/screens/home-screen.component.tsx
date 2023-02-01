'use client'
import { useState } from 'react'
import { Input } from '~/ui'

export function HomeScreen() {
  const [repoUrl, setRepoUrl] = useState<string>()

  return <Input value={repoUrl} onChange={setRepoUrl} />
}
