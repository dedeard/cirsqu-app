'use client'
import React from 'react'
import { useCollections } from '@/components/contexts/CollectionContext'
import { Button } from '@nextui-org/react'
import { MinusCircle, PlusCircle } from 'react-feather'
import { useAuth } from '@/components/contexts/AuthContext'

const ToggleCollection: React.FC<{ lessonId: string }> = ({ lessonId }) => {
  const auth = useAuth()
  const { collections, actionLoading, addToCollection, removeFromCollection } = useCollections()
  const collection = collections.find((el) => el.lessonId === lessonId)
  const toggleCollection = () => {
    collection ? removeFromCollection(collection.collectionId) : addToCollection(lessonId)
  }

  if (!auth.profile) return null

  return (
    <Button variant="light" isDisabled={actionLoading} onClick={toggleCollection}>
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
