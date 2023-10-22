'use client'
import React from 'react'
import { Card, CardBody } from '@nextui-org/react'
import SubjectList from '../../../components/SubjectList'

const Subjects: React.FC<{ subjects: ISubject[] }> = ({ subjects }) => {
  return (
    <>
      <Card className="mb-3">
        <CardBody className="background-animate relative z-10 bg-gradient-to-br from-white/70 via-primary/50 to-primary dark:from-black/70 dark:via-primary/50 dark:to-black/70">
          <div className="flex flex-col items-center justify-center py-5 text-center md:py-10">
            <h1 className="mb-3 text-2xl font-bold lg:text-3xl">Explore Our Subjects</h1>
            <p className="max-w-lg text-sm md:text-base">
              Dive into our diverse subject offerings. Each subject is meticulously curated to provide you with comprehensive knowledge and
              insights.
            </p>
          </div>
        </CardBody>
      </Card>

      <ul className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        {subjects.map((subject) => (
          <li key={subject.id} className="flex">
            <SubjectList subject={subject} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default Subjects
