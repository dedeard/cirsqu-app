'use client'
import React from 'react'
import { useCollections } from '@/components/contexts/CollectionContext'
import DeleteConfirm from '@/components/elements/DeleteConfirm'
import { useAuth } from '@/components/contexts/AuthContext'
import LessonList from './LessonList'
import CollectionEmpty from './CollectionEmpty'
import MainLoading from './MainLoading'
import TitleBar from '../../components/TitleBar'

const Main: React.FC = () => {
  const { initLoading } = useAuth({
    whenNotAuthed: '/sign-in?next=/collections',
    whenAuthedProfileNotExists: '/complete-profile?next=/collections',
  })

  const [deleteQueue, setDeleteQueue] = React.useState<string | null>(null)
  const { collections, loading, actionLoading, removeFromCollection } = useCollections()

  const handleDeleteCollection = async () => {
    if (!deleteQueue) return
    await removeFromCollection(deleteQueue)
    setDeleteQueue(null)
  }

  if (loading || initLoading) return <MainLoading />

  return (
    <>
      <DeleteConfirm
        isOpen={!!deleteQueue}
        isLoading={actionLoading}
        message="Are you sure you want to delete this item from your collection? Please note that this action cannot be undone."
        onCancel={() => setDeleteQueue(null)}
        onConfirm={handleDeleteCollection}
      />

      <TitleBar title={`Collections ${collections.length || ''}`} className="mb-3" />

      <CollectionEmpty />

      <ul className="grid grid-cols-1 gap-3">
        {collections.map(({ collectionId, lesson }) => (
          <React.Fragment key={collectionId}>
            {lesson && (
              <li className="relative">
                <LessonList lesson={lesson} collectionId={collectionId} setDeleteQueue={setDeleteQueue} />
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </>
  )
}

export default Main
