import type { Metadata } from 'next'
import SubjectCard from './components/SubjectCard'
import { notFound } from 'next/navigation'
import Pagination from '../../components/Pagination'
import LessonList from '../../components/LessonItem'
import mdToDescription from '@/utils/transforms/md-to-description'
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

export const runtime = 'edge'

async function getSubject(props: PropTypes) {
  let subject: IASubject
  try {
    subject = await getObject<IASubject>({
      index: 'subjects',
      objectID: props.params.slug,
      next: {
        revalidate: 3600,
        tags: [`subject-${props.params.slug}`],
      },
    })
  } catch (error: any) {
    return notFound()
  }

  return subject
}

export async function generateMetadata(pageProps: PropTypes): Promise<Metadata> {
  const { name, description, slug } = await getSubject(pageProps)
  let page = parseInt(String(pageProps.searchParams.page))
  if (isNaN(page) || page < 1) {
    page = 1
  }
  return {
    title: name,
    description: mdToDescription(description),
    openGraph: {
      images: `/images/dynamic-og?title=${name}`,
      title: name,
      description: mdToDescription(description),
      url: `/subjects/${slug}?page=${page}`,
    },
    alternates: {
      canonical: `/subjects/${slug}?page=${page}`,
    },
  }
}

export default async function SubjectPage(props: PropTypes) {
  let page = parseInt(String(props.searchParams.page))
  if (isNaN(page) || page < 1) {
    page = 1
  }

  const subject = await getSubject(props)

  const lessons = await search<IALesson>({
    index: 'lessons',
    hitsPerPage: 10,
    page: page - 1,
    facetFilters: [['subjects.slug:' + props.params.slug]],
    next: {
      revalidate: 3600,
      tags: [`subject-lessons-${props.params.slug}-${page}`],
    },
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
