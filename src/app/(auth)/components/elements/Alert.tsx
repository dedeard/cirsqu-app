import React from 'react'
import cn from 'classnames'

type PropTypes = {
  color?: 'primary' | 'danger' | 'default'
  children?: React.ReactNode
}

const Alert: React.FC<PropTypes> = ({ color, children }) => {
  let bgColorClass

  switch (color) {
    case 'danger':
      bgColorClass = 'bg-red-600 text-white'
      break
    case 'default':
      bgColorClass = 'bg-neutral-200 dark:bg-neutral-800'
      break
    default:
      bgColorClass = 'bg-blue-600 text-white'
  }

  return <div className={cn(bgColorClass, 'my-4 rounded-lg px-6 py-5 text-center text-sm')}>{children}</div>
}

export default Alert
