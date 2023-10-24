import React from 'react'
import { collection, query, orderBy, where, onSnapshot } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { useProfiles } from '@/components/contexts/ProfilesContext'

type Options = {
  targetId: string
  targetType: string
}

const useComments = ({ targetId, targetType }: Options) => {
  const { fetchProfiles } = useProfiles()
  const [isLoading, setIsLoading] = React.useState(true)
  const [comments, setComments] = React.useState<IComment[]>([])

  React.useEffect(() => {
    setIsLoading(true)

    const q = query(
      collection(db, 'comments'),
      orderBy('createdAt', 'desc'),
      where('targetType', '==', targetType),
      where('targetId', '==', targetId),
    )

    return onSnapshot(q, async (snapshots) => {
      const comments = snapshots.docs
        .map((snapshot) => {
          if (snapshot.exists()) {
            return {
              commentId: snapshot.id,
              ...snapshot.data(),
            }
          }
        })
        .filter(Boolean) as IComment[]

      await fetchProfiles(comments.map((el) => el.userId))

      setComments(comments)
      setIsLoading(false)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetType, targetId])

  return { comments, isLoading, total: comments.length }
}

export default useComments
