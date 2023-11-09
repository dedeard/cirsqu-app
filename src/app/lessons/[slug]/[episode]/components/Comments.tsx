import React from 'react'
import { Skeleton } from '@nextui-org/react'
import CommentForm from '@/components/features/Comment/CommentForm'
import CommentList from '@/components/features/Comment/CommentList'
import useComments from '@/components/features/Comment/hooks/useComments'

const Comments: React.FC<{ episodeId: string }> = ({ episodeId }) => {
  const { comments, total, isLoading } = useComments({ targetType: 'episode', targetId: episodeId })

  return (
    <div className="border-divider border-t" id="comment-section">
      <div className="container my-12 max-w-4xl px-3">
        {isLoading ? (
          <div className="flex h-[32px] items-center gap-1">
            <Skeleton className="rounded-medium block h-[28px] w-[120px]" />
            <Skeleton className="rounded-medium block h-[28px] w-[32px]" />
          </div>
        ) : (
          <h2 className="relative text-2xl">Comments {total}</h2>
        )}

        <CommentForm targetType="episode" targetId={episodeId} isLoading={isLoading} className="mb-10 mt-5" />

        <CommentList comments={comments} isLoading={isLoading} />

        {!isLoading && total <= 0 && (
          <p className="p-3 text-center text-lg font-light tracking-wider">
            There are no comments for this content yet. Be the first to share your thoughts! :)
          </p>
        )}
      </div>
    </div>
  )
}

export default Comments
