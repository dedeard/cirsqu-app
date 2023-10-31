import type { Metadata } from 'next'
import SubjectCard from './components/SubjectCard'
import { lessonIndex, subjectIndex } from '@/utils/algolia'
import { notFound } from 'next/navigation'
import Pagination from '../../components/Pagination'
import LessonList from '../../components/LessonItem'
import parsePaginationPage from '@/utils/parse-pagination-page'
import markdownToDescription from '@/utils/markdown-to-description'

type PropTypes = {
  params: {
    slug: string
  }
  searchParams: {
    page?: string
  }
}

async function getSubject(props: PropTypes) {
  let subject: IASubject
  try {
    subject = await subjectIndex.getObject<IASubject>(props.params.slug)
  } catch (error: any) {
    return notFound()
  }

  return subject
}

export async function generateMetadata(pageProps: PropTypes): Promise<Metadata> {
  const { name, description } = await getSubject(pageProps)
  return {
    title: name,
    description: markdownToDescription(description),
  }
}

export default async function SubjectPage(props: PropTypes) {
  const page = parsePaginationPage(props.searchParams.page)
  const subject = await getSubject(props)

  const lessons = await lessonIndex.search<IALesson>('', {
    hitsPerPage: 10,
    page: page - 1,
    facetFilters: [['subjects.slug:' + props.params.slug]],
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
