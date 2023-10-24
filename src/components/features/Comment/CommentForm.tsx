import React from 'react'
import { Button, Textarea } from '@nextui-org/react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import clientFetch from '@/utils/client-fetch'
import { CommentFormSkeleton } from './Skeletons'

type PropTypes = {
  targetId: string
  targetType: 'episode'
  isLoading?: boolean
}

const CommentForm: React.FC<PropTypes> = ({ targetId, targetType, isLoading }) => {
  const [loading, setLoading] = React.useState(false)

  const handleFormSubmit = async ({ body }: { body: string }) => {
    setLoading(true)

    try {
      const response = await clientFetch('comments', { method: 'POST', data: { body, targetId, targetType } })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'An unexpected error occurred.')
      }

      formik.resetForm()
      toast.success('Your comment has been posted successfully!')
    } catch (error: any) {
      toast.error(`Failed to post your comment. Error message: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: handleFormSubmit,
    validationSchema: yup.object().shape({
      body: yup.string().min(20).max(3000).required(),
    }),
  })

  if (isLoading) return <CommentFormSkeleton />

  return (
    <form className="mb-10 mt-5" onSubmit={formik.handleSubmit}>
      <Textarea
        className="mb-3"
        classNames={{ label: 'hidden' }}
        variant="flat"
        maxRows={120}
        minRows={5}
        name="body"
        placeholder="Enter markdown comment"
        value={formik.values.body}
        errorMessage={formik.errors.body}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />

      <Button type="submit" color="primary" className="w-36" isLoading={loading}>
        {!loading && 'Post Comment'}
      </Button>
    </form>
  )
}

export default CommentForm
