import React from 'react'
import Link from 'next/link'
import SectionHeading from './SectionHeading'
import SubjectList from '../../components/SubjectItem'

const Subjects: React.FC<React.HTMLAttributes<HTMLDivElement> & { subjects: IASubject[] }> = ({ subjects, ...props }) => {
  return (
    <section {...props}>
      <SectionHeading text="Pick a Subject" />

      <ul className="my-8 grid grid-cols-1 gap-3 md:grid-cols-2">
        {subjects.map((subject) => (
          <li key={subject.subjectId} className="flex">
            <SubjectList subject={subject} />
          </li>
        ))}
      </ul>

      <div className="text-center">
        <Link href="/subjects" className="hoverable-blue inline-flex h-12 items-center rounded-lg px-8">
          Browse all subjects
        </Link>
      </div>
    </section>
  )
}

export default Subjects
