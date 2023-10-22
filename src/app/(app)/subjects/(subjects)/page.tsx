import Subjects from './components/Subjects'
import { getSubjects } from '@/utils/firestore'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const subjects = await getSubjects()

  return <Subjects subjects={subjects} />
}
