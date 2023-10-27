'use client'
import React from 'react'
import Link from 'next/link'
import { Button, Chip, Skeleton } from '@nextui-org/react'
import { Clock, Film, X } from 'react-feather'
import formatSecond from '@/utils/format-second'
import Card from '@/components/elements/Card'

type PropTypes = {
  collectionId: string
  lesson: IALesson
  setDeleteQueue: (collectionId: string | null) => void
}

const LessonList: React.FC<PropTypes> = ({ lesson, collectionId, setDeleteQueue }) => {
  return (
    <li className="relative" role="listitem">
      <Button
        type="button"
        aria-label="Delete button"
        isIconOnly
        color="danger"
        size="sm"
        radius="full"
        variant="faded"
        className="absolute right-3 top-3 z-20"
        onClick={() => setDeleteQueue(collectionId)}
      >
        <X className="h-[1.3em] w-[1.3em]" />
      </Button>
      <Card as={Link} href={`/lessons/${lesson.slug}`} isHoverable isPressable forceBodyClassName="flex flex-col gap-2 p-4">
        <div className="flex gap-3">
          {lesson.subjects.map((subject) => (
            <Chip key={subject.slug} size="sm" radius="sm" variant="flat" classNames={{ content: 'text-xs' }}>
              {subject.name}
            </Chip>
          ))}
        </div>

        <span className="block text-lg">{lesson.title}</span>

        <div className="flex gap-6 text-xs">
          <span className="flex items-center justify-center gap-2">
            <Film className="block h-[1em] w-[1em] opacity-60" />
            <span className="block leading-none">{lesson.episodes.length} Episodes</span>
          </span>
          <span className="flex items-center justify-center gap-2">
            <Clock className="block h-[1em] w-[1em] opacity-60" />
            <span className="block leading-none">{formatSecond(lesson.seconds)}</span>
          </span>
        </div>
      </Card>
    </li>
  )
}

export const LessonListSkeleton: React.FC = () => {
  return (
    <li className="relative" role="listitem">
      <Skeleton className="absolute right-3 top-3 z-20 h-8 w-8 rounded-full" />
      <Card forceBodyClassName="flex flex-col gap-2 p-4">
        <div className="flex gap-3">
          <Skeleton className="h-6 w-16 rounded-medium" />
          <Skeleton className="h-6 w-16 rounded-medium" />
        </div>

        <Skeleton className="h-7 w-2/3 rounded-medium md:w-1/2" />

        <div className="flex gap-2">
          <Skeleton className="h-3 w-24 rounded-medium " />
          <Skeleton className="h-3 w-24 rounded-medium " />
        </div>
      </Card>
    </li>
  )
}

export default LessonList
