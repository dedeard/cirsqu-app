'use client'
import React from 'react'
import CommentItem, { CommentItemSkeleton } from './CommentItem'
import cn from 'classnames'
import DeleteConfirm from '@/components/elements/DeleteConfirm'
import useCommentActions from './hooks/useCommentActions'

type PropTypes = {
  comments: IComment[]
  isLoading?: boolean
} & React.HTMLAttributes<HTMLUListElement>

const CommentList: React.FC<PropTypes> = ({ comments, className, isLoading, ...props }) => {
  const [deleteQueue, setDeleteQueue] = React.useState<IComment | null>(null)
  const { isActionInProgress, handleDeleteComment } = useCommentActions(deleteQueue?.commentId || '')

  const handleConfirm = async () => {
    await handleDeleteComment()
    setDeleteQueue(null)
  }

  return (
    <>
      <DeleteConfirm
        isOpen={!!deleteQueue}
        isLoading={isActionInProgress}
        title="Are you absolutely certain?"
        message="Once you delete this comment, it will be gone forever, and cannot be recovered. Please be certain before proceeding."
        onConfirm={handleConfirm}
        onCancel={() => setDeleteQueue(null)}
      />

      <ul className={cn(className, 'flex flex-col gap-16 py-10')} {...props}>
        {isLoading
          ? Array.from(Array(3).keys()).map((i) => <CommentItemSkeleton key={i} />)
          : comments.map((comment) => <CommentItem key={comment.commentId} comment={comment} setDeleteQueue={setDeleteQueue} />)}
      </ul>
    </>
  )
}

export default CommentList
