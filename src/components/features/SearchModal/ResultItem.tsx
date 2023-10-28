import React from 'react'
import { Chip, Skeleton } from '@nextui-org/react'
import { Clock, Film } from 'react-feather'
import formatSecond from '@/utils/format-second'

const ResultItem: React.FC = () => {
  return (
    <a href="#" className="flex flex-col gap-3 rounded-medium border border-divider bg-content1 p-3">
      <span className="flex gap-3">
        <Chip size="sm" className="h-auto" classNames={{ content: 'text-[11px]' }}>
          LARAVEL
        </Chip>
      </span>
      <span className="block text-sm">
        Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur dolor sit amet consectetur dolor sit amet consectetur adipisicing
        elit.
      </span>
      <span className="flex gap-6 text-xs">
        <span className="flex items-center justify-center gap-2">
          <Film className="block h-[1em] w-[1em] opacity-60" />
          <span className="block leading-none">10 Episodes</span>
        </span>
        <span className="flex items-center justify-center gap-2">
          <Clock className="block h-[1em] w-[1em] opacity-60" />
          <span className="block leading-none">20mins 30secs</span>
        </span>
      </span>
    </a>
  )
}

export const ResultItemSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 rounded-medium border border-divider bg-content1 p-3">
      <div className="flex gap-3">
        <Skeleton className="h-5 w-14 rounded-medium" />
        <Skeleton className="h-5 w-14 rounded-medium" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-full rounded-medium" />
        <Skeleton className="h-3 w-1/2 rounded-medium" />
      </div>
      <div className="flex gap-6 text-xs">
        <Skeleton className="h-3 w-24 rounded-medium" />
        <Skeleton className="h-3 w-20 rounded-medium" />
      </div>
    </div>
  )
}

export default ResultItem
