import { ButtonUnstyled } from '@mui/base'
import { FC, useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner'
import { darkColors, styled } from '~/styling'
import { Text } from './text'

export const Button: FC<{
  label: string
  onPress: () => Promise<void>
  disabled?: boolean
}> = ({ label, onPress, disabled }) => {
  const [isLoading, setIsLoading] = useState(false)

  const isDisabled = disabled || isLoading
  return (
    <StyledButton
      state={isDisabled ? 'disabled' : 'active'}
      onClick={
        isDisabled
          ? undefined
          : async () => {
              setIsLoading(true)
              await onPress()
              setIsLoading(false)
            }
      }
      disabled={isDisabled}
    >
      <ContentContainer>
        <Text.Button value={label} />
        <SpinnerContainer visible={isLoading}>
          <ThreeCircles color={darkColors.secondary50} height={24} />
        </SpinnerContainer>
      </ContentContainer>
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
          borderColor: '$secondary50',
        },
      },
      disabled: {
        backgroundColor: '$background75',
        borderColor: '$background50',
      },
    },
  },
})

const ContentContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  color: '$text00',
})

const SpinnerContainer = styled('div', {
  transition: 'all 0.1s',

  variants: {
    visible: {
      true: {
        width: 24,
        height: 24,
        marginLeft: 16,
      },
      false: {
        width: 0,
        height: 24,
      },
    },
  },
})
