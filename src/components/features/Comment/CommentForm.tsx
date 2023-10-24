import React from 'react'
import { Button, Textarea } from '@nextui-org/react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import clientFetch from '@/utils/client-fetch'

type PropTypes = {
  targetId: string
  targetType: 'episode'
}

const CommentForm: React.FC<PropTypes> = ({ targetId, targetType }) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleFormSubmit = async ({ body }: { body: string }) => {
    setIsLoading(true)

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
      setIsLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: handleFormSubmit,
    validationSchema: yup.object().shape({
      body: yup.string().min(20).max(1500).required(),
    }),
  })

  return (
    <form className="my-12 flex flex-col" onSubmit={formik.handleSubmit}>
      <Textarea
        className="mb-3"
        variant="bordered"
        name="body"
        placeholder="Enter markdown comment"
        value={formik.values.body}
        errorMessage={formik.errors.body}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />

      <Button type="submit" color="primary" className="w-36" isLoading={isLoading}>
        {!isLoading && 'Post Comment'}
      </Button>
    </form>
  )
}

export default CommentForm
