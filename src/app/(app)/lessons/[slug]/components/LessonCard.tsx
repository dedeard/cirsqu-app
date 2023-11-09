import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import moment from 'moment'
import { Clock, Film, Calendar, Code } from 'react-feather'
import formatSecond from '@/utils/format-second'
import ToggleCollection from '../../../components/ToggleCollection'

const LessonCard: React.FC<{ lesson: IALesson; className?: string }> = ({ lesson, className }) => {
  return (
    <section
      className={cn(
        className,
        'background-animate relative mb-3 overflow-hidden rounded-lg bg-gradient-to-br from-white/70 via-primary/50 to-primary p-3 text-neutral-800 dark:from-black/70 dark:via-blue-600/50 dark:to-black/70 dark:text-neutral-200 md:p-6',
      )}
    >
      <div className="flex flex-col py-6">
        <div className="flex gap-3">
          {lesson.subjects.map((subject) => (
            <Link
              key={subject.slug}
              href={`/subjects/${subject.slug}`}
              className="block rounded-full border border-neutral-200 bg-neutral-200/30 px-3 py-1 text-sm text-neutral-800 hover:border-neutral-300 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-800/30 dark:text-neutral-100 dark:hover:border-neutral-600"
            >
              {subject.name}
            </Link>
          ))}
        </div>

        <h1 className="my-3 text-2xl font-semibold lg:text-3xl">{lesson.title}</h1>

        <div className="mb-6">
          <span className="mr-6 inline-flex  items-center justify-center gap-2 text-sm">
            <Film className="block h-[1em] w-[1em] opacity-60" />
            <span className="block leading-none">{lesson.episodes.length} Episodes</span>
          </span>
          <span className="mr-6 inline-flex  items-center justify-center gap-2 text-sm">
            <Clock className="block h-[1em] w-[1em] opacity-60" />
            <span className="block leading-none">{formatSecond(lesson.seconds)}</span>
          </span>
          <span className="mr-6 inline-flex items-center justify-center gap-2 text-sm">
            <Calendar className="block h-[1em] w-[1em] opacity-60" />
            <span className="block leading-none">{moment.unix(lesson.createdAt).fromNow()}</span>
          </span>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/lessons/${lesson.slug}/${lesson.episodes[0]?.episodeId}`}
            className="hoverable-blue peer flex h-10 items-center rounded-lg px-6 text-sm"
            rel="nofollow"
          >
            Start watching
          </Link>
          <ToggleCollection lessonId={lesson.lessonId} />
        </div>
      </div>
      <div className="absolute right-0 top-1/2  -translate-y-1/2 text-[50vw] opacity-50 md:text-[30vw]">
        <div className="flex h-[1.2em] w-[1.2em] rotate-12 items-center justify-center  rounded-full bg-neutral-900/50 leading-none text-white">
          <Code className="block h-3/4 w-3/4 opacity-50" />
        </div>
      </div>
    </section>
  )
}

export default LessonCard
