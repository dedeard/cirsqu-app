import { Spinner } from '@nextui-org/react'
import classNames from 'classnames'
import React from 'react'
import { Lock } from 'react-feather'

const LoadingCard: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <div className={classNames(className, 'relative h-[236px]')} {...props}>
      <div className="absolute bottom-0 left-0 right-0 top-0 flex  items-center justify-center rounded-medium bg-white shadow">
        <span className="relative flex h-20 w-20 animate-pulse items-center justify-center overflow-hidden rounded-full bg-white text-gray-500 ring-[3px] ring-inset ring-gray-300 ">
          <Lock className="h-8 w-8" />
          <Spinner size="lg" className="absolute left-0 top-0 block h-20 w-20 [&>div]:h-20 [&>div]:w-20" />
        </span>
      </div>
    </div>
  )
}

export default LoadingCard
