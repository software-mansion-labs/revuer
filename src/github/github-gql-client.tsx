import { useEffect, useState } from 'react'
import { Client, createClient } from 'urql'

export function useGitHubGQLClient(token: string | undefined) {
  const [client, setClient] = useState<Client>()

  useEffect(() => {
    if (token) {
      setClient(createGitHubGQlClient(token))
    } else {
      setClient(undefined)
    }
  }, [token])

  return client
}

function createGitHubGQlClient(token: string) {
  return createClient({
    url: 'https://api.github.com/graphql',
    fetchOptions: () => {
      return {
        headers: { authorization: token ? `bearer ${token}` : '' },
      }
    },
  })
}
