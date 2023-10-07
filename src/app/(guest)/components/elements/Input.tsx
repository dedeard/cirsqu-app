import InputError from '@/app/components/elements/InputError'
import Loading from '@/app/components/svg/Loading'
import React from 'react'
import { Eye, EyeOff, AlertCircle } from 'react-feather'

type PropTypes = {
  label: string
  loading?: boolean
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<PropTypes> = ({ label, loading, error, type, placeholder, ...props }) => {
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

        {loading && (
          <div className="pointer-events-none absolute right-0 top-0 flex h-full rounded-r p-0 px-3">
            <Loading className="m-auto h-5 w-5 text-primary-600" />
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

      <InputError error={error} />
    </div>
  )
}

export default Input
