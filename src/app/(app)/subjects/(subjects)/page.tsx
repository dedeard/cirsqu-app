import type { Metadata } from 'next'
import search from '@/utils/algolia/search'
import TitleBar from '../../components/TitleBar'
import SubjectList from '../../components/SubjectItem'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Subjects - CIRSQU',
  description:
    'Discover a world of coding subjects with CIRSQU! Our diverse and comprehensive subject list is designed to help you master every aspect of coding. Start exploring and expand your coding repertoire today!',
}

export default async function SubjectsPage() {
  const subjects = await search<IASubject>({ index: 'subjects', hitsPerPage: 1000 })
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
