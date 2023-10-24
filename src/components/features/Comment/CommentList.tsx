'use client'
import React from 'react'
import CommentItem from './CommentItem'
import cn from 'classnames'
import { CommentItemSkeleton } from './Skeletons'
import DeleteCommentConfirm from './DeleteCommentConfirm'

type PropTypes = {
  comments: IComment[]
  isLoading?: boolean
} & React.HTMLAttributes<HTMLUListElement>

const CommentList: React.FC<PropTypes> = ({ comments, className, isLoading, ...props }) => {
  const [deleteQueue, setDeleteQueue] = React.useState<IComment | null>(null)

  return (
    <>
      <DeleteCommentConfirm comment={deleteQueue} setDeleteQueue={setDeleteQueue} />
      <ul className={cn(className, 'flex flex-col gap-16 py-10')} {...props}>
        {isLoading
          ? Array.from(Array(3).keys()).map((i) => <CommentItemSkeleton key={i} />)
          : comments.map((comment) => <CommentItem key={comment.commentId} comment={comment} setDeleteQueue={setDeleteQueue} />)}
      </ul>
    </>
  )
}

export default CommentList
