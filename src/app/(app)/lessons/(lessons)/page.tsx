import type { Metadata } from 'next'
import search from '@/utils/algolia/search'
import parsePaginationPage from '@/utils/parse-pagination-page'
import LessonList from '../../components/LessonItem'
import Pagination from '../../components/Pagination'
import TitleBar from '../../components/TitleBar'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Lessons - CIRSQU',
  description:
    'Embark on a transformative coding journey with CIRSQU’s comprehensive lessons. Explore a wide array of screencasts, designed to enhance your programming skills, regardless of your experience level.',
}

export default async function LessonsPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = parsePaginationPage(searchParams.page)

  const { hits, nbPages } = await search<IALesson>({
    index: 'lessons',
    hitsPerPage: 10,
    page: page - 1,
  })

  return (
    <>
      <TitleBar title="List of Lessons" className="mb-3" />

      <ul className="mb-3 grid grid-cols-1 gap-3">
        {hits.map((lesson) => (
          <li key={lesson.objectID}>
            <LessonList lesson={lesson} />
          </li>
        ))}
      </ul>

      <Pagination totalPage={nbPages} page={page} />
    </>
  )
}
