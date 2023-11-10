'use client'
import React from 'react'
import * as yup from 'yup'
import { useSearchParams } from 'next/navigation'
import { useFormik } from 'formik'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import FIREBASE_ERRORS from '@/constants/firebase-errors'
import Alert from './elements/Alert'
import { useAuth } from '@/components/contexts/AuthContext'
import Input from './Input'
import Button from './elements/Button'

const schema = {
  email: yup.string().email().required().label('Email address'),
}

export const ForgotForm: React.FC = () => {
  const searchParams = useSearchParams()
  const next = searchParams.get('next')

  const { setLoading } = useAuth({
    whenAuthedProfileNotExists: `/complete-profile${next ? '?next=' + next : ''}`,
    whenAuthedProfileExists: next || '/account',
  })

  const [authError, setAuthError] = React.useState('')
  const [authSuccess, setAuthSuccess] = React.useState('')

  const handleFormSubmit = async ({ email }: any) => {
    try {
      setLoading(true)
      await sendPasswordResetEmail(auth, email)
      setAuthSuccess(
        'A password reset email has been successfully sent to your email address. Please check your inbox and follow the instructions to reset your password.',
      )
      setAuthError('')
    } catch (error: any) {
      setAuthSuccess('')
      setAuthError(FIREBASE_ERRORS[error.code] || error.message)
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: { email: '' },
    onSubmit: handleFormSubmit,
    validationSchema: yup.object().shape(schema),
  })

  return (
    <>
      <p className="my-6 text-center text-sm leading-5 text-gray-700 dark:text-gray-300">
        Forgot your password? No problem. Please provide us with your email address, and we will send you an email containing a password
        reset link that will allow you to choose a new password.
      </p>

      {authSuccess && <Alert color="primary">{authSuccess}</Alert>}
      {authError && <Alert color="danger">{authError}</Alert>}

      <form className="grid grid-cols-1 gap-4" onSubmit={formik.handleSubmit}>
        <Input
          type="text"
          label="Email address"
          name="email"
          placeholder="you@example.com"
          error={formik.errors.email}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <Button type="submit">Send email</Button>
      </form>
    </>
  )
}

export default ForgotForm
