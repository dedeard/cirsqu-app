'use client'
import React from 'react'
import Link from 'next/link'
import { Button, Chip } from '@nextui-org/react'
import { Book } from 'react-feather'

const SubjectList: React.FC = () => {
  return (
    <Button
      as={Link}
      href="/subjects/plan"
      className="group h-auto w-full flex-col bg-content2 p-3 hover:bg-content3 dark:bg-content1 dark:hover:bg-content2 md:p-6"
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

      <div className="absolute right-0 top-1/2 z-0 -translate-y-1/2 text-[20vw] md:text-[15vw] lg:text-[10vw]">
        <div className="flex h-[1.2em] w-[1.2em] rotate-12 items-center justify-center leading-none transition-transform  group-hover:scale-110 ">
          <Book className="block h-3/4 w-3/4 opacity-10" />
        </div>
      </div>
    </Button>
  )
}

export default SubjectList
