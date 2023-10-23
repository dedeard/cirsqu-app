import React from 'react'
import EpisodeItem from './EpisodeItem'

const EpisodeList: React.FC<{ episodes: IAEpisode[] }> = ({ episodes }) => {
  const activeRef = React.useRef<HTMLAnchorElement>(null)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const offset = activeRef.current.offsetTop
      scrollRef.current.scrollTop = offset - 64
    }
  }, [])

  return (
    <div className="flex max-h-[500px] flex-col lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:top-0 lg:max-h-none">
      <h3 className="p-3 text-sm opacity-75">All Episodes ({episodes.length})</h3>
      <div ref={scrollRef} className="chrome-scrollbar flex-1 overflow-y-auto p-3">
        <ul className="flex flex-col gap-1">
          {episodes.map((episode) => (
            <li key={episode.episodeId}>
              <EpisodeItem episode={episode} ref={activeRef} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default EpisodeList
