import { subjectIndex } from '@/utils/algolia'
import Subjects from './components/Subjects'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const subjects = await subjectIndex.search<IASubject>('', { hitsPerPage: 1000 })
  return <Subjects subjects={subjects.hits} />
}
