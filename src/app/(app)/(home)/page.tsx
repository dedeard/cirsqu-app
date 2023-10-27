import { lessonIndex, subjectIndex } from '@/utils/algolia'
import MainBanner from './components/MainBanner'
import Latest from './components/Latest'
import PremiumBanner from './components/PremiumBanner'
import Subjects from './components/Subjects'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const lessons = await lessonIndex.search<IALesson>('', { hitsPerPage: 5 })
  const subjects = await subjectIndex.search<IASubject>('', { hitsPerPage: 6 })

  return (
    <>
      <MainBanner className="mb-20" />
      <Latest className="my-20" lessons={lessons.hits} />
      <Subjects className="my-20" subjects={subjects.hits} />
      <PremiumBanner className="mt-20" />
    </>
  )
}
