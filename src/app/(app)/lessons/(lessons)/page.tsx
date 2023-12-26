import type { Metadata } from 'next'
import search from '@/utils/algolia/search'
import LessonList from '../../components/LessonItem'
import Pagination from '../../components/Pagination'
import TitleBar from '../../components/TitleBar'

export const runtime = 'edge'

export function generateMetadata({ searchParams }: { searchParams: { page?: string } }): Metadata {
  let page = parseInt(String(searchParams.page))
  if (isNaN(page) || page < 1) {
    page = 1
  }
  return {
    title: 'Lessons - CIRSQU',
    description:
      'Embark on a transformative coding journey with CIRSQU’s comprehensive lessons. Explore a wide array of screencasts, designed to enhance your programming skills, regardless of your experience level.',
    alternates: {
      canonical: '/lessons?page=' + page,
    },
    openGraph: {
      url: '/lessons?page=' + page,
    },
  }
}

export default async function LessonsPage({ searchParams }: { searchParams: { page?: string } }) {
  let page = parseInt(String(searchParams.page))
  if (isNaN(page) || page < 1) {
    page = 1
  }

  const { hits, nbPages } = await search<IALesson>({
    index: 'lessons',
    hitsPerPage: 10,
    page: page - 1,
    next: { revalidate: 3600, tags: [`lessons-page-${page}`] },
  })

  return (
    <div className="py-3">
      <TitleBar title="List of Lessons" className="mb-3" />

      <ul className="mb-3 grid grid-cols-1 gap-3">
        {hits.map((lesson) => (
          <li key={lesson.objectID}>
            <LessonList lesson={lesson} />
          </li>
        ))}
      </ul>

      <Pagination totalPage={nbPages} page={page} />
    </div>
  )
}
