import { useState } from 'react'
import toast from 'react-hot-toast'
import clientFetch from '@/utils/fetch/client-fetch'

interface CommentActions {
  isActionInProgress: boolean
  toggleLikeStatusForComment: () => Promise<void>
  handleDeleteComment: () => Promise<void>
}

const useCommentActions = (commentId: string, isCommentLikedByUser?: boolean): CommentActions => {
  const [isActionInProgress, setActionInProgress] = useState(false)

  const handleDeleteComment = async () => {
    setActionInProgress(true)
    try {
      const response = await clientFetch(`comments/${commentId}`, { method: 'DELETE' })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'An unexpected error occurred.')
      }

      toast.success('The comment has been deleted successfully.')
    } catch (error: any) {
      toast.error(`Oops! The comment could not be deleted. Error: ${error.message}`)
    }
    setActionInProgress(false)
  }

  const handleLikeComment = async () => {
    const response = await clientFetch(`comments/${commentId}/like`, { method: 'POST' })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'An unexpected error occurred while liking the comment.')
    }
  }

  const handleUnlikeComment = async () => {
    const response = await clientFetch(`comments/${commentId}/unlike`, { method: 'DELETE' })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'An unexpected error occurred while unliking the comment.')
    }
  }

  const toggleLikeStatusForComment = async () => {
    setActionInProgress(true)
    try {
      const actionToPerformOnComment = isCommentLikedByUser ? handleUnlikeComment : handleLikeComment
      await actionToPerformOnComment()
    } catch (error: any) {
      toast.error(error.message)
    }
    setActionInProgress(false)
  }

  return { isActionInProgress, toggleLikeStatusForComment, handleDeleteComment }
}

export default useCommentActions
