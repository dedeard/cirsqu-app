import { ButtonProps, Button as NButton } from '@nextui-org/react'
import { ArrowRight } from 'react-feather'

const Button: React.FC<ButtonProps> = ({ children, disabled, ...props }) => (
  <NButton
    {...props}
    disabled={disabled}
    color="primary"
    className="mx-auto flex h-14 w-full max-w-xs items-center justify-center px-6 text-lg font-semibold leading-none"
  >
    {children}
    <span className="ml-auto text-2xl">
      <ArrowRight />
    </span>
  </NButton>
)

export default Button
