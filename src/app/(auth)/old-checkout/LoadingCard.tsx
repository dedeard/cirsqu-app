import classNames from 'classnames'
import React from 'react'
import { Lock } from 'react-feather'

const LoadingCard: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <div className={classNames(className, 'relative py-24')} {...props}>
      <div className="absolute bottom-0  left-0 right-0 top-0 flex animate-pulse items-center justify-center border bg-white">
        <span className="flex h-20  w-20 items-center justify-center overflow-hidden rounded-full bg-white text-gray-500 ring-4 ring-gray-300 ">
          <Lock className="h-8 w-8" />
        </span>
      </div>
    </div>
  )
}

export default LoadingCard
