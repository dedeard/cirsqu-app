import { useAuth } from '@/components/contexts/AuthContext'
import { useProfiles } from '@/components/contexts/ProfilesContext'
import Avatar from '@/components/elements/Avatar'
import moment from 'moment'
import React from 'react'
import CommentMarkdown from './CommentMarkdown'
import useCommentActions from './hooks/useCommentActions'
import CommentForm from './CommentForm'

type PropTypes = {
  comment: IComment
  setDeleteQueue: (comment: IComment) => void
}

const ReplyItem: React.FC<PropTypes> = ({ comment, setDeleteQueue }) => {
  const { user } = useAuth()
  const { profiles } = useProfiles()
  const [openEdit, setOpenEdit] = React.useState(false)

  const author = profiles.find((el) => el.objectID === comment.userId)
  const isCommentLikedByUser = user && comment.likes.includes(user.uid)
  const { isActionInProgress, toggleLikeStatusForComment } = useCommentActions(comment.commentId, !!isCommentLikedByUser)

  if (!author) return null

  return (
    <li className="relative w-full">
      <div className="absolute">
        <Avatar name={author.name} premium={author.premium} file={author.avatar} className="h-10 w-10" />
      </div>
      <div className="flex w-full flex-col gap-4 pl-14">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col">
            <span className="block text-sm">
              {author.name} <small className="text-xs opacity-80">@{author.username}</small>
            </span>
            <span className="block text-xs opacity-80">
              {moment(comment.createdAt.toDate()).fromNow()}{' '}
              {comment.updatedAt && <>| edited {moment(comment.updatedAt.toDate()).fromNow()}</>}
            </span>
          </div>

          {openEdit ? (
            <CommentForm
              targetId={comment.commentId}
              targetType="reply"
              mode="edit"
              initialBody={comment.body}
              onEnd={() => setOpenEdit(false)}
            />
          ) : (
            <>
              <CommentMarkdown className="prose prose-sm w-full max-w-full dark:prose-invert">{comment.body}</CommentMarkdown>

              <div className="flex gap-4 text-xs md:text-sm">
                <button disabled={isActionInProgress} onClick={toggleLikeStatusForComment}>
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

export default ReplyItem