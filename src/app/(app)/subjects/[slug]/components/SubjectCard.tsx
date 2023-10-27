'use client'
import React from 'react'
import { Card, CardBody, CardProps, Chip } from '@nextui-org/react'
import { BookOpen } from 'react-feather'

const SubjectCard: React.FC<CardProps & { subject: IASubject }> = ({ subject, className, ...props }) => {
  return (
    <Card className={className + ' mb-3'} shadow="none" {...props}>
      <CardBody className="background-animate relative z-10 bg-gradient-to-br from-white/70 via-primary/50 to-primary dark:from-black/70 dark:via-primary/50 dark:to-black/70">
        <div className="flex flex-col py-6 md:py-12">
          <Chip color="primary">{subject.lessonCount} lessons</Chip>
          <h1 className="my-3 text-2xl font-semibold lg:text-3xl">{subject.name}</h1>
          <p className="max-w-lg text-sm md:text-base">{subject.description}</p>
        </div>
      </CardBody>
      <div className="absolute right-0 top-1/2 z-0 -translate-y-1/2 text-[50vw] opacity-50 md:text-[30vw]">
        <div className="flex h-[1.2em] w-[1.2em] rotate-12 items-center justify-center  rounded-full bg-slate-950 leading-none text-white">
          <BookOpen className="block h-3/4 w-3/4 opacity-50" />
        </div>
      </div>
    </Card>
  )
}

export default SubjectCard
