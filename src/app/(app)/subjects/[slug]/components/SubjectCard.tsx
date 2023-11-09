'use client'
import React from 'react'
import { BookOpen } from 'react-feather'

const SubjectCard: React.FC<{ subject: IASubject }> = ({ subject }) => {
  return (
    <div className="background-animate via-primary/50 to-primary relative mb-3 overflow-hidden rounded-lg bg-gradient-to-br from-white/70 p-3 text-neutral-800 dark:from-black/70 dark:via-blue-600/50 dark:to-black/70 dark:text-neutral-200 md:p-6">
      <div className="relative z-10 flex flex-col py-3">
        <span className="flex">
          <span className="block rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">{subject.lessonCount} lessons</span>
        </span>
        <h2 className="my-3 text-2xl font-semibold lg:text-3xl">{subject.name}</h2>
        <p className="max-w-lg text-sm md:text-base">{subject.description}</p>
      </div>
      <div className="absolute right-0 top-1/2  -translate-y-1/2 text-[50vw] opacity-50 md:text-[30vw]">
        <div className="flex h-[1.2em] w-[1.2em] rotate-12 items-center justify-center  rounded-full bg-neutral-900/50 leading-none text-white">
          <BookOpen className="block h-3/4 w-3/4 opacity-50" />
        </div>
      </div>
    </div>
  )
}

export default SubjectCard
