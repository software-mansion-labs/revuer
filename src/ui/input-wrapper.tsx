import { FC } from 'react'
import { styled } from '~/styling'

export const InputWrapper: FC<{
  renderLabel: () => JSX.Element
  renderFooter?: () => JSX.Element
  children: JSX.Element
}> = ({ children, renderLabel, renderFooter }) => {
  return (
    <Container>
      <Row>{renderLabel()}</Row>
      <Row>{children}</Row>
      {renderFooter && <Row>{renderFooter()}</Row>}
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '16px',
})

const Row = styled('div', {
  display: 'flex',
  flex: 1,
  marginBottom: 8,
})
