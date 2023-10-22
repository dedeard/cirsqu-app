import { lessonIndex } from '@/utils/algolia'
import Jumbotron from './components/Jumbotron'
import Latest from './components/Latest'
import PremiumBanner from './components/PremiumBanner'
import Subjects from './components/Subjects'
import { getSubjects } from '@/utils/firestore'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const { hits, facets } = await lessonIndex.search<IALesson>('', { hitsPerPage: 5, facets: ['subjects.slug'] })
  const subjects = await getSubjects(facets?.['subjects.slug'])

  return (
    <>
      <Jumbotron className="mb-20" />
      <Latest className="my-20" lessons={hits} />
      <Subjects className="my-20" subjects={subjects.slice(0, 6)} />
      <PremiumBanner className="mt-20" />
    </>
  )
}
