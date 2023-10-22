'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@nextui-org/react'
import SubjectList from '../../components/SubjectList'

const Subjects: React.FC<React.HTMLAttributes<HTMLDivElement> & { subjects: IASubject[] }> = ({ subjects, ...props }) => {
  return (
    <div {...props}>
      <h2 className="relative mb-12 text-4xl font-bold">
        <span className="relative before:absolute before:-bottom-4 before:block before:h-2 before:w-3/4 before:rounded-full before:bg-primary before:content-[''] after:absolute after:-bottom-7 after:block after:h-2 after:w-1/2 after:rounded-full after:bg-foreground/50 after:content-['']">
          Pick a Subject
        </span>
      </h2>

      <ul className="my-8 grid grid-cols-1 gap-3 md:grid-cols-2">
        {subjects.map((subject) => (
          <li key={subject.subjectId} className="flex">
            <SubjectList subject={subject} />
          </li>
        ))}
      </ul>

      <div className="text-center">
        <Button as={Link} href="/subjects" color="primary" size="lg" className="font-semibold">
          Browse all subjects
        </Button>
      </div>
    </div>
  )
}

export default Subjects
