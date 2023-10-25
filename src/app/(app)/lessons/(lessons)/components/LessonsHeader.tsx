'use client'
import React from 'react'
import { Card, CardBody } from '@nextui-org/react'

const LessonsHeader = () => {
  return (
    <Card className="mb-3">
      <CardBody className="background-animate relative z-10 bg-gradient-to-br from-white/70 via-primary/50 to-primary dark:from-black/70 dark:via-primary/50 dark:to-black/70">
        <div className="flex flex-col items-center justify-center py-5 text-center md:py-10">
          <h1 className="mb-3 text-2xl font-bold lg:text-3xl">Explore Our Lessons</h1>
          <p className="max-w-lg text-sm md:text-base">
            Immerse yourself in our wide range of subjects. Each one has been meticulously curated to provide comprehensive knowledge and
            insights.
          </p>
        </div>
      </CardBody>
    </Card>
  )
}

export default LessonsHeader
