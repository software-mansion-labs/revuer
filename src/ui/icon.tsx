import { FC } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

const iconNameToComponent = {
  arrowDown: FaArrowDown,
  arrowUp: FaArrowUp,
}

export const Icon: FC<{ name: keyof typeof iconNameToComponent }> = ({
  name,
}) => {
  const _Icon = iconNameToComponent[name]
  return (
    <div>
      <_Icon size={12} />
    </div>
  )
}
