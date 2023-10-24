import React from 'react'
import { Skeleton } from '@nextui-org/react'

export const CommentItemSkeleton: React.FC = () => {
  return (
    <li className="relative w-full">
      <div className="absolute">
        <Skeleton className="h-10 w-10 rounded-full md:h-12 md:w-12" />
      </div>
      <div className="flex w-full flex-col gap-4 pl-14 md:pl-16">
        <div className="flex w-full flex-col gap-4">
          <div className="flex h-9 flex-col justify-center gap-1 md:h-10">
            <Skeleton className="h-3 w-44 rounded-full" />
            <Skeleton className="h-2 w-32 rounded-full" />
          </div>

          <div className="flex flex-col items-center justify-center gap-3">
            {Array.from(Array(3).keys()).map((i) => (
              <Skeleton key={i} className="block h-3 w-full rounded-full" />
            ))}
          </div>

          <div className="flex gap-4">
            <Skeleton className="block h-4 w-10 rounded-full md:h-5" />
            <Skeleton className="block h-4 w-10 rounded-full md:h-5" />
          </div>
        </div>
      </div>
    </li>
  )
}

export const CommentFormSkeleton: React.FC = () => {
  return (
    <div className="mb-10 mt-5">
      <Skeleton className="mb-3 block h-28 rounded-medium" />
      <Skeleton className="block h-10 w-36 rounded-medium" />
    </div>
  )
}
