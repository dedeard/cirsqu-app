import React from 'react'
import EpisodeItem from './EpisodeItem'

const LessonEpisodes: React.FC<React.HTMLAttributes<HTMLDivElement> & { episodes: IAEpisode[] }> = ({ episodes, ...props }) => {
  return (
    <section {...props}>
      <h2 className="relative mb-8 text-2xl">
        <span className="relative before:absolute before:-bottom-2 before:block before:h-1 before:w-3/4 before:rounded-full before:bg-blue-600 before:content-[''] after:absolute after:-bottom-4 after:block after:h-1 after:w-1/2 after:rounded-full after:bg-neutral-500 after:content-['']">
          Lesson episodes ({episodes.length})
        </span>
      </h2>

      <ul className="flex flex-col gap-3">
        {episodes.map((episode) => (
          <li key={episode.episodeId}>
            <EpisodeItem episode={episode} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default LessonEpisodes
