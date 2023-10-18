'use client'
import React from 'react'
import Link from 'next/link'
import { Button, Chip } from '@nextui-org/react'
import { Clock, Film } from 'react-feather'

const LessonList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-medium bg-content2 p-3 dark:bg-content1 md:p-6">
      <div className="flex gap-3">
        <Chip as={Link} href="/subjects/slug">
          <span className="font-semibold">LARAVEL</span>
        </Chip>
        <Chip as={Link} href="/subjects/slug">
          <span className="font-semibold">LIVEWIRE</span>
        </Chip>
      </div>

      <h3 className="text-xl font-semibold">Build a URL Shortener with Volt and Folio</h3>

      <div className="flex gap-6">
        <span className="flex items-center justify-center gap-2 text-sm">
          <Film className="block h-[1em] w-[1em] opacity-60" />
          <span className="block leading-none">10 Episodes</span>
        </span>
        <span className="flex items-center justify-center gap-2 text-sm">
          <Clock className="block h-[1em] w-[1em] opacity-60" />
          <span className="block leading-none">2 Hours 54 Minutes</span>
        </span>
      </div>

      <div className="pt-2">
        <Button as={Link} href="/lessons/slug" color="primary" className="w-28 font-semibold uppercase">
          Watch
        </Button>
      </div>
    </div>
  )
}

export default LessonList
