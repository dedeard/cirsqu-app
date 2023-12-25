import cn from 'classnames'
import { AlertCircle } from 'react-feather'
import Label from './Label'
import ValidationError from './ValidationError'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

const Input: React.FC<InputProps> = ({ label, error, type, className, ...props }) => {
  return (
    <div className={className}>
      <div className={cn(error ? 'mb-2' : 'mb-0', 'relative transition-spacing ease-in-out')}>
        <Label htmlFor={props.name}>{label}</Label>
        <input
          id={props.name}
          type={type}
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

export default Input
