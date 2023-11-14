import Link from 'next/link'
import DescriptionMarkdown from '@/components/elements/DescriptionMarkdown'

type PropTypes = {
  lesson: IALesson
  episode: IEpisode
}

const EpisodeDetail: React.FC<PropTypes> = ({ episode, lesson }) => {
  return (
    <div className="container max-w-4xl px-3 py-12">
      <div className="flex gap-3">
        {lesson.subjects.map((subject) => (
          <Link
            key={subject.slug}
            href={`/subjects/${subject.slug}`}
            className="hoverable-default rounded-lg border px-3 py-1 text-sm font-semibold"
          >
            {subject.name}
          </Link>
        ))}
      </div>

      <div className="my-3">
        <span className="text-lg font-light opacity-80">{lesson.title}</span>
      </div>

      <h1 className="text-2xl md:text-3xl lg:text-4xl [&:not(:last-child)]:mb-8">
        {String(episode.index + 1).padStart(2, '0')}. {episode.title}
      </h1>

      <DescriptionMarkdown className="prose prose-sm prose-invert w-full max-w-full">{episode.description}</DescriptionMarkdown>
    </div>
  )
}

export default EpisodeDetail
