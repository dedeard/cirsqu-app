import SubjectCard from './components/SubjectCard'
import { lessonIndex } from '@/utils/algolia'
import { collection, getDocsFromServer, query, where } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { notFound } from 'next/navigation'
import Pagination from '../../components/Pagination'
import LessonList from '../../components/LessonList'
import parsePaginationPage from '@/utils/parse-pagination-page'

type PagePropTypes = {
  params: {
    slug: string
  }
  searchParams: {
    page?: string
  }
}

export default async function Page({ params, searchParams }: PagePropTypes) {
  const snapshot = await getDocsFromServer(query(collection(db, 'subjects'), where('slug', '==', params.slug)))
  if (snapshot.empty) return notFound()

  const page = parsePaginationPage(searchParams.page)

  const { hits, nbPages, facets } = await lessonIndex.search<IALesson>('', {
    facets: ['subjects.slug'],
    hitsPerPage: 10,
    page: page - 1,
    facetFilters: [['subjects.slug:' + params.slug]],
  })

  const subject: ISubject = snapshot.docs.map((snap) => {
    return {
      id: snap.id,
      name: snap.data().name,
      slug: snap.data().slug,
      description: snap.data().description,
      lessonCount: facets?.['subjects.slug'][snap.data().slug] || 0,
    }
  })[0]

  return (
    <>
      <SubjectCard subject={subject} />

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
