'use client'
import { FC } from 'react'

export const Input: FC<{
  onChange: (value: string | undefined) => void
  value: string | undefined
}> = ({ onChange, value }) => {
  return (
    <input
      onChange={(e) => {
        onChange(e.target.value)
      }}
      value={value}
    />
  )
}
