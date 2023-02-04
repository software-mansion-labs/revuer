import { FC } from 'react'
import { styled } from '~/styling'

export const Input: FC<{
  onChange: (value: string) => void
  value: string
  type?: 'text' | 'url' | 'password' | 'number'
  min?: number
  max?: number
  placeholder?: string
}> = ({ onChange, ...props }) => {
  return (
    <StyledInput
      onChange={(e) => {
        onChange(e.target.value)
      }}
      {...props}
    />
  )
}

const StyledInput = styled('input', {
  width: '100%',
  padding: 8,
  borderRadius: 8,
  borderColor: '$primary75',
  borderWidth: 2,
  borderStyle: 'solid',
  backgroundColor: '$primary90',
  fontSize: 16,
  color: '$text00',
  '&:hover': {
    borderColor: '$secondary50',
  },
})
