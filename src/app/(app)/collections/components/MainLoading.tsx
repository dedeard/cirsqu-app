'use client'
import React from 'react'
import TitleBar from '../../components/TitleBar'
import { LessonListSkeleton } from './LessonList'

const MainLoading: React.FC = () => {
  return (
    <>
      <TitleBar title="" isLoading className="mb-3" />

      <ul className="grid grid-cols-1 gap-3" role="list">
        {Array.from(Array(4).keys()).map((i) => (
          <LessonListSkeleton key={i} />
        ))}
      </ul>
    </>
  )
}

export default MainLoading
