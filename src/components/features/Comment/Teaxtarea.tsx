import cn from 'classnames'
import { useEffect, useRef } from 'react'
import { AlertCircle } from 'react-feather'

type PropTypes = {
  loading?: boolean
  error?: string
  small?: boolean
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea: React.FC<PropTypes> = ({ small, error, required, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.minHeight = `${textareaRef.current.scrollHeight}px`
    }
  }, [props.value])

  return (
    <>
      <div className={cn(error ? 'mb-2' : 'mb-0', 'relative transition-spacing ease-in-out')}>
        <textarea
          ref={textareaRef}
          id={props.name}
          className={cn(
            small ? 'text-sm' : 'text-base',
            error ? 'border-red-600' : 'border-neutral-300 dark:border-neutral-700',
            'box-border block w-full overflow-hidden rounded-lg border bg-neutral-200/30 p-3 ring-blue-600 focus:outline-none focus:ring-[3px] dark:bg-neutral-800/30',
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
    </>
  )
}
