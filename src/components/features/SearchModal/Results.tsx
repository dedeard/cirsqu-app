import React, { useMemo } from 'react'
import { Chip, Skeleton } from '@nextui-org/react'
import ResultItem, { ResultItemSkeleton } from './ResultItem'
import { useSearch } from '@/components/contexts/SearchContext'
import NoResults from './NoResults'

const Results: React.FC = () => {
  let { loading, initLoading, subjects, results, filters, setFilters } = useSearch()
  loading = loading || initLoading

  const addFilter = (subject: string) => {
    setFilters([...filters, subject])
  }

  const removeFilter = (subject: string) => {
    setFilters([...filters.filter((el) => el !== subject)])
  }

  const formatedSubjects = useMemo(
    () =>
      subjects
        .map((el) => {
          const active = filters.find((slug) => slug === el.slug)
          return {
            ...el,
            count: results.facets[el.slug],
            active: !!active,
          }
        })
        .filter((el) => {
          if (filters.includes(el.slug)) return true
          return el.count
        })
        .sort((a, b) => b.count - a.count),
    [subjects, results.facets, filters],
  )

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto py-3">
      <div className="flex flex-wrap gap-2 px-3">
        {!initLoading &&
          formatedSubjects.map((el) => (
            <Chip
              key={el.slug}
              variant={el.active ? 'solid' : 'bordered'}
              color={el.active ? 'primary' : 'default'}
              size="sm"
              className="cursor-pointer"
              classNames={{ content: 'text-xs' }}
              onClick={() => (el.active ? removeFilter(el.slug) : addFilter(el.slug))}
            >
              {el.name} {el.count}
            </Chip>
          ))}
        {initLoading && Array.from(Array(3).keys()).map((i) => <Skeleton key={i} className="rounded-medium h-6 w-20" />)}
      </div>
      <ul className="flex flex-col gap-3 px-3">
        {!loading &&
          results.hits.map((lesson) => (
            <li key={lesson.lessonId}>
              <ResultItem lesson={lesson} />
            </li>
          ))}
        {loading &&
          Array.from(Array(3).keys()).map((i) => (
            <li key={i}>
              <ResultItemSkeleton />
            </li>
          ))}
      </ul>
      {!loading && results.hits.length === 0 && <NoResults query={results.query} />}
    </div>
  )
}

export default Results
