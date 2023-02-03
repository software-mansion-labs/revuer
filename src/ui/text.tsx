import { FC } from 'react'
import { FONTS, styled } from '~/styling'

export const Text: FC<{
  value: string
  align?: 'start' | 'center' | 'end'
}> = ({ value, align }) => {
  return (
    <Container className={FONTS.default.className} css={{ textAlign: align }}>
      {value}
    </Container>
  )
}

const Container = styled('div', {})
