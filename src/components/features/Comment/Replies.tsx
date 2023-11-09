'use client'
import React from 'react'
import useComments from './hooks/useComments'
import ReplyItem, { ReplyItemSkeleton } from './ReplyItem'
import CommentForm from './CommentForm'

type PropTypes = {
  comment: IComment
  setDeleteQueue: (comment: IComment) => void
}

const Replies: React.FC<PropTypes> = ({ comment, setDeleteQueue }) => {
  const { comments, isLoading } = useComments({ targetType: 'reply', targetId: comment.commentId })
  return (
    <>
      <CommentForm targetId={comment.commentId} targetType="reply" isLoading={isLoading} className="border-divider border-t pt-5" />
      <ul className="border-divider flex flex-col gap-10 border-b pb-10 pt-3">
        {isLoading
          ? Array.from(Array(3).keys()).map((i) => <ReplyItemSkeleton key={i} />)
          : comments.map((comment) => <ReplyItem key={comment.commentId} comment={comment} setDeleteQueue={setDeleteQueue} />)}
      </ul>
    </>
  )
}

export default Replies
