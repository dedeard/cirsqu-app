import SubjectCard from './components/SubjectCard'
import { lessonIndex, subjectIndex } from '@/utils/algolia'
import { notFound } from 'next/navigation'
import Pagination from '../../components/Pagination'
import LessonList from '../../components/LessonItem'
import parsePaginationPage from '@/utils/parse-pagination-page'

type PagePropTypes = {
  params: {
    slug: string
  }
  searchParams: {
    page?: string
  }
}

export default async function SubjectPage({ params, searchParams }: PagePropTypes) {
  const page = parsePaginationPage(searchParams.page)

  let subject: IASubject
  try {
    subject = await subjectIndex.getObject<IASubject>(params.slug)
  } catch (error: any) {
    return notFound()
  }

  const lessons = await lessonIndex.search<IALesson>('', {
    hitsPerPage: 10,
    page: page - 1,
    facetFilters: [['subjects.slug:' + params.slug]],
  })

  return (
    <>
      <SubjectCard subject={subject} />

      <ul className="mb-3 grid grid-cols-1 gap-3">
        {lessons.hits.map((lesson) => (
          <li key={lesson.objectID}>
            <LessonList lesson={lesson} />
          </li>
        ))}
      </ul>

      <Pagination totalPage={lessons.nbPages} page={page} />
    </>
  )
}
