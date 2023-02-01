import { FC } from 'react'

export const Button: FC<{ label: string; onPress: () => void }> = ({
  label,
  onPress,
}) => {
  return <button onClick={onPress}>{label}</button>
}
