import { CodegenConfig } from '@graphql-codegen/cli'
import { config as configDotEnv } from 'dotenv'

configDotEnv()

const config: CodegenConfig = {
  schema: './github-schema.graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/generated/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
