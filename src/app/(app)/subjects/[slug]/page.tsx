import SubjectCard from './components/SubjectCard'
import Lessons from './components/Lessons'
import { lessonIndex } from '@/utils/algolia'
import { collection, getDocsFromServer, query, where } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { notFound } from 'next/navigation'

type PagePropTypes = {
  params: {
    slug: string
  }
  searchParams: {
    page?: string
  }
}

const parsePageFromSearchParams = (page: string = '') => {
  let parsedPage = parseInt(page)
  if (isNaN(parsedPage) || parsedPage < 1) {
    parsedPage = 1
  }
  return parsedPage
}

export default async function Page({ params, searchParams }: PagePropTypes) {
  const snapshot = await getDocsFromServer(query(collection(db, 'subjects'), where('slug', '==', params.slug)))
  if (snapshot.empty) return notFound()

  const page = parsePageFromSearchParams(searchParams.page)

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
      <Lessons lessons={hits} totalPage={nbPages} page={page} />
    </>
  )
}
