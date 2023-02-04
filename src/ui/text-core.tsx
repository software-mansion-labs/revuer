import { FC } from 'react'
import { styled } from '~/styling'

export type TextCoreProps = {
  value?: string
  align?: 'start' | 'center' | 'end'
  children?: JSX.Element | string
}

export const TextCore: FC<TextCoreProps> = ({ value, align, children }) => {
  return <Container css={{ textAlign: align }}>{value || children}</Container>
}

const Container = styled('div', {
  color: '$text00',
})
