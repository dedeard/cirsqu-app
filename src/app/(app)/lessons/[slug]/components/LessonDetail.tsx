'use client'
import React from 'react'

const LessonDetail: React.FC<React.HTMLAttributes<HTMLDivElement> & { description: string }> = ({ description, ...props }) => {
  return (
    <div {...props}>
      <h2 className="relative mb-8 text-2xl font-bold">
        <span className="relative before:absolute before:-bottom-2 before:block before:h-1 before:w-3/4 before:rounded-full before:bg-primary before:content-[''] after:absolute after:-bottom-4 after:block after:h-1 after:w-1/2 after:rounded-full after:bg-foreground/50 after:content-['']">
          About this lesson
        </span>
      </h2>
      <div className="prose w-full max-w-full dark:prose-invert" dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  )
}

export default LessonDetail
