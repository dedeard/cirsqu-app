'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@nextui-org/react'
import { Inbox } from 'react-feather'
import { useCollections } from '@/components/contexts/CollectionContext'
import Card from '../../components/Card'

const CollectionEmpty: React.FC = () => {
  const { collections, loading } = useCollections()

  if (!(!loading && collections.length === 0)) return null

  return (
    <Card className="mb-3" forceBodyClassName="px-4 py-16">
      <div className="mb-4 flex animate-pulse justify-center">
        <Inbox className="h-28 w-28 md:h-32 md:w-32" strokeWidth={0.5} />
      </div>
      <p className="mx-auto mb-6 max-w-lg text-center text-lg font-light tracking-wider">
        Your collection is currently empty. Let's fill it with some exciting lessons!
      </p>
      <div className="flex justify-center">
        <Button as={Link} href="/lessons" color="primary">
          Explore Lessons
        </Button>
      </div>
    </Card>
  )
}

export default CollectionEmpty
