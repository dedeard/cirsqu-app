import type { Metadata } from 'next'
import SubjectCard from './components/SubjectCard'
import { notFound } from 'next/navigation'
import Pagination from '../../components/Pagination'
import LessonList from '../../components/LessonItem'
import parsePaginationPage from '@/utils/parse-pagination-page'
import markdownToDescription from '@/utils/markdown-to-description'
import getObject from '@/utils/algolia/getObject'
import search from '@/utils/algolia/search'

type PropTypes = {
  params: {
    slug: string
  }
  searchParams: {
    page?: string
  }
}

export const revalidate = 3600

async function getSubject(props: PropTypes) {
  let subject: IASubject
  try {
    subject = await getObject<IASubject>({ index: 'subjects', objectID: props.params.slug })
  } catch (error: any) {
    return notFound()
  }

  return subject
}

export async function generateMetadata(pageProps: PropTypes): Promise<Metadata> {
  const { name, description, slug } = await getSubject(pageProps)
  return {
    title: name,
    description: markdownToDescription(description),
    openGraph: {
      images: `/images/dynamic-og?title=${name}`,
      title: name,
      description: markdownToDescription(description),
    },
    alternates: {
      canonical: `/subjects/${slug}`,
    },
  }
}

export default async function SubjectPage(props: PropTypes) {
  const page = parsePaginationPage(props.searchParams.page)
  const subject = await getSubject(props)

  const lessons = await search<IALesson>({
    index: 'lessons',
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
