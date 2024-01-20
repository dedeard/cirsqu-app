import React from 'react'
import { AlertCircle } from 'react-feather'

const ValidationError: React.FC<{ error?: string | string[] }> = ({ error }) => {
  if (!error) return null
  return (
    <div className="flex items-center rounded-lg bg-red-100 p-2 text-sm">
      <AlertCircle className="block h-6 w-6 text-red-600" />
      <span className="ml-2 block text-neutral-800">{error}</span>
    </div>
  )
}

export default ValidationError
