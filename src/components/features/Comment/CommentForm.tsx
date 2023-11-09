import React from 'react'
import { Button, Skeleton, Textarea } from '@nextui-org/react'
import useCommentForm from './hooks/useCommentForm'
import cn from 'classnames'

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
        className={isReply ? undefined : 'mb-3'}
        classNames={{ label: 'hidden' }}
        variant="flat"
        maxRows={120}
        minRows={isReply ? 2 : 5}
        name="body"
        size={isReply ? 'sm' : undefined}
        placeholder={`${placeholderText}... (Markdown supported)`}
        value={formCreate.values.body}
        errorMessage={formCreate.errors.body}
        onBlur={formCreate.handleBlur}
        onChange={formCreate.handleChange}
      />

      <div className={isReply ? 'flex justify-end' : undefined}>
        <Button
          type="submit"
          color="primary"
          size={isReply ? 'sm' : undefined}
          className={isReply ? 'w-28' : 'w-36'}
          isLoading={formCreate.isSubmitting}
        >
          {!formCreate.isSubmitting && (isReply ? `${buttonText} Reply` : `${buttonText} Comment`)}
        </Button>
      </div>
    </form>
  )
}

export const CommentFormSkeleton: React.FC<{ className?: string; isReply?: boolean }> = (props) => {
  return (
    <div className={props.className}>
      <Skeleton className={cn(props.isReply ? ' rounded-small mb-1 h-14' : 'rounded-medium mb-3 h-28')} />
      <div className={cn(props.isReply && 'flex justify-end')}>
        <Skeleton className={cn(props.isReply ? 'rounded-small h-8 w-28' : 'rounded-medium h-10 w-36')} />
      </div>
    </div>
  )
}

export default CommentForm
