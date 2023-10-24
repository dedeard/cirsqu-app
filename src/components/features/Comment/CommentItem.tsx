import { useAuth } from '@/components/contexts/AuthContext'
import { useProfiles } from '@/components/contexts/ProfilesContext'
import Avatar from '@/components/elements/Avatar'
import clientFetch from '@/utils/client-fetch'
import moment from 'moment'
import React from 'react'
import toast from 'react-hot-toast'
import CommentMarkdown from './CommentMarkdown'
import EditCommentForm from './EditCommentForm'

type PropTypes = {
  comment: IComment
  setDeleteQueue: (comment: IComment) => void
}

const CommentItem: React.FC<PropTypes> = ({ comment, setDeleteQueue }) => {
  const { user } = useAuth()
  const { profiles } = useProfiles()
  const [openEdit, setOpenEdit] = React.useState(false)
  const [isLikeActionInProgress, setLikeActionInProgress] = React.useState(false)

  const author = profiles.find((el) => el.objectID === comment.userId)
  if (!author) return null

  const isCommentLikedByUser = user && comment.likes.includes(user.uid)

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

  return (
    <li className="relative w-full">
      <div className="absolute">
        <Avatar name={author.name} premium={author.premium} file={author.avatar} className="h-10 w-10 md:h-12 md:w-12" />
      </div>
      <div className="flex w-full flex-col gap-4 pl-14 md:pl-16">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col">
            <span className="block text-sm md:text-base">
              {author.name} <small className="text-xs opacity-80">@{author.username}</small>
            </span>
            <span className="block text-xs opacity-80">
              {moment(comment.createdAt.toDate()).fromNow()}{' '}
              {comment.updatedAt && <>| edited {moment(comment.updatedAt.toDate()).fromNow()}</>}
            </span>
          </div>

          {openEdit ? (
            <EditCommentForm comment={comment} onEnd={() => setOpenEdit(false)} />
          ) : (
            <>
              <CommentMarkdown className="prose prose-sm w-full max-w-full dark:prose-invert">{comment.body}</CommentMarkdown>

              <div className="flex gap-4 text-xs md:text-sm">
                <button disabled={isLikeActionInProgress} onClick={toggleLikeStatusForComment}>
                  {isCommentLikedByUser ? 'Unlike' : 'Like'} {comment.likes.length}
                </button>
                {author.objectID === user?.uid && (
                  <>
                    <button onClick={() => setOpenEdit(true)}>Edit</button>
                    <button className="text-danger" onClick={() => setDeleteQueue(comment)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </li>
  )
}

export default CommentItem
