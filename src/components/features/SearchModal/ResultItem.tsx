import React from 'react'
import { Chip, Skeleton } from '@nextui-org/react'
import { Clock, Film } from 'react-feather'
import formatSecond from '@/utils/format-second'
import { Hit } from '@/types/algolia'
import Link from 'next/link'

const ResultItem: React.FC<{ lesson: Hit<IALesson> }> = ({ lesson }) => {
  return (
    <Link href={`/lessons/${lesson.objectID}`} className="flex flex-col gap-3 rounded-medium border border-divider bg-content1 p-3">
      <span className="flex gap-3">
        {lesson.subjects.map((el) => (
          <Chip key={el.slug} size="sm" className="h-auto" classNames={{ content: 'text-[11px]' }}>
            {el.name}
          </Chip>
        ))}
      </span>
      <span
        className="block text-sm [&>em]:not-italic [&>em]:text-primary"
        dangerouslySetInnerHTML={{ __html: lesson._highlightResult.title.value }}
      />
      <span className="flex gap-6 text-xs">
        <span className="flex items-center justify-center gap-2">
          <Film className="block h-[1em] w-[1em] opacity-60" />
          <span className="block leading-none">{lesson.episodes.length} Episodes</span>
        </span>
        <span className="flex items-center justify-center gap-2">
          <Clock className="block h-[1em] w-[1em] opacity-60" />
          <span className="block leading-none">{formatSecond(lesson.seconds)}</span>
        </span>
      </span>
    </Link>
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
