'use client'
import React from 'react'
import Link from 'next/link'
import { Lock, PlayCircle } from 'react-feather'
import formatSecond from '@/utils/format-second'
import { useParams } from 'next/navigation'
import classNames from 'classnames'

type PropTypes = {
  index: number
  title: string
  seconds: number
  lock?: boolean
  slug: string
  episodeId: string
}

type ContentPropTypes = {
  index: number
  title: string
  seconds: number
  lock?: boolean
  active?: boolean
}

const Content: React.FC<ContentPropTypes> = ({ index, title, seconds, lock, active }) => (
  <>
    {lock ? <Lock className="block h-6 w-6 opacity-50" /> : <PlayCircle className="block h-6 w-6 opacity-50" />}
    <h3 className="flex-1 truncate px-4 text-sm">
      {active && <span className="mb-0 block text-xs opacity-50">NOW PLAYING</span>}
      <span className="block truncate">
        {String(index + 1).padStart(2, '0')}. {title}
      </span>
    </h3>
    <div className="whitespace-nowrap text-xs opacity-50">
      <span>{formatSecond(seconds, { s: 's', m: 'm', h: 'h', p: '' })}</span>
    </div>
  </>
)

const EpisodeItem: React.FC<PropTypes> = ({ index, title, seconds, lock = false, slug, episodeId }) => {
  const params = useParams()
  const active = params.episode === episodeId

  return lock ? (
    <span className="relative flex h-16 w-full items-center justify-between overflow-hidden rounded-medium px-4 opacity-75">
      <Content index={index} title={title} seconds={seconds} lock />
    </span>
  ) : (
    <Link
      href={`/lessons/${slug}/${episodeId}`}
      className={classNames(
        active && 'bg-white/10',
        'relative flex h-16 w-full items-center justify-between overflow-hidden rounded-medium px-4 hover:bg-white/10',
      )}
    >
      <Content index={index} title={title} seconds={seconds} active={active} />
    </Link>
  )
}

export default EpisodeItem
