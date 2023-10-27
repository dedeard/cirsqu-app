'use client'
import React from 'react'
import { LessonListSkeleton } from './LessonList'
import TitleBar from '@/components/elements/TitleBar'

const MainLoading: React.FC = () => {
  return (
    <>
      <TitleBar isLoading className="mb-3" />

      <ul className="grid grid-cols-1 gap-3" role="list">
        {Array.from(Array(4).keys()).map((i) => (
          <LessonListSkeleton key={i} />
        ))}
      </ul>
    </>
  )
}

export default MainLoading
