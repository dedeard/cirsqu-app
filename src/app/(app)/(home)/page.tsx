import type { Metadata } from 'next'
import MainBanner from './components/MainBanner'
import Latest from './components/Latest'
import PremiumBanner from './components/PremiumBanner'
import Subjects from './components/Subjects'
import search from '@/utils/algolia/search'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Home - CIRSQU',
  description:
    'Immerse yourself in CIRSQU’s comprehensive screencasts, tailored for developers at all stages. Delve into our diverse coding tutorials and take your programming prowess to new heights!',
}

export default async function HomePage() {
  const lessons = await search<IALesson>({ index: 'lessons', hitsPerPage: 5 })
  const subjects = await search<IASubject>({ index: 'subjects', hitsPerPage: 6 })

  return (
    <>
      <MainBanner className="mb-20" />
      <Latest className="my-20" lessons={lessons.hits} />
      <Subjects className="my-20" subjects={subjects.hits} />
      <PremiumBanner className="mt-20" />
    </>
  )
}
