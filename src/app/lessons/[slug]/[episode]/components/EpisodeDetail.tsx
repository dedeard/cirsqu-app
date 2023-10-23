import React from 'react'
import { Chip, Divider, Skeleton } from '@nextui-org/react'
import Link from 'next/link'
import Markdown from 'react-markdown'

type PropTypes = {
  lesson: IALesson
  episode?: IEpisode
  loading: boolean
}

const EpisodeDetail: React.FC<PropTypes> = ({ loading, episode, lesson }) => {
  return (
    <>
      <div className="container my-12 max-w-4xl px-3">
        <div className="flex gap-3">
          {lesson.subjects.map((subject) => (
            <Chip key={subject.slug} as={Link} variant="flat" href={`/subjects/${subject.slug}`}>
              <span className="font-semibold">{subject.name}</span>
            </Chip>
          ))}
        </div>
        <div className="my-3">
          <span className="text-lg font-light text-foreground/80">{lesson.title}</span>
        </div>
        <h1 className="text-4xl">
          {String((episode?.index || 0) + 1).padStart(2, '0')}. {episode?.title}
        </h1>
      </div>

      <Divider />

      <div className="container my-12 max-w-4xl px-3">
        <h2 className="relative mb-8 text-2xl">
          <span className="relative before:absolute before:-bottom-2 before:block before:h-1 before:w-3/4 before:rounded-full before:bg-primary before:content-[''] after:absolute after:-bottom-4 after:block after:h-1 after:w-1/2 after:rounded-full after:bg-foreground/50 after:content-['']">
            Episode overview
          </span>
        </h2>
        <div className="flex flex-col items-center justify-center">
          <Skeleton className="h-4" />
        </div>
        {!loading && episode?.description && (
          <Markdown className="prose w-full max-w-full text-foreground/80">{episode.description}</Markdown>
        )}
      </div>
    </>
  )
}

export default EpisodeDetail
