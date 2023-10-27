'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@nextui-org/react'
import LessonItem from '../../components/LessonItem'
import SectionHeading from './SectionHeading'

const Latest: React.FC<React.HTMLAttributes<HTMLDivElement> & { lessons: IALesson[] }> = ({ lessons, ...props }) => {
  return (
    <div {...props}>
      <SectionHeading text="The Latest" />

      <ul className="my-8 grid grid-cols-1 gap-3">
        {lessons.map((lesson) => (
          <li key={lesson.slug}>
            <LessonItem lesson={lesson} />
          </li>
        ))}
      </ul>

      <div className="text-center">
        <Button as={Link} href="/lessons" color="primary" size="lg">
          Browse all lessons
        </Button>
      </div>
    </div>
  )
}

export default Latest
