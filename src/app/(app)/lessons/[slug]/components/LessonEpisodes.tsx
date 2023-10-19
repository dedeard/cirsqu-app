import React from 'react'
import EpisodeItem from '../../components/EpisodeItem'

const LessonEpisodes: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div {...props}>
      <h2 className="relative mb-8 text-2xl font-bold">
        <span className="relative before:absolute before:-bottom-2 before:block before:h-1 before:w-3/4 before:rounded-full before:bg-primary before:content-[''] after:absolute after:-bottom-4 after:block after:h-1 after:w-1/2 after:rounded-full after:bg-foreground/50 after:content-['']">
          Lesson episodes (10)
        </span>
      </h2>

      <ul className="flex flex-col gap-3">
        {Array.from(Array(5).keys()).map((i) => (
          <li key={i}>
            <EpisodeItem
              index={i}
              slug="slug"
              title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
              seconds={i * 3264 + 89}
              lock={Boolean(i % 2 !== 0)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LessonEpisodes
