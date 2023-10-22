import { lessonIndex } from '@/utils/server-algolia'
import Jumbotron from './components/Jumbotron'
import Latest from './components/Latest'
import PremiumBanner from './components/PremiumBanner'
import Subjects from './components/Subjects'
import { collection, getDocsFromServer } from 'firebase/firestore'
import { db } from '@/utils/firebase'

export const dynamic = 'force-dynamic'

lessonIndex.setSettings({ ranking: ['asc(createdAt)'] })

const getSubjects = async (facet?: Record<string, number>) => {
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
    .slice(0, 6)

  return subjects
}

export default async function Home() {
  const lessons = await lessonIndex.search<IALesson>('', { hitsPerPage: 5, facets: ['subjects.slug'] })
  const subjects = await getSubjects(lessons.facets?.['subjects.slug'])

  return (
    <>
      <Jumbotron className="mb-20" />
      <Latest className="my-20" lessons={lessons.hits} />
      <Subjects className="my-20" subjects={subjects} />
      <PremiumBanner className="mt-20" />
    </>
  )
}
