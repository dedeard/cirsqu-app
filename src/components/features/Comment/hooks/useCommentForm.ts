import React from 'react'
import { useFormik, FormikHelpers } from 'formik'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import clientFetch from '@/utils/fetch/client-fetch'

type Mode = 'create' | 'edit'
type Options = {
  initialBody?: string
  targetId?: string
  targetType?: 'question' | 'episode' | 'reply'
  bodyMin?: number
  bodyMax?: number
  successMessage?: string
  errorMessage?: string
  onEnd?: () => void
}

const DEFAULT_BODY_MIN = 10
const DEFAULT_BODY_MAX = 3000
const DEFAULT_CREATE_SUCCESS_MSG = 'Your comment has been posted successfully!'
const DEFAULT_EDIT_SUCCESS_MSG = 'Your comment has been edited successfully!'
const DEFAULT_ERROR_MSG = 'Failed to process your comment. Error message: '

const validationSchema = (bodyMin: number, bodyMax: number) =>
  yup.object().shape({
    body: yup.string().min(bodyMin).max(bodyMax).required().label('Comment'),
  })

const useCommentForm = (mode: Mode, options: Options) => {
  const {
    initialBody = '',
    targetId,
    targetType,
    bodyMin = DEFAULT_BODY_MIN,
    bodyMax = DEFAULT_BODY_MAX,
    successMessage = mode === 'create' ? DEFAULT_CREATE_SUCCESS_MSG : DEFAULT_EDIT_SUCCESS_MSG,
    errorMessage = DEFAULT_ERROR_MSG,
    onEnd,
  } = options

  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleFormSubmit = async (values: { body: string }, formikHelpers: FormikHelpers<{ body: string }>) => {
    setIsSubmitting(true)

    try {
      const endpoint = mode === 'create' ? 'comments' : `comments/${targetId}`
      const method = mode === 'create' ? 'POST' : 'PUT'
      const data = mode === 'create' ? { ...values, targetId, targetType } : { body: values.body }

      const response = await clientFetch(endpoint, { method, data })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'An unexpected error occurred.')
      }

      formikHelpers.resetForm()
      toast.success(successMessage)

      onEnd?.()
    } catch (error: any) {
      toast.error(`${errorMessage} ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formikInstance = useFormik({
    initialValues: {
      body: initialBody,
    },
    onSubmit: handleFormSubmit,
    validationSchema: validationSchema(bodyMin, bodyMax),
  })

  return { ...formikInstance, isSubmitting }
}

export default useCommentForm
