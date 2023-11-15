'use client'
import React from 'react'
import { useCollections } from '@/components/contexts/CollectionContext'
import { MinusCircle, PlusCircle } from 'react-feather'
import { useAuth } from '@/components/contexts/AuthContext'

const ToggleCollection: React.FC<{ lessonId: string }> = ({ lessonId }) => {
  const auth = useAuth()
  const { collections, addToCollection, removeFromCollection, loading: initLoading } = useCollections()
  const collection = collections.find((el) => el.lessonId === lessonId)

  const [loading, setLoading] = React.useState(false)
  const [added, setAdded] = React.useState(!!collection)

  const toggleCollection = async () => {
    setLoading(true)
    setAdded(!added)
    collection ? await removeFromCollection(collection.collectionId) : await addToCollection(lessonId)
    setLoading(false)
  }

  React.useEffect(() => {
    setAdded(!!collection)
  }, [collection])

  if (!auth.profile || initLoading) return null

  return (
    <button
      type="button"
      className="flex h-10 items-center whitespace-nowrap rounded-lg px-3 text-sm text-neutral-800 hover:bg-neutral-200 disabled:opacity-75  dark:text-neutral-200 dark:hover:bg-neutral-800"
      disabled={loading}
      onClick={toggleCollection}
    >
      {added ? (
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
