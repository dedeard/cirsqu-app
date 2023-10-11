import Spinner from '@/app/components/svg/Spinner'
import React from 'react'
import { Lock } from 'react-feather'

const LoadingIcon: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  return (
    <span className="flex h-20 w-20 animate-pulse items-center justify-center rounded-full md:scale-150 ">
      <Spinner className="h-full w-full text-slate-500" />
      <Lock className="absolute h-8 w-8 text-slate-400" />
    </span>
  )
}

export default LoadingIcon
