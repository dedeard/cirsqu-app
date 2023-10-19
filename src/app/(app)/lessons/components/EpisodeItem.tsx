import React from 'react'
import { Clock, Lock, PlayCircle } from 'react-feather'
import formatSecond from '@/utils/format-second'
import Link from 'next/link'

type PropTypes = {
  index: number
  title: string
  seconds: number
  lock: boolean
  slug: string
}

const EpisodeItem: React.FC<PropTypes> = ({ index, title, seconds, lock, slug }) => {
  const content = (
    <>
      {lock ? <Lock className="block h-6 w-6 opacity-40" /> : <PlayCircle className="block h-6 w-6 opacity-40" />}
      <h3 className="flex flex-1 items-center px-4 text-sm">
        <span className="mr-2 block">{String(index + 1).padStart(2, '0')}.</span>
        <span className="block">{title}</span>
      </h3>
      <div className="flex items-center text-xs opacity-75">
        <div className="my-auto mr-1">
          <Clock className="h-[1em] w-[1em]" />
        </div>
        <div className="my-auto whitespace-nowrap">{formatSecond(seconds)}</div>
      </div>
    </>
  )

  if (lock) {
    return (
      <span className="flex items-center justify-between overflow-hidden rounded-medium border border-divider bg-content2 p-5 opacity-75">
        {content}
      </span>
    )
  }

  return (
    <Link
      href={`/lessons/${slug}${index ? '?index=' + index : ''}`}
      className="flex items-center justify-between overflow-hidden rounded-medium border border-divider bg-content1 p-5 hover:bg-content2"
    >
      {content}
    </Link>
  )
}

export default EpisodeItem
