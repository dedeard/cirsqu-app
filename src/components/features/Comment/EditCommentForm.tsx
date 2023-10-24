import React from 'react'
import { Button, Textarea } from '@nextui-org/react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import clientFetch from '@/utils/client-fetch'

type PropTypes = {
  comment: IComment
  onEnd: () => void
}

const EditCommentForm: React.FC<PropTypes> = ({ comment, onEnd }) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleFormSubmit = async ({ body }: { body: string }) => {
    setIsLoading(true)

    try {
      const response = await clientFetch(`comments/${comment.commentId}`, { method: 'PUT', data: { body } })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'An unexpected error occurred.')
      }

      toast.success('Your comment has been updated successfully!')
      onEnd()
    } catch (error: any) {
      toast.error(`Failed to update your comment. Error message: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      body: comment.body,
    },
    onSubmit: handleFormSubmit,
    validationSchema: yup.object().shape({
      body: yup.string().min(20).max(3000).required(),
    }),
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Textarea
        className="mb-3"
        variant="flat"
        classNames={{ label: 'hidden' }}
        maxRows={120}
        minRows={5}
        autoFocus
        name="body"
        placeholder="Enter markdown comment"
        value={formik.values.body}
        errorMessage={formik.errors.body}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      <div className="flex gap-3">
        <Button type="submit" color="primary" className="w-36" isLoading={isLoading}>
          {!isLoading && 'Update Comment'}
        </Button>
        <Button type="button" variant="flat" onClick={onEnd}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default EditCommentForm
