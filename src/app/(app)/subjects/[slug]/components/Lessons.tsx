'use client'
import React from 'react'
import { Button } from '@nextui-org/react'
import LessonList from '../../../components/LessonList'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'react-feather'

const Lessons: React.FC<{ totalPage: number; page: number; lessons: IALesson[] }> = ({ lessons, totalPage, page }) => {
  const pathname = usePathname()

  return (
    <>
      <ul className="mb-3 grid grid-cols-1 gap-3">
        {lessons.map((lesson) => (
          <li key={lesson.objectID}>
            <LessonList lesson={lesson} />
          </li>
        ))}
      </ul>

      {totalPage > 1 && (
        <div className="flex justify-between">
          <Button
            size="lg"
            variant="flat"
            className="uppercase"
            as={page <= 1 ? 'span' : Link}
            href={`${pathname}${page > 2 ? '?page=' + (page - 1) : ''}`}
            isDisabled={page <= 1}
            startContent={<ArrowLeft />}
          >
            Prev <span className="hidden md:inline">Page</span>
          </Button>
          <Button
            size="lg"
            variant="flat"
            className="uppercase"
            as={page >= totalPage ? 'span' : Link}
            href={`${pathname}?page=${page + 1}`}
            isDisabled={page >= totalPage}
            endContent={<ArrowRight />}
          >
            Next <span className="hidden md:inline">Page</span>
          </Button>
        </div>
      )}
    </>
  )
}

export default Lessons
