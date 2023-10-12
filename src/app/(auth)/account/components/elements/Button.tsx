import React from 'react'
import cn from 'classnames'
import { Spinner } from '@nextui-org/react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

export const Button: React.FC<ButtonProps> = ({ loading, children, ...props }) => (
  <div className="lg:grid lg:grid-cols-3 lg:gap-3">
    <span className="block" />
    <div className="lg:col-span-2">
      <button
        className={cn(
          loading
            ? 'cursor-wait text-transparent'
            : 'cursor-pointer text-white hover:bg-primary-700 disabled:cursor-not-allowed hover:disabled:bg-primary-600',
          'group relative inline-block min-w-[100px] select-none items-center justify-center rounded-full bg-primary-600 px-5 py-3 text-center text-sm font-semibold leading-none   disabled:opacity-70',
        )}
        {...props}
      >
        {children}
        {loading && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
            <Spinner className="h-8 w-8" />
          </span>
        )}
      </button>
    </div>
  </div>
)

export default Button
