import React from 'react'
import { collection, query, orderBy, where, onSnapshot } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { useProfiles } from '@/components/contexts/ProfilesContext'

type Options = {
  targetId: string
  targetType: string
  onTotalChange?: (total: number) => void
}

const useComments = ({ targetId, targetType, onTotalChange }: Options) => {
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
      const rawComments = snapshots.docs
        .map((snapshot) => {
          if (snapshot.exists()) {
            return {
              commentId: snapshot.id,
              ...snapshot.data(),
            }
          }
        })
        .filter(Boolean) as IComment[]

      const profiles = await fetchProfiles(rawComments.map((el) => el.userId))

      const comments = rawComments
        .map((comment) => {
          const author = profiles.find((profile) => profile.objectID === comment.userId)
          if (author) {
            return {
              ...comment,
              author,
            }
          }
        })
        .filter(Boolean) as IComment[]

      setComments(comments)
      onTotalChange?.(comments.length)
      setIsLoading(false)
    })
  }, [targetType, targetId, fetchProfiles, onTotalChange])

  return { comments, isLoading, total: comments.length }
}

export default useComments
