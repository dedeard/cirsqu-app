'use client'
import React from 'react'
import Link from 'next/link'
import { Clock, Lock, PlayCircle } from 'react-feather'
import { useParams } from 'next/navigation'
import formatSecond from '@/utils/transforms/format-second'
import { useAuth } from '@/components/contexts/AuthContext'

const EpisodeItem: React.FC<{ episode: IAEpisode }> = ({ episode }) => {
  const { profile } = useAuth()
  const params = useParams()

  return (
    <Link
      href={`/lessons/${params.slug}/${episode.episodeId}`}
      className="hoverable-default flex items-center justify-between overflow-hidden rounded-lg border p-5"
      rel="nofollow"
    >
      {!(profile?.premium || episode.premium) || profile?.premium ? (
        <PlayCircle className="block h-6 w-6 opacity-40" />
      ) : (
        <Lock className="block h-6 w-6 opacity-40" />
      )}
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
    </Link>
  )
}

export default EpisodeItem
