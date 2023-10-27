'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@nextui-org/react'
import SubjectList from '../../components/SubjectItem'
import SectionHeading from './SectionHeading'

const Subjects: React.FC<React.HTMLAttributes<HTMLDivElement> & { subjects: IASubject[] }> = ({ subjects, ...props }) => {
  return (
    <div {...props}>
      <SectionHeading text="Pick a Subject" />

      <ul className="my-8 grid grid-cols-1 gap-3 md:grid-cols-2">
        {subjects.map((subject) => (
          <li key={subject.subjectId} className="flex">
            <SubjectList subject={subject} />
          </li>
        ))}
      </ul>

      <div className="text-center">
        <Button as={Link} href="/subjects" color="primary" size="lg">
          Browse all subjects
        </Button>
      </div>
    </div>
  )
}

export default Subjects
