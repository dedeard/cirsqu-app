import { ArrowRight } from 'react-feather'

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, disabled, ...props }) => (
  <button
    disabled={disabled}
    {...props}
    className={`mx-auto flex h-14 w-full max-w-xs cursor-pointer items-center justify-center rounded border-none bg-primary-600 px-6 text-lg font-semibold leading-none text-white transition-all ease-in-out ${
      disabled ? 'cursor-wait opacity-80' : 'hover:bg-primary-700'
    }`}
  >
    {children}
    <span className="ml-auto text-2xl">
      <ArrowRight />
    </span>
  </button>
)

export default Button
