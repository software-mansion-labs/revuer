import { ButtonUnstyled } from '@mui/base'
import { FC } from 'react'
import { styled } from '~/styling'
import { Text } from './text'

export const Button: FC<{ label: string; onPress: () => void }> = ({
  label,
  onPress,
}) => {
  return (
    <StyledButton onClick={onPress}>
      <Text.Body value={label} />
    </StyledButton>
  )
}

const StyledButton = styled(ButtonUnstyled, {
  padding: 16,
  backgroundColor: '$primary75',
  borderRadius: 8,
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: '$primary90',
})
