import { useState } from 'react'
import cn from 'classnames'
import Label from './Label'
import { AlertCircle, Eye, EyeOff } from 'react-feather'
import Spinner from '@/components/svg/Spinner'

type FormElementProps = {
  label: string
  loading?: boolean
  error?: string
}

type InputProps = FormElementProps & React.InputHTMLAttributes<HTMLInputElement>
type TextareaProps = FormElementProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Input: React.FC<InputProps> = ({ label, error, type, loading, required, className, ...props }) => {
  const [show, setShow] = useState(false)

  return (
    <Label htmlFor={props.name} text={label} required={required}>
      <div className="w-full lg:w-2/3">
        <div className={cn(error ? 'mb-2' : 'mb-0', 'relative transition-spacing ease-in-out')}>
          <input
            id={props.name}
            type={show ? 'text' : type}
            autoComplete={type === 'password' ? 'off' : 'on'}
            className={cn(
              error ? 'border-red-600' : 'border-neutral-300 dark:border-neutral-700',
              'box-border block w-full rounded-lg border bg-neutral-200/30 py-3 pl-3 pr-10 text-base ring-blue-600 last:pr-3 focus:outline-none focus:ring-[3px] dark:bg-neutral-800/30',
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
    </Label>
  )
}

export const Textarea: React.FC<TextareaProps> = ({ label, error, required, ...props }) => (
  <Label htmlFor={props.name} text={label} required={required}>
    <div className={cn(error ? 'mb-2' : 'mb-0', 'relative transition-spacing ease-in-out')}>
      <textarea
        id={props.name}
        className={cn(
          error ? 'border-red-600' : 'border-neutral-300 dark:border-neutral-700',
          'box-border block w-full rounded-lg border bg-neutral-200/30 py-3 pl-3 pr-10 text-base ring-blue-600 last:pr-3 focus:outline-none focus:ring-[3px] dark:bg-neutral-800/30',
        )}
        {...props}
      />
    </div>

    {error && (
      <div className="flex items-center rounded-lg bg-red-100 p-2 text-sm">
        <AlertCircle className="block h-6 w-6 text-red-600" />
        <span className="ml-2 block text-neutral-800">{error}</span>
      </div>
    )}
  </Label>
)
