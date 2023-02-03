import { globalCss } from '~/styling'

const globalStyles = globalCss({
  '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
  'html, body, #__next': {
    width: '100%',
    height: '100%',
  },
  html: {
    backgroundColor: '$background99',
    color: '$text00',
  },
})
globalStyles()

export default function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />
}
