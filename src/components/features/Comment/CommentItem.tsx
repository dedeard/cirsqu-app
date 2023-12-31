import { useAuth } from '@/components/contexts/AuthContext'
import { useProfiles } from '@/components/contexts/ProfilesContext'
import Avatar from '@/components/elements/Avatar'
import moment from 'moment'
import React from 'react'
import CommentMarkdown from './CommentMarkdown'
import Replies from './Replies'
import useCommentActions from './hooks/useCommentActions'
import CommentForm from './CommentForm'

type PropTypes = {
  comment: IComment
  setDeleteQueue: (comment: IComment) => void
}

const CommentItem: React.FC<PropTypes> = ({ comment, setDeleteQueue }) => {
  const { user } = useAuth()
  const { profiles } = useProfiles()
  const [openEdit, setOpenEdit] = React.useState(false)
  const [openReplies, setOpenReplies] = React.useState(false)

  const author = profiles.find((el) => el.objectID === comment.userId)
  const isCommentLikedByUser = user && comment.likes.includes(user.uid)
  const [liked, setLiked] = React.useState(isCommentLikedByUser)
  const [likeCount, setLikeCount] = React.useState(comment.likes.length)

  const { isActionInProgress, toggleLikeStatusForComment } = useCommentActions(comment.commentId, !!isCommentLikedByUser)

  const toggleLike = async () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
    await toggleLikeStatusForComment()
  }

  React.useEffect(() => {
    setLiked(isCommentLikedByUser)
  }, [isCommentLikedByUser])

  React.useEffect(() => {
    setLikeCount(comment.likes.length)
  }, [comment.likes.length])

  if (!author) return null
  return (
    <li className="relative w-full">
      <div className="absolute">
        <Avatar
          name={author.name}
          premium={author.premium}
          file={author.avatar}
          size={40}
          className="h-10 w-10 bg-neutral-300 dark:bg-neutral-700 md:h-12 md:w-12"
        />
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
            <CommentForm
              targetId={comment.commentId}
              targetType="episode"
              mode="edit"
              initialBody={comment.body}
              onEnd={() => setOpenEdit(false)}
            />
          ) : (
            <>
              <CommentMarkdown className="prose prose-sm w-full max-w-full dark:prose-invert">{comment.body}</CommentMarkdown>

              <div className="flex gap-4 text-xs md:text-sm">
                <button onClick={() => setOpenReplies(!openReplies)}>
                  {openReplies && 'Close replies'}
                  {!openReplies && `Replies ${comment.replyCount || 0}`}
                </button>
                <button disabled={isActionInProgress || !user || user?.uid === comment.userId} onClick={toggleLike}>
                  {liked ? 'Unlike' : 'Like'} {likeCount}
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

        {openReplies && <Replies comment={comment} setDeleteQueue={setDeleteQueue} />}
      </div>
    </li>
  )
}

export const CommentItemSkeleton: React.FC = () => {
  return (
    <li className="relative w-full">
      <div className="absolute">
        <span className="skeleton h-10 w-10 rounded-full md:h-12 md:w-12" />
      </div>
      <div className="flex w-full flex-col gap-4 pl-14 md:pl-16">
        <div className="flex w-full flex-col gap-4">
          <div className="flex h-9 flex-col justify-center gap-1 md:h-10">
            <span className="skeleton h-3 w-44 rounded-full" />
            <span className="skeleton h-2 w-32 rounded-full" />
          </div>

          <div className="flex flex-col items-center justify-center gap-3">
            {Array.from(Array(3).keys()).map((i) => (
              <span key={i} className="skeleton h-3 w-full rounded-full" />
            ))}
          </div>

          <div className="flex gap-4">
            <span className="skeleton h-4 w-10 rounded-full md:h-5" />
            <span className="skeleton h-4 w-10 rounded-full md:h-5" />
          </div>
        </div>
      </div>
    </li>
  )
}

export default CommentItem
