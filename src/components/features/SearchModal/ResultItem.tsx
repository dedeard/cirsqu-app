import type { Hit } from '@/types/algolia'
import Link from 'next/link'
import { Clock, Film } from 'react-feather'
import formatSecond from '@/utils/transforms/format-second'

const ResultItem: React.FC<{ lesson: Hit<IALesson> }> = ({ lesson }) => {
  return (
    <Link href={`/lessons/${lesson.objectID}`} className="hoverable-default group flex flex-col gap-3 rounded-lg border p-3">
      <span className="flex gap-3">
        {lesson.subjects.map((el) => (
          <span
            key={el.slug}
            className="flex rounded-lg border border-neutral-200 px-2 text-[11px] group-hover:border-neutral-300 dark:border-neutral-800 dark:group-hover:border-neutral-600"
          >
            {el.name}
          </span>
        ))}
      </span>
      <span
        className="[&>em]:text-primary block text-sm [&>em]:not-italic"
        dangerouslySetInnerHTML={{ __html: lesson._highlightResult.title.value }}
      />
      <span className="flex gap-6 text-xs">
        <span className="flex items-center justify-center gap-2">
          <Film className="block h-[1em] w-[1em] opacity-60" />
          <span className="block leading-none">{lesson.episodes.length} Episodes</span>
        </span>
        <span className="flex items-center justify-center gap-2">
          <Clock className="block h-[1em] w-[1em] opacity-60" />
          <span className="block leading-none">{formatSecond(lesson.seconds)}</span>
        </span>
      </span>
    </Link>
  )
}

export const ResultItemSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-neutral-200/30 p-3 dark:border-neutral-800 dark:bg-neutral-800/30">
      <div className="flex gap-3">
        <span className="skeleton h-5 w-14 rounded-lg" />
        <span className="skeleton h-5 w-14 rounded-lg" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="skeleton h-3 w-full rounded-lg" />
        <span className="skeleton h-3 w-1/2 rounded-lg" />
      </div>
      <div className="flex gap-6 text-xs">
        <span className="skeleton h-3 w-24 rounded-lg" />
        <span className="skeleton h-3 w-20 rounded-lg" />
      </div>
    </div>
  )
}

export default ResultItem
