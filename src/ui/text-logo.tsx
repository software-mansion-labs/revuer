import { FC } from 'react'
import { FONTS, styled } from '~/styling'
import { TextCore, TextCoreProps } from './text-core'

export const TextLogo: FC<TextCoreProps> = (props) => {
  return (
    <Container className={FONTS.logo.className}>
      <TextCore {...props} />
    </Container>
  )
}

const Container = styled('div', {
  fontSize: 64,
})
