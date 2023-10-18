'use client'
import React from 'react'
import { Card, CardBody, CardProps, Chip } from '@nextui-org/react'

const SubjectCard: React.FC<CardProps> = ({ className, ...props }) => {
  return (
    <Card className={className + ' mb-3'} {...props}>
      <CardBody className="background-animate relative z-10 bg-gradient-to-br from-white/70 via-slate-600/50 to-content2 px-3 dark:from-black/70 dark:via-slate-600/50 dark:to-black/70 md:px-6">
        <div className="flex flex-col py-6 md:py-12">
          <Chip>
            <span className="font-semibold">19 lessons</span>
          </Chip>
          <h1 className="my-3 text-2xl font-bold lg:text-3xl">Livewire</h1>
          <p className="max-w-lg text-sm md:text-base">A full-stack framework for Laravel that makes building dynamic interfaces simple.</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default SubjectCard
