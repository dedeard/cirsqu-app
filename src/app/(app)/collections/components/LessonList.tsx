'use client'
import React from 'react'
import Link from 'next/link'
import { Clock, Film, X } from 'react-feather'
import formatSecond from '@/utils/transforms/format-second'

type PropTypes = {
  collectionId: string
  lesson: IALesson
  setDeleteQueue: (collectionId: string | null) => void
}

const LessonList: React.FC<PropTypes> = ({ lesson, collectionId, setDeleteQueue }) => {
  return (
    <>
      <button
        type="button"
        title="Remove lesson from collection"
        className="hoverable-default absolute right-3 top-3 z-20 flex h-8 w-8 rounded-full border"
        onClick={() => setDeleteQueue(collectionId)}
      >
        <X className="m-auto block h-4 w-4 text-red-600" />
      </button>
      <Link href={`/lessons/${lesson.slug}`} className="hoverable-default group flex flex-col gap-2 rounded-lg border p-4">
        <div className="flex gap-3">
          {lesson.subjects.map((subject) => (
            <span
              key={subject.slug}
              className="flex h-6 items-center rounded-full border border-neutral-200 px-3 text-xs group-hover:border-neutral-300 dark:border-neutral-800 dark:group-hover:border-neutral-600"
            >
              {subject.name}
            </span>
          ))}
        </div>

        <h3 className="block text-lg">{lesson.title}</h3>

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
      </Link>
    </>
  )
}

export const LessonListSkeleton: React.FC = () => {
  return (
    <>
      <span className="skeleton absolute right-3 top-3 z-20 h-8 w-8 rounded-full" />
      <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-200/30 p-4 dark:border-neutral-800 dark:bg-neutral-800/30">
        <div className="flex gap-3">
          <span className="skeleton h-6 w-16 rounded-lg" />
          <span className="skeleton h-6 w-16 rounded-lg" />
        </div>

        <span className="skeleton h-7 w-2/3 rounded-lg md:w-1/2" />

        <div className="flex gap-2">
          <span className="skeleton h-3 w-24 rounded-lg " />
          <span className="skeleton h-3 w-24 rounded-lg " />
        </div>
      </div>
    </>
  )
}

export default LessonList
