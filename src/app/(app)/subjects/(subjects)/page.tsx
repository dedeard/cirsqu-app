import { subjectIndex } from '@/utils/algolia'
import TitleBar from '../../../../components/elements/TitleBar'
import SubjectList from '../../components/SubjectItem'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const subjects = await subjectIndex.search<IASubject>('', { hitsPerPage: 1000 })
  return (
    <>
      <TitleBar title="List of Subjects" className="mb-3" />

      <ul className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        {subjects.hits.map((subject) => (
          <li key={subject.subjectId} className="flex">
            <SubjectList subject={subject} />
          </li>
        ))}
      </ul>
    </>
  )
}
