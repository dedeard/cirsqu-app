import React from 'react'
import { Eye, EyeOff, AlertCircle } from 'react-feather'

type PropTypes = {
  label: string
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<PropTypes> = ({ label, error, type, placeholder, ...props }) => {
  const [show, setShow] = React.useState(false)

  return (
    <div className="mb-4">
      <div className={`relative transition-spacing ease-in-out ${error ? 'mb-2' : 'mb-0'}`}>
        <label htmlFor={props.name} className=" pointer-events-none absolute left-px top-px block pl-3 pt-1 text-xs font-medium">
          {label}
        </label>

        <input
          id={props.name}
          type={show ? 'text' : type}
          placeholder={placeholder || label}
          autoComplete={type === 'password' ? 'off' : 'on'}
          {...props}
          className={`block w-full rounded-none border pb-1 pl-3 pr-10 pt-5 text-base ring-primary-600 transition-all last:pr-3 focus:rounded focus:outline-none focus:ring-2 ${
            error ? 'border-red-700' : 'border-gray-300'
          }`}
        />

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
        <div className="flex items-center rounded bg-red-100 p-2 text-sm">
          <AlertCircle className="block h-6 w-6 text-red-950" />
          <span className="ml-2 block">{error}</span>
        </div>
      )}
    </div>
  )
}

export default Input
