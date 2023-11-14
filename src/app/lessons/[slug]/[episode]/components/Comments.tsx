'use client'
import CommentForm from '@/components/features/Comment/CommentForm'
import CommentList from '@/components/features/Comment/CommentList'
import useComments from '@/components/features/Comment/hooks/useComments'

const Comments: React.FC<{ episodeId: string }> = ({ episodeId }) => {
  const { comments, total, isLoading } = useComments({ targetType: 'episode', targetId: episodeId })

  return (
    <div className="border-t border-neutral-800" id="comment-section">
      <div className="container my-12 max-w-4xl px-3">
        {isLoading ? (
          <div className="flex h-[32px] items-center gap-1">
            <span className="skeleton h-[28px] w-[120px] rounded-lg" />
            <span className="skeleton h-[28px] w-[32px] rounded-lg" />
          </div>
        ) : (
          <h2 className="relative text-2xl">Comments {total}</h2>
        )}

        <CommentForm targetType="episode" targetId={episodeId} isLoading={isLoading} className="mb-10 mt-3" />

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
