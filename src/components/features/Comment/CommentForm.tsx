import React from 'react'
import cn from 'classnames'
import useCommentForm from './hooks/useCommentForm'
import { Textarea } from './Teaxtarea'
import Spinner from '@/components/svg/Spinner'

type PropTypes = {
  targetId: string
  targetType: 'episode' | 'reply'
  initialBody?: string
  isLoading?: boolean
  className?: string
  onEnd?: () => void
  mode?: 'edit' | 'create'
}

const CommentForm: React.FC<PropTypes> = ({ mode = 'create', targetId, targetType, isLoading, className, initialBody, onEnd }) => {
  const formCreate = useCommentForm(mode, { targetId, targetType, initialBody, onEnd })

  const isReply = targetType === 'reply'
  const placeholderText = mode === 'create' ? 'Share your thoughts or ask a question' : 'Edit your comment'
  const buttonText = mode === 'create' ? 'Post' : 'Edit'

  if (isLoading) return <CommentFormSkeleton className={className} isReply={isReply} />

  return (
    <form className={className} onSubmit={formCreate.handleSubmit}>
      <Textarea
        rows={isReply ? 2 : 5}
        name="body"
        small={isReply}
        placeholder={`${placeholderText}... (Markdown supported)`}
        value={formCreate.values.body}
        error={formCreate.errors.body}
        onBlur={formCreate.handleBlur}
        onChange={formCreate.handleChange}
      />

      <div className={cn(isReply && 'flex-row-reverse', 'flex gap-3 pt-3')}>
        <button
          type="submit"
          className={cn(
            isReply ? 'h-9 w-28 text-xs' : 'h-10 w-36 text-sm',
            'hoverable-blue flex items-center justify-center rounded-lg disabled:opacity-75',
          )}
          disabled={formCreate.isSubmitting}
        >
          {!formCreate.isSubmitting && (isReply ? `${buttonText} Reply` : `${buttonText} Comment`)}
          {formCreate.isSubmitting && <Spinner className="h-4 w-4" />}
        </button>

        {mode === 'edit' && (
          <button
            type="button"
            className={cn(
              isReply ? 'h-9 w-28 text-xs' : 'h-10 w-36 text-sm',
              'hoverable-default flex items-center justify-center rounded-lg border disabled:opacity-75',
            )}
            disabled={formCreate.isSubmitting}
            onClick={onEnd}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export const CommentFormSkeleton: React.FC<{ className?: string; isReply?: boolean }> = (props) => {
  return (
    <div className={props.className}>
      <span className={cn(props.isReply ? ' mb-1 h-14' : 'mb-3 h-28', 'skeleton rounded-lg')} />
      <div className={cn(props.isReply && 'flex justify-end')}>
        <span className={cn(props.isReply ? 'h-8 w-28' : 'h-10 w-36', 'skeleton rounded-lg')} />
      </div>
    </div>
  )
}

export default CommentForm
