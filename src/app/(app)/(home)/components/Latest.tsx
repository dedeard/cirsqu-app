import React from 'react'
import Link from 'next/link'
import LessonItem from '../../components/LessonItem'
import SectionHeading from './SectionHeading'

const Latest: React.FC<React.HTMLAttributes<HTMLDivElement> & { lessons: IALesson[] }> = ({ lessons, ...props }) => {
  return (
    <section {...props}>
      <SectionHeading text="The Latest" />

      <ul className="my-8 grid grid-cols-1 gap-3">
        {lessons.map((lesson) => (
          <li key={lesson.slug}>
            <LessonItem lesson={lesson} />
          </li>
        ))}
      </ul>

      <div className="text-center">
        <Link href="/lessons" className="hoverable-blue inline-flex h-12 items-center rounded-lg px-8">
          Browse all lessons
        </Link>
      </div>
    </section>
  )
}

export default Latest
