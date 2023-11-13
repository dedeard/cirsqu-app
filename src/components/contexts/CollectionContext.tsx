'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import clientFetch from '@/utils/client-fetch'
import search from '@/utils/algolia/search'
import { useAuth } from './AuthContext'

interface CollectionsContextProps {
  loading: boolean
  collections: ICollection[]
  actionLoading: boolean
  removeFromCollection: (collectionId: string) => Promise<void>
  addToCollection: (lessonId: string) => Promise<void>
}

const CollectionsContext = createContext<CollectionsContextProps>({
  loading: true,
  collections: [],
  actionLoading: false,
  removeFromCollection: async () => {},
  addToCollection: async () => {},
})

export const CollectionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [lessons, setLessons] = useState<IALesson[]>([])
  const [collections, setCollections] = useState<ICollection[]>([])

  const fetchLessons = async (lessonIds: string[]) => {
    const loadedLessonIds = lessons.map((lesson) => lesson.lessonId)

    const idsToFetch = lessonIds.filter((id) => !loadedLessonIds.includes(id))

    let newLessons: IALesson[]

    if (idsToFetch.length > 0) {
      const promises = idsToFetch.map(async (lessonId) => {
        const { hits } = await search<IALesson>({
          query: lessonId,
          typoTolerance: false,
          index: 'lessons',
          hitsPerPage: 1,
          restrictSearchableAttributes: ['lessonId'],
        })
        return hits[0]
      })
      const results = await Promise.all(promises)

      newLessons = [...lessons, ...results]
      setLessons(newLessons)
    } else {
      newLessons = lessons
    }

    return newLessons
  }

  const removeFromCollection = async (collectionId: string) => {
    setActionLoading(true)
    try {
      await deleteDoc(doc(db, 'collections', collectionId))
      toast.success('Collection deleted successfully!')
    } catch (error: any) {
      toast.error(`Failed to delete the collection. Please try again later. Error: ${error.message}`)
    }
    setActionLoading(false)
  }

  const addToCollection = async (lessonId: string) => {
    setActionLoading(true)
    try {
      const response = await clientFetch('collections', { method: 'POST', data: { lessonId } })
      if (!response.ok) {
        throw await response.json()
      }
      toast.success('Lesson added to the collection successfully!')
    } catch (error: any) {
      toast.error(`Failed to add the lesson to the collection. Please try again later. Error: ${error.message}`)
    }
    setActionLoading(false)
  }

  useEffect(() => {
    if (!user?.uid) return
    setLoading(true)

    const q = query(collection(db, 'collections'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'))
    return onSnapshot(q, async (snapshot) => {
      const lessonIds: string[] = []
      let rawCollections: ICollection[] = []
      for (const doc of snapshot.docs) {
        lessonIds.push(doc.data().lessonId)
        rawCollections.push({
          collectionId: doc.id,
          ...doc.data(),
          lesson: null,
        } as ICollection)
      }

      const loadedLessons = await fetchLessons(lessonIds)

      rawCollections = rawCollections.map((collection) => {
        const lesson = loadedLessons.find((el) => el.lessonId === collection.lessonId) || null
        return { ...collection, lesson }
      })

      setCollections(rawCollections)
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid])

  return (
    <CollectionsContext.Provider value={{ collections, loading, actionLoading, removeFromCollection, addToCollection }}>
      {children}
    </CollectionsContext.Provider>
  )
}

export const useCollections = () => useContext(CollectionsContext)
