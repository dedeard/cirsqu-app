'use client'
import React from 'react'
import { useCollections } from '@/components/contexts/CollectionContext'
import { MinusCircle, PlusCircle } from 'react-feather'
import { useAuth } from '@/components/contexts/AuthContext'

const ToggleCollection: React.FC<{ lessonId: string }> = ({ lessonId }) => {
  const auth = useAuth()
  const { collections, addToCollection, removeFromCollection } = useCollections()
  const [loading, setLoading] = React.useState(false)
  const collection = collections.find((el) => el.lessonId === lessonId)

  const toggleCollection = async () => {
    setLoading(true)
    collection ? await removeFromCollection(collection.collectionId) : await addToCollection(lessonId)
    setLoading(false)
  }

  if (!auth.profile) return null

  return (
    <button
      type="button"
      className="flex h-10 items-center rounded-lg px-3 text-sm text-neutral-800 hover:bg-neutral-200 dark:text-neutral-200  dark:hover:bg-neutral-800"
      disabled={loading}
      onClick={toggleCollection}
    >
      {collection ? (
        <>
          <MinusCircle className="mr-2 text-red-600" size={18} />
          Remove from collection
        </>
      ) : (
        <>
          <PlusCircle className="mr-2" size={18} />
          Add to collection
        </>
      )}
    </button>
  )
}

export default ToggleCollection
