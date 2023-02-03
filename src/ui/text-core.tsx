import { FC } from 'react'
import { styled } from '~/styling'

export type TextCoreProps = {
  value: string
  align?: 'start' | 'center' | 'end'
}

export const TextCore: FC<TextCoreProps> = ({ value, align }) => {
  return <Container css={{ textAlign: align }}>{value}</Container>
}

const Container = styled('div', {})
