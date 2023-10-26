'use client'
import React from 'react'
import { useCollections } from '@/components/contexts/CollectionContext'
import DeleteConfirm from '@/components/elements/DeleteConfirm'
import TitleBar from '../components/TitleBar'
import LessonList, { LessonListSkeleton } from './components/LessonList'
import CollectionEmpty from './components/Empty'

export default function Page() {
  const [deleteQueue, setDeleteQueue] = React.useState<string | null>(null)
  const { collections, loading, actionLoading, removeFromCollection } = useCollections()

  const handleDeleteCollection = async () => {
    if (!deleteQueue) return
    await removeFromCollection(deleteQueue)
    setDeleteQueue(null)
  }

  return (
    <>
      <DeleteConfirm
        isOpen={!!deleteQueue}
        isLoading={actionLoading}
        message="Are you sure you want to delete this item from your collection? Please note that this action cannot be undone."
        onCancel={() => setDeleteQueue(null)}
        onConfirm={handleDeleteCollection}
      />

      <TitleBar title={`Collections ${collections.length || ''}`} isLoading={loading} className="mb-3" />

      <CollectionEmpty />

      <ul className="grid grid-cols-1 gap-3" role="list">
        {collections.map(({ collectionId, lesson }) => (
          <React.Fragment key={collectionId}>
            {lesson && <LessonList lesson={lesson} collectionId={collectionId} setDeleteQueue={setDeleteQueue} />}
          </React.Fragment>
        ))}

        {loading && Array.from(Array(4).keys()).map((i) => <LessonListSkeleton key={i} />)}
      </ul>
    </>
  )
}
