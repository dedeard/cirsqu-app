'use client'
import React from 'react'
import Link from 'next/link'
import { Button, Chip } from '@nextui-org/react'
import { Book } from 'react-feather'

const SubjectList: React.FC<{ subject: IASubject }> = ({ subject }) => {
  return (
    <Button
      as={Link}
      href={`/subjects/${subject.slug}`}
      className="group h-auto w-full flex-1 flex-col items-start justify-start bg-content2 p-3 hover:bg-content3 dark:bg-content1 dark:hover:bg-content2 md:p-6"
    >
      <span className="grid w-full grid-cols-1 gap-3 whitespace-normal text-left text-base">
        <span className="block">
          <Chip color="primary">
            <span className="font-semibold">{subject.lessonCount} lessons</span>
          </Chip>
        </span>
        <h3 className="text-2xl font-bold">{subject.name}</h3>
        <p className="text-sm">{subject.description}</p>
      </span>

      <div className="absolute right-0 top-1/2 z-0 -translate-y-1/2 text-[30vw] md:text-[23vw] lg:text-[15vw]">
        <div className="flex h-[1.2em] w-[1.2em] rotate-12 items-center justify-center leading-none transition-transform  group-hover:scale-110 ">
          <Book className="block h-3/4 w-3/4 opacity-10" />
        </div>
      </div>
    </Button>
  )
}

export default SubjectList
