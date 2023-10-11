import React from 'react'
import { AlertCircle } from 'react-feather'

export const InputError: React.FC<{ error?: string | null }> = ({ error }) => {
  if (!error) return null
  return (
    <div className="flex items-center rounded bg-red-100 p-2 text-sm">
      <AlertCircle className="block h-5 w-5 text-red-950" />
      <span className="ml-2 block">{error}</span>
    </div>
  )
}

export default InputError
