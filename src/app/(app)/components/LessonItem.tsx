'use client'
import React from 'react'
import Link from 'next/link'
import { Clock, Code, Film } from 'react-feather'
import formatSecond from '@/utils/transforms/format-second'
import ToggleCollection from './ToggleCollection'

const LessonItem: React.FC<{ lesson: IALesson }> = ({ lesson }) => {
  const [hover, setHover] = React.useState(false)

  return (
    <div
      data-hover={hover}
      className="group relative flex flex-col gap-3 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200/30 p-3 text-neutral-800 data-[hover=true]:border-neutral-300 data-[hover=true]:bg-neutral-200/50 dark:border-neutral-800 dark:bg-neutral-800/30 dark:text-neutral-100 dark:data-[hover=true]:border-neutral-600 dark:data-[hover=true]:bg-neutral-800/50 md:p-6"
    >
      <div className="flex gap-3">
        {lesson.subjects.map((subject) => (
          <Link
            key={subject.slug}
            href={`/subjects/${subject.slug}`}
            className="hoverable-default block rounded-full border px-3 py-1 text-xs"
          >
            {subject.name} {hover}
          </Link>
        ))}
      </div>

      <h3 className="text-xl">{lesson.title}</h3>

      <div className="flex gap-6 pb-2">
        <span className="flex items-center justify-center gap-2 text-sm">
          <Film className="block h-[1em] w-[1em] opacity-60" />
          <span className="block leading-none">{lesson.episodes.length} Episodes</span>
        </span>
        <span className="flex items-center justify-center gap-2 text-sm">
          <Clock className="block h-[1em] w-[1em] opacity-60" />
          <span className="block leading-none">{formatSecond(lesson.seconds)}</span>
        </span>
      </div>

      <div className="flex gap-3">
        <Link
          href={`/lessons/${lesson.slug}`}
          className="hoverable-blue peer flex h-10 items-center rounded-lg px-8 text-sm"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Watch
        </Link>
        <ToggleCollection lessonId={lesson.lessonId} />
      </div>

      <div className="absolute right-0 top-1/2 z-0 -translate-y-1/2 text-[40vw] transition-transform peer-hover:scale-110 md:text-[30vw] lg:text-[20vw]">
        <div className="flex h-[1.5em] w-[1.5em] rotate-12 items-center justify-center leading-none">
          <Code className="block h-3/4 w-3/4 opacity-10" />
        </div>
      </div>
    </div>
  )
}

export default LessonItem
