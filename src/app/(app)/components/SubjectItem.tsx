'use client'
import React from 'react'
import Link from 'next/link'
import { CardProps, Chip } from '@nextui-org/react'
import { Book } from 'react-feather'
import trimTextWithEllipsis from '@/utils/trim-text-with-ellipsis'
import Card from './Card'

const SubjectItem: React.FC<{ subject: IASubject } & CardProps> = ({ subject, classNames, ...props }) => {
  return (
    <Card as={Link} href={`/subjects/${subject.slug}`} classNames={{ ...classNames, body: 'flex flex-col gap-3' }} {...props}>
      <span className="grid w-full grid-cols-1 gap-3 whitespace-normal text-left text-base">
        <span className="block">
          <Chip color="primary">{subject.lessonCount} lessons</Chip>
        </span>
        <h3 className="text-2xl font-semibold">{subject.name}</h3>
        <p className="text-sm">{trimTextWithEllipsis(subject.description, 200)}</p>
      </span>

      <div className="absolute right-0 top-1/2 z-0 -translate-y-1/2 text-[30vw] md:text-[23vw] lg:text-[15vw]">
        <div className="flex h-[1.2em] w-[1.2em] rotate-12 items-center justify-center leading-none transition-transform  group-hover:scale-110 ">
          <Book className="block h-3/4 w-3/4 opacity-10" />
        </div>
      </div>
    </Card>
  )
}

export default SubjectItem
