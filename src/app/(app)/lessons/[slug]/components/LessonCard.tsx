'use client'
import React from 'react'
import Link from 'next/link'
import { Button, Card, CardBody, CardProps, Chip } from '@nextui-org/react'
import { Clock, Film, Calendar, Code, PlusCircle } from 'react-feather'

const LessonCard: React.FC<CardProps> = ({ className, ...props }) => {
  return (
    <Card className={className + ' mb-3'} {...props}>
      <CardBody className="background-animate relative z-10 bg-gradient-to-br from-white/70 via-primary/50 to-primary dark:from-black/70 dark:via-primary/50 dark:to-black/70">
        <div className="flex flex-col py-6 md:py-12">
          <div className="flex gap-3">
            <Chip as={Link} variant="flat" href="/subjects/slug">
              <span className="font-semibold">LARAVEL</span>
            </Chip>
            <Chip as={Link} variant="flat" href="/subjects/slug">
              <span className="font-semibold">LIVEWIRE</span>
            </Chip>
          </div>

          <h1 className="my-3 text-2xl font-bold lg:text-3xl">Build a URL Shortener with Volt and Folio</h1>

          <div className="mb-6">
            <span className="mr-6 inline-flex  items-center justify-center gap-2 text-sm">
              <Film className="block h-[1em] w-[1em] opacity-60" />
              <span className="block leading-none">10 Episodes</span>
            </span>
            <span className="mr-6 inline-flex  items-center justify-center gap-2 text-sm">
              <Clock className="block h-[1em] w-[1em] opacity-60" />
              <span className="block leading-none">2 Hours 54 Minutes</span>
            </span>
            <span className="mr-6 inline-flex items-center justify-center gap-2 text-sm">
              <Calendar className="block h-[1em] w-[1em] opacity-60" />
              <span className="block leading-none">2 Days ago</span>
            </span>
          </div>

          <div className="flex gap-3">
            <Button color="primary" className="font-bold">
              Start watching
            </Button>
            <Button variant="light" startContent={<PlusCircle size={18} />} className="font-bold">
              Add to watch list
            </Button>
          </div>
        </div>
      </CardBody>
      <div className="absolute right-0 top-1/2 z-0 -translate-y-1/2 text-[50vw] opacity-50 md:text-[30vw]">
        <div className="flex h-[1.2em] w-[1.2em] rotate-12 items-center justify-center  rounded-full bg-slate-950 leading-none text-white">
          <Code className="block h-3/4 w-3/4 opacity-50" />
        </div>
      </div>
    </Card>
  )
}

export default LessonCard
