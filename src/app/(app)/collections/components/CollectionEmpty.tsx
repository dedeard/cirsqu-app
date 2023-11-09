'use client'
import React from 'react'
import Link from 'next/link'
import { Inbox } from 'react-feather'
import { useCollections } from '@/components/contexts/CollectionContext'

const CollectionEmpty: React.FC = () => {
  const { collections, loading } = useCollections()

  if (!(!loading && collections.length === 0)) return null

  return (
    <div className="mb-3 rounded-lg border border-neutral-200 bg-neutral-200/30 px-4 py-16 dark:border-neutral-800 dark:bg-neutral-800/30">
      <div className="mb-4 flex animate-pulse justify-center">
        <Inbox className="h-28 w-28 md:h-32 md:w-32" strokeWidth={0.5} />
      </div>
      <p className="mx-auto mb-6 max-w-lg text-center text-lg font-light tracking-wider">
        Your collection is currently empty. Let's fill it with some exciting lessons!
      </p>
      <div className="flex justify-center">
        <Link href="/lessons" className="hoverable-blue flex h-10 items-center rounded-lg px-4 text-sm">
          Explore Lessons
        </Link>
      </div>
    </div>
  )
}

export default CollectionEmpty
