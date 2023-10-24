import React from 'react'
import { Skeleton } from '@nextui-org/react'

const CommentSkeleton: React.FC = () => {
  return (
    <>
      <div className="pr-5">
        <Skeleton className="block h-12 w-12 rounded-full" />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-4">
        <div className="flex h-12 flex-col justify-center gap-1">
          <Skeleton className="h-3 w-44 rounded-full" />
          <Skeleton className="h-2 w-32 rounded-full" />
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          {Array.from(Array(3).keys()).map((i) => (
            <Skeleton key={i} className="block h-3 w-full rounded-full" />
          ))}
        </div>

        <div className="flex justify-end">
          <Skeleton className="block h-6 w-10 rounded-full" />
        </div>
      </div>
    </>
  )
}

export default CommentSkeleton
