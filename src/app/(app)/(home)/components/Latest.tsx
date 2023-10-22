'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@nextui-org/react'
import LessonList from '../../components/LessonList'

const Latest: React.FC<React.HTMLAttributes<HTMLDivElement> & { lessons: IALesson[] }> = ({ lessons, ...props }) => {
  return (
    <div {...props}>
      <h2 className="relative mb-12 text-4xl font-bold">
        <span className="relative before:absolute before:-bottom-4 before:block before:h-2 before:w-3/4 before:rounded-full before:bg-primary before:content-[''] after:absolute after:-bottom-7 after:block after:h-2 after:w-1/2 after:rounded-full after:bg-foreground/50 after:content-['']">
          The Latest
        </span>
      </h2>

      <ul className="my-8 grid grid-cols-1 gap-3">
        {lessons.map((lesson) => (
          <li key={lesson.slug}>
            <LessonList lesson={lesson} />
          </li>
        ))}
      </ul>

      <div className="text-center">
        <Button as={Link} href="/lessons" color="primary" size="lg" className="font-semibold">
          Browse all lessons
        </Button>
      </div>
    </div>
  )
}

export default Latest
