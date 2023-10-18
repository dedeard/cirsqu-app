'use client'
import React from 'react'
import Link from 'next/link'
import { Button, Chip } from '@nextui-org/react'

const SubjectList: React.FC = () => {
  return (
    <Button
      as={Link}
      href="/subjects/plan"
      className="h-auto w-full flex-col bg-content2 p-3 hover:bg-content3 dark:bg-content1 dark:hover:bg-content2 md:p-6"
    >
      <span className="grid w-full grid-cols-1 gap-3 whitespace-normal text-left text-base">
        <span className="block">
          <Chip color="primary">
            <span className="font-semibold">19 lessons</span>
          </Chip>
        </span>
        <h3 className="text-2xl font-bold">Livewire</h3>
        <p className="text-sm">A full-stack framework for Laravel that makes building dynamic interfaces simple.</p>
      </span>
    </Button>
  )
}

export default SubjectList
