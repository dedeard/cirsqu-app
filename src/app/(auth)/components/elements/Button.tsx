import React from 'react'
import cn from 'classnames'
import { ArrowRight } from 'react-feather'

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => (
  <button
    type="submit"
    className={cn(
      className,
      'hoverable-blue mx-auto flex h-14 w-full max-w-xs items-center justify-center rounded-lg px-6 text-lg font-semibold leading-none',
    )}
    {...props}
  >
    {children}
    <span className="ml-auto text-2xl">
      <ArrowRight />
    </span>
  </button>
)

export default Button
