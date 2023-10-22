'use client'
import React from 'react'
import { Clock, Lock, PlayCircle } from 'react-feather'
import formatSecond from '@/utils/format-second'
import Link from 'next/link'
import { useAuth } from '@/components/contexts/AuthContext'
import { useParams } from 'next/navigation'

const Content: React.FC<{ episode: IAEpisode; lock?: boolean }> = ({ episode, lock }) => (
  <>
    {lock ? <Lock className="block h-6 w-6 opacity-40" /> : <PlayCircle className="block h-6 w-6 opacity-40" />}
    <h3 className="flex flex-1 items-center px-4 text-sm">
      <span className="mr-2 block">{String(episode.index + 1).padStart(2, '0')}.</span>
      <span className="block">{episode.title}</span>
    </h3>
    <div className="flex items-center text-xs opacity-75">
      <div className="my-auto mr-1">
        <Clock className="h-[1em] w-[1em]" />
      </div>
      <div className="my-auto whitespace-nowrap">{formatSecond(episode.seconds)}</div>
    </div>
  </>
)

const EpisodeItem: React.FC<{ episode: IAEpisode }> = ({ episode }) => {
  const { profile } = useAuth()
  const params = useParams()

  let lock = episode.premium
  if (profile?.premium) lock = false

  const commonClassNames = 'flex items-center justify-between overflow-hidden rounded-medium border border-divider p-5'

  return lock ? (
    <span className={`${commonClassNames} opacity bg-content2`}>
      <Content episode={episode} lock={lock} />
    </span>
  ) : (
    <Link href={`/lessons/${params.slug}/${episode.episodeId}`} className={`${commonClassNames} bg-content1 hover:bg-content2`}>
      <Content episode={episode} lock={lock} />
    </Link>
  )
}

export default EpisodeItem
