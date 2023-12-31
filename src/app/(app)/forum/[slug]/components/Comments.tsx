'use client'

import CommentForm from '@/components/features/Comment/CommentForm'
import CommentList from '@/components/features/Comment/CommentList'
import useComments from '@/components/features/Comment/hooks/useComments'

const Comments: React.FC<{ questionId: string }> = ({ questionId }) => {
  const { comments, total, isLoading } = useComments({ targetType: 'question', targetId: questionId })

  return (
    <div className="border-t border-neutral-200 p-3 dark:border-neutral-800">
      {isLoading ? (
        <div className="flex h-[32px] items-center gap-1">
          <span className="skeleton h-[28px] w-[120px] rounded-lg" />
          <span className="skeleton h-[28px] w-[32px] rounded-lg" />
        </div>
      ) : (
        <h2 className="relative text-2xl">Comments {total}</h2>
      )}

      <CommentForm targetType="question" targetId={questionId} isLoading={isLoading} className="mb-10 mt-3" />

      <CommentList comments={comments} isLoading={isLoading} />

      {!isLoading && total <= 0 && (
        <p className="p-3 text-center text-lg font-light tracking-wider">
          There are no comments for this content yet. Be the first to share your thoughts! :)
        </p>
      )}
    </div>
  )
}

export default Comments
