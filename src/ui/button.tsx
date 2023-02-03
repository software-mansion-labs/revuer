import { ButtonUnstyled } from '@mui/base'
import { FC } from 'react'
import { styled } from '~/styling'
import { Text } from './text'

export const Button: FC<{
  label: string
  onPress: () => void
  disabled?: boolean
}> = ({ label, onPress, disabled }) => {
  return (
    <StyledButton
      state={disabled ? 'disabled' : 'active'}
      onClick={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <Text.Button value={label} />
    </StyledButton>
  )
}

const StyledButton = styled(ButtonUnstyled, {
  padding: 16,
  borderRadius: 8,
  borderStyle: 'solid',
  borderWidth: 2,

  variants: {
    state: {
      active: {
        backgroundColor: '$primary75',
        borderColor: '$primary90',
        cursor: 'pointer',

        '&:hover': {
          borderColor: '$primary50',
        },
      },
      disabled: {
        backgroundColor: '$background75',
        borderColor: '$background50',
      },
    },
  },
})
