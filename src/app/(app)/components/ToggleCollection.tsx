'use client'
import React from 'react'
import { useCollections } from '@/components/contexts/CollectionContext'
import { Button } from '@nextui-org/react'
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
    <Button variant="light" isDisabled={loading} onClick={toggleCollection}>
      {collection ? (
        <>
          <MinusCircle className="text-danger" size={18} />
          Remove from collection
        </>
      ) : (
        <>
          <PlusCircle size={18} />
          Add to collection
        </>
      )}
    </Button>
  )
}

export default ToggleCollection
