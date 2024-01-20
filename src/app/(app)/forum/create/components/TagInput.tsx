import React from 'react'
import cn from 'classnames'
import Label from './Label'
import ValidationError from './ValidationError'

type PropTypes = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  options: string[]
  error?: string | string[]
}

const TagInput: React.FC<PropTypes> = ({ label, options, error, className, ...props }) => {
  return (
    <div className={className}>
      <div className={cn(error ? 'mb-2' : 'mb-0', 'relative transition-spacing ease-in-out')}>
        <Label htmlFor={props.name}>{label}</Label>
        <select
          multiple
          className={cn(
            error ? 'border-red-600' : 'border-neutral-300 dark:border-neutral-700',
            'box-border block w-full rounded-lg border bg-neutral-200/30 p-3 text-base ring-blue-600 focus:outline-none focus:ring-[3px] dark:bg-neutral-800/30',
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <ValidationError error={error} />
    </div>
  )
}

export default TagInput
