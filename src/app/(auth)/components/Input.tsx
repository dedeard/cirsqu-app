import React from 'react'
import cn from 'classnames'
import { Eye, EyeOff, AlertCircle } from 'react-feather'
import Spinner from '@/components/svg/Spinner'

type PropTypes = {
  label: string
  loading?: boolean
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, PropTypes>(({ label, error, type, loading, ...props }, ref) => {
  const [show, setShow] = React.useState(false)

  return (
    <div className="mb-4">
      <div className={cn(error ? 'mb-2' : 'mb-0', 'relative transition-spacing ease-in-out')}>
        <label htmlFor={props.name} className="pointer-events-none absolute left-px top-px block pl-3 pt-2 text-xs font-medium">
          {label}
        </label>

        <input
          ref={ref}
          id={props.name}
          type={show ? 'text' : type}
          autoComplete={type === 'password' ? 'off' : 'on'}
          className={cn(
            error ? 'border-red-600' : 'border-neutral-300 dark:border-neutral-700',
            'block w-full rounded-lg border-2 bg-neutral-200/30 pb-2 pl-3 pr-10 pt-6 text-base ring-blue-600 last:pr-3 focus:outline-none focus:ring-[3px] dark:bg-neutral-800/30',
          )}
          {...props}
        />

        {loading && (
          <div className="pointer-events-none absolute right-0 top-0 flex h-full rounded-r p-0 px-3">
            <Spinner className="m-auto h-5 w-5 text-blue-600" />
          </div>
        )}

        {type === 'password' && (
          <button
            aria-hidden="true"
            type="button"
            className="absolute right-0 top-0 block h-full cursor-pointer rounded-r border-none bg-transparent px-3 focus:outline-none"
            onClick={() => setShow(!show)}
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center rounded-lg bg-red-100 p-2 text-sm">
          <AlertCircle className="block h-6 w-6 text-red-600" />
          <span className="ml-2 block text-neutral-800">{error}</span>
        </div>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
