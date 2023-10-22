import { collection, getDocsFromServer } from 'firebase/firestore'
import Subjects from './components/Subjects'
import { db } from '@/utils/firebase'
import { lessonIndex } from '@/utils/server-algolia'

export const dynamic = 'force-dynamic'

const getSubjects = async () => {
  const { facets } = await lessonIndex.search('', { hitsPerPage: 1, facets: ['subjects.slug'] })
  const facet = facets?.['subjects.slug']

  const resp = await getDocsFromServer(collection(db, 'subjects'))

  const subjects: ISubject[] = resp.docs
    .map((snap) => {
      return {
        id: snap.id,
        name: snap.data().name,
        slug: snap.data().slug,
        lessonCount: facet?.[snap.data().slug] || 0,
        description: snap.data().description,
      }
    })
    .sort((a, b) => b.lessonCount - a.lessonCount)

  return subjects
}

export default async function Home() {
  const subjects = await getSubjects()

  return <Subjects subjects={subjects} />
}
