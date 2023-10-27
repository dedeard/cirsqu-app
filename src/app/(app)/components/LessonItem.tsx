'use client'
import React from 'react'
import Link from 'next/link'
import { Button, CardProps, Chip } from '@nextui-org/react'
import { Clock, Code, Film } from 'react-feather'
import Card from './Card'
import formatSecond from '@/utils/format-second'
import ToggleCollection from './ToggleCollection'

const LessonItem: React.FC<{ lesson: IALesson } & CardProps> = ({ lesson, classNames, ...props }) => {
  return (
    <Card classNames={{ ...classNames, body: 'flex flex-col gap-3' }} {...props}>
      <div className="flex gap-3">
        {lesson.subjects.map((subject) => (
          <Chip key={subject.slug} as={Link} href={`/subjects/${subject.slug}`}>
            {subject.name}
          </Chip>
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
        <Button as={Link} href={`/lessons/${lesson.slug}`} color="primary" className="peer w-28">
          Watch
        </Button>
        <div className="absolute right-0 top-1/2 z-0 -translate-y-1/2 text-[40vw] transition-transform peer-hover:scale-110 md:text-[30vw] lg:text-[20vw]">
          <div className="flex h-[1.5em] w-[1.5em] rotate-12 items-center justify-center leading-none">
            <Code className="block h-3/4 w-3/4 opacity-10" />
          </div>
        </div>
        <ToggleCollection lessonId={lesson.lessonId} />
      </div>
    </Card>
  )
}

export default LessonItem
