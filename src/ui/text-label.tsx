import { FC } from 'react'
import { FONTS, styled } from '~/styling'
import { TextCore, TextCoreProps } from './text-core'

export const TextLabel: FC<TextCoreProps> = (props) => {
  return (
    <Container className={FONTS.default.className}>
      <TextCore {...props} />
    </Container>
  )
}

const Container = styled('div', {
  fontSize: 12,
})
