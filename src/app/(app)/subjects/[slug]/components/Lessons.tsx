'use client'
import React from 'react'
import { Pagination } from '@nextui-org/react'
import LessonList from '../../../components/LessonList'

const Lessons = () => {
  return (
    <>
      <ul className="mb-3 grid grid-cols-1 gap-3">
        {Array.from(Array(10).keys()).map((i) => (
          <li key={i}>
            <LessonList />
          </li>
        ))}
      </ul>

      <Pagination total={10} initialPage={1} />
    </>
  )
}

export default Lessons
