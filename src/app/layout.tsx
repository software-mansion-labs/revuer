import { getCssText, globalCss } from '~/styling'

const globalStyles = globalCss({
  '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
  'html, body, #__next': {
    width: '100%',
    height: '100%',
    backgroundColor: '$background99',
    color: '$text00',
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // https://github.com/stitchesjs/stitches/issues/1109#issuecomment-1397737743
  globalStyles()
  return (
    <html lang='en'>
      <head>
        <style
          id='stitches'
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
