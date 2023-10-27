'use client'
import React from 'react'
import Link from 'next/link'
import { Button, Card, CardBody, CardProps, Chip } from '@nextui-org/react'
import { Clock, Film, Calendar, Code } from 'react-feather'
import moment from 'moment'
import formatSecond from '@/utils/format-second'
import ToggleCollection from '../../../components/ToggleCollection'

const LessonCard: React.FC<CardProps & { lesson: IALesson }> = ({ lesson, className, ...props }) => {
  return (
    <Card className={className + ' mb-3'} shadow="none" {...props}>
      <CardBody className="background-animate relative z-10 bg-gradient-to-br from-white/70 via-primary/50 to-primary dark:from-black/70 dark:via-primary/50 dark:to-black/70">
        <div className="flex flex-col py-6 md:py-12">
          <div className="flex gap-3">
            {lesson.subjects.map((subject) => (
              <Chip key={subject.slug} as={Link} variant="flat" href={`/subjects/${subject.slug}`}>
                {subject.name}
              </Chip>
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
            <Button as={Link} href={`/lessons/${lesson.slug}/${lesson.episodes[0]?.episodeId}`} color="primary" rel="nofollow">
              Start watching
            </Button>
            <ToggleCollection lessonId={lesson.lessonId} />
          </div>
        </div>
      </CardBody>
      <div className="absolute right-0 top-1/2 z-0 -translate-y-1/2 text-[50vw] opacity-50 md:text-[30vw]">
        <div className="flex h-[1.2em] w-[1.2em] rotate-12 items-center justify-center  rounded-full bg-slate-950 leading-none text-white">
          <Code className="block h-3/4 w-3/4 opacity-50" />
        </div>
      </div>
    </Card>
  )
}

export default LessonCard
