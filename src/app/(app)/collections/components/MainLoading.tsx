'use client'
import React from 'react'
import { LessonListSkeleton } from './LessonList'
import TitleBar from '../../components/TitleBar'

const MainLoading: React.FC = () => {
  return (
    <>
      <TitleBar isLoading className="mb-3" />

      <ul className="grid grid-cols-1 gap-3">
        {Array.from(Array(4).keys()).map((i) => (
          <li key={i} className="relative">
            <LessonListSkeleton key={i} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default MainLoading
