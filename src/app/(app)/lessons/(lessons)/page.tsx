import { lessonIndex } from '@/utils/algolia'
import LessonList from '../../components/LessonList'
import parsePaginationPage from '@/utils/parse-pagination-page'
import Pagination from '../../components/Pagination'
import LessonsHeader from './components/LessonsHeader'

export default async function Page({ searchParams }: { searchParams: { page?: string } }) {
  const page = parsePaginationPage(searchParams.page)

  const { hits, nbPages } = await lessonIndex.search<IALesson>('', {
    hitsPerPage: 10,
    page: page - 1,
  })

  return (
    <>
      <LessonsHeader />

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
