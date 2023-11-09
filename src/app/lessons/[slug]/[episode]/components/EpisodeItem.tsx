import React from 'react'
import Link from 'next/link'
import { Lock, PlayCircle } from 'react-feather'
import formatSecond from '@/utils/format-second'
import { useParams } from 'next/navigation'
import cn from 'classnames'
import { useAuth } from '@/components/contexts/AuthContext'

const EpisodeItem = React.forwardRef<HTMLAnchorElement, { episode: IAEpisode }>(({ episode }, ref) => {
  const { profile } = useAuth()
  const params = useParams()

  let lock = episode.premium
  if (profile?.premium) lock = false
  const active = params.episode === episode.episodeId

  return (
    <Link
      ref={active ? ref : undefined}
      href={`/lessons/${params.slug}/${episode.episodeId}`}
      className={cn(
        active && 'bg-white/10',
        'rounded-medium relative flex h-16 w-full items-center justify-between overflow-hidden px-4 hover:bg-white/10',
      )}
    >
      {lock ? <Lock className="block h-6 w-6 opacity-50" /> : <PlayCircle className="block h-6 w-6 opacity-50" />}
      <h3 className="flex-1 truncate px-4 text-sm">
        {active && <span className="mb-0 block text-xs opacity-50">NOW PLAYING</span>}
        <span className="block truncate">
          {String(episode.index + 1).padStart(2, '0')}. {episode.title}
        </span>
      </h3>
      <div className="whitespace-nowrap text-xs opacity-50">
        <span>{formatSecond(episode.seconds, { s: 's', m: 'm', h: 'h', p: '' })}</span>
      </div>
    </Link>
  )
})

EpisodeItem.displayName = 'EpisodeItem'

export default EpisodeItem
