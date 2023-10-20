import React from 'react'
import { Clock, Lock, PlayCircle } from 'react-feather'
import formatSecond from '@/utils/format-second'
import Link from 'next/link'

type PropTypes = {
  index: number
  title: string
  seconds: number
  lock?: boolean
  slug: string
  episodeId: string
}

const Content: React.FC<{ index: number; title: string; seconds: number; lock?: boolean }> = ({ index, title, seconds, lock }) => (
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

const EpisodeItem: React.FC<PropTypes> = ({ index, title, seconds, lock = false, slug, episodeId }) => {
  const commonClassNames = 'flex items-center justify-between overflow-hidden rounded-medium border border-divider p-5'

  return lock ? (
    <span className={`${commonClassNames} opacity bg-content2`}>
      <Content index={index} title={title} seconds={seconds} lock={lock} />
    </span>
  ) : (
    <Link href={`/lessons/${slug}/${episodeId}`} className={`${commonClassNames} bg-content1 hover:bg-content2`}>
      <Content index={index} title={title} seconds={seconds} />
    </Link>
  )
}

export default EpisodeItem
