import cn from 'classnames'
import { useEffect, useRef } from 'react'
import Label from './Label'
import ValidationError from './ValidationError'

type PropTypes = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  error?: string
}

const Textarea: React.FC<PropTypes> = ({ label, error, className, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.minHeight = `${textareaRef.current.scrollHeight}px`
    }
  }, [props.value])

  return (
    <div className={className}>
      <div className={cn(error ? 'mb-2' : 'mb-0', 'relative transition-spacing ease-in-out')}>
        <Label htmlFor={props.name}>{label}</Label>
        <textarea
          id={props.name}
          ref={textareaRef}
          className={cn(
            error ? 'border-red-600' : 'border-neutral-300 dark:border-neutral-700',
            'box-border block w-full rounded-lg border bg-neutral-200/30 p-3 text-base ring-blue-600 focus:outline-none focus:ring-[3px] dark:bg-neutral-800/30',
          )}
          {...props}
        />
      </div>

      <ValidationError error={error} />
    </div>
  )
}

export default Textarea
