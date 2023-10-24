'use client'
import React from 'react'
import CommentForm from './CommentForm'
import useComments from './hooks/useComments'
import CommentItem from './CommentItem'
import CommentSkeleton from './CommentSkeleton'

type PropTypes = {
  targetId: string
  targetType: 'episode'
  onTotalChange?: (total: number) => void
}

const Comment: React.FC<PropTypes> = ({ targetId, targetType, onTotalChange }) => {
  const { comments, total, isLoading } = useComments({ targetId, targetType, onTotalChange })

  return (
    <>
      <CommentForm {...{ targetId, targetType }} />

      <ul className="flex flex-col gap-6">
        {isLoading && (
          <React.Fragment key={0}>
            {Array.from(Array(3).keys()).map((i) => (
              <li key={i} className="flex w-full">
                <CommentSkeleton />
              </li>
            ))}
          </React.Fragment>
        )}

        {comments.map((comment) => (
          <li key={comment.commentId} className="flex w-full">
            <CommentItem comment={comment} />
          </li>
        ))}
      </ul>

      {!isLoading && total <= 0 && (
        <p className="p-3 text-center text-lg font-light tracking-wider">
          There are no comments for this content yet. Be the first to share your thoughts! :)
        </p>
      )}
    </>
  )
}

export default Comment
