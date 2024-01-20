import cn from 'classnames'
import Spinner from '@/components/svg/Spinner'

export const Button: React.FC<{ isLoading?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  isLoading,
  disabled,
  className,
  children,
  ...props
}) => (
  <button
    type="submit"
    disabled={disabled}
    className={cn(
      className,
      isLoading && '!cursor-progress !text-transparent',
      'hoverable-blue relative flex h-10 w-32 items-center justify-center rounded-lg disabled:cursor-not-allowed disabled:opacity-80',
    )}
    {...props}
  >
    {children}
    {isLoading && <Spinner height={16} width={16} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 stroke-white" />}
  </button>
)

export default Button
