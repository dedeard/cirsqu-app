import { useAuth } from '@/components/contexts/AuthContext'
import Avatar from '@/components/elements/Avatar'
import clientFetch from '@/utils/client-fetch'
import { db } from '@/utils/firebase'
import { Button } from '@nextui-org/react'
import cn from 'classnames'
import { deleteDoc, doc } from 'firebase/firestore'
import moment from 'moment'
import React from 'react'
import { Heart, Trash } from 'react-feather'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'

const CommentItem: React.FC<{ comment: IComment }> = ({ comment }) => {
  const { user } = useAuth()
  const isCommentLikedByUser = user && comment.likes.includes(user.uid)
  const [isLikeActionInProgress, setLikeActionInProgress] = React.useState(false)
  const [isDeleteActionInProgress, setDeleteActionInProgress] = React.useState(false)

  const handleLikeComment = async () => {
    const response = await clientFetch(`comments/${comment.commentId}/like`, { method: 'POST' })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'An unexpected error occurred while liking the comment.')
    }
  }

  const handleUnlikeComment = async () => {
    const response = await clientFetch(`comments/${comment.commentId}/unlike`, { method: 'DELETE' })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'An unexpected error occurred while unliking the comment.')
    }
  }

  const toggleLikeStatusForComment = async () => {
    setLikeActionInProgress(true)
    try {
      const actionToPerformOnComment = isCommentLikedByUser ? handleUnlikeComment : handleLikeComment
      await actionToPerformOnComment()
    } catch (error: any) {
      toast.error(error.message)
    }
    setLikeActionInProgress(false)
  }

  const handleDeleteComment = async () => {
    setDeleteActionInProgress(true)

    try {
      await deleteDoc(doc(db, 'comments', comment.commentId))
      toast.success('Comment deleted successfully!')
    } catch (error: any) {
      toast.error(`Failed to delete the comment. Error message: ${error.message}`)
    }
    setDeleteActionInProgress(false)
  }

  return (
    <>
      <div className="pr-5">
        <Avatar name={comment.author.name} premium={comment.author.premium} file={comment.author.avatar} className="h-12 w-12" />
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <div className="h-12">
          <span className="block">
            {comment.author.name} <small className="text-xs text-foreground/60">@{comment.author.username}</small>
          </span>
          <span className="block text-xs text-foreground/60">{moment(comment.createdAt.toDate()).fromNow()}</span>
        </div>

        <Markdown className="prose mb-3 w-full max-w-full text-sm text-foreground/60">{comment.body}</Markdown>

        <div className="flex justify-end gap-3">
          {user?.uid === comment.userId && (
            <Button
              isIconOnly
              variant="light"
              color="danger"
              radius="full"
              isLoading={isDeleteActionInProgress}
              onClick={handleDeleteComment}
            >
              <Trash size={18} />
            </Button>
          )}
          <Button
            startContent={<Heart size={18} className={cn(isCommentLikedByUser && 'fill-danger text-danger')} />}
            variant="light"
            radius="full"
            isLoading={isLikeActionInProgress}
            onClick={toggleLikeStatusForComment}
          >
            {comment.likes.length}
          </Button>
        </div>
      </div>
    </>
  )
}

export default CommentItem
