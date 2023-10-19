'use client'
import React from 'react'
import Link from 'next/link'
import { Button, Chip } from '@nextui-org/react'
import { Clock, Code, Film } from 'react-feather'

const LessonList: React.FC = () => {
  return (
    <div className="group relative grid grid-cols-1 gap-3 overflow-hidden rounded-medium bg-content2 p-3 dark:bg-content1 md:p-6">
      <div className="flex gap-3">
        <Chip as={Link} href="/subjects/slug">
          <span className="font-semibold">LARAVEL</span>
        </Chip>
        <Chip as={Link} href="/subjects/slug">
          <span className="font-semibold">LIVEWIRE</span>
        </Chip>
      </div>

      <h3 className="text-xl font-semibold">Build a URL Shortener with Volt and Folio</h3>

      <div className="flex gap-6 pb-2">
        <span className="flex items-center justify-center gap-2 text-sm">
          <Film className="block h-[1em] w-[1em] opacity-60" />
          <span className="block leading-none">10 Episodes</span>
        </span>
        <span className="flex items-center justify-center gap-2 text-sm">
          <Clock className="block h-[1em] w-[1em] opacity-60" />
          <span className="block leading-none">2 Hours 54 Minutes</span>
        </span>
      </div>

      <Button as={Link} href="/lessons/slug" color="primary" className="peer w-28 font-semibold uppercase">
        Watch
      </Button>

      <div className="absolute right-0 top-1/2 z-0 -translate-y-1/2 text-[40vw] transition-transform peer-hover:scale-110 md:text-[30vw] lg:text-[20vw]">
        <div className="flex h-[1.5em] w-[1.5em] rotate-12 items-center justify-center leading-none">
          <Code className="block h-3/4 w-3/4 opacity-10" />
        </div>
      </div>
    </div>
  )
}

export default LessonList
