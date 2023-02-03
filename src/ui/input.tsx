'use client'
import { InputUnstyled } from '@mui/base'
import { FC } from 'react'
import { styled } from '~/styling'

export const Input: FC<{
  onChange: (value: string) => void
  value: string
  type?: 'text' | 'url' | 'password' | 'number'
}> = ({ onChange, value, type }) => {
  return (
    <InputUnstyled
      slots={{ input: StyledInput }}
      onChange={(e) => {
        onChange(e.target.value)
      }}
      value={value}
      type={type}
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
})
