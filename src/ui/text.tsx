import { FC } from 'react'
import { styled } from '~/styling'

export const Text: FC<{
  value: string
  align?: 'start' | 'center' | 'end'
}> = ({ value, align }) => {
  return <Container css={{ textAlign: align }}>{value}</Container>
}

const Container = styled('div', {})
