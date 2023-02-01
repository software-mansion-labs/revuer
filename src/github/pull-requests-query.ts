import { Client } from 'urql'
import { graphql } from '~/generated/gql'

const QUERY = graphql(`
  query PullRequests {
    repository(owner: "software-mansion", name: "protostar") {
      pullRequests(last: 2) {
        edges {
          node {
            latestReviews(first: 1) {
              edges {
                node {
                  author {
                    login
                  }
                  comments(first: 4) {
                    edges {
                      node {
                        id
                        body
                      }
                    }
                  }
                }
              }
            }
            comments(first: 1) {
              edges {
                node {
                  author {
                    login
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`)

export function fetchPullRequests(client: Client) {
  return client.query(QUERY, {})
}
