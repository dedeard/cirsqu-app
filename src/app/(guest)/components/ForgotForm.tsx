'use client'
import React from 'react'
import * as yup from 'yup'
import { auth } from '@/libs/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import Input from './elements/Input'
import FIREBASE_ERRORS from '@/constants/firebase-errors'
import { useFormik } from 'formik'
import LoadingScreen from '../../components/elements/LoadingScreen'
import Alert from './elements/Alert'
import Button from './elements/Button'

const schema = {
  email: yup.string().email().required().label('Email address'),
}

export const ForgotForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [authError, setAuthError] = React.useState('')
  const [authSuccess, setAuthSuccess] = React.useState('')

  const handleFormSubmit = async ({ email }: any) => {
    try {
      setIsLoading(true)
      await sendPasswordResetEmail(auth, email)
      setAuthSuccess(
        'A password reset email has been successfully sent to your email address. Please check your inbox and follow the instructions to reset your password.',
      )
      setAuthError('')
    } catch (error: any) {
      setAuthSuccess('')
      setAuthError(FIREBASE_ERRORS[error.code] || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: { email: '' },
    onSubmit: handleFormSubmit,
    validationSchema: yup.object().shape(schema),
  })

  return (
    <>
      <LoadingScreen show={isLoading} />

      <p className="my-6 text-center text-sm leading-5 text-gray-700">
        Forgot your password? No problem. Please provide us with your email address, and we will send you an email containing a password
        reset link that will allow you to choose a new password.
      </p>

      {authSuccess && <Alert color="primary">{authSuccess}</Alert>}
      {authError && <Alert color="red">{authError}</Alert>}

      <form onSubmit={formik.handleSubmit}>
        <Input
          type="text"
          label="Email address"
          name="email"
          error={formik.errors.email}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <Button type="submit" disabled={!!authSuccess} style={{ cursor: !!authSuccess ? 'not-allowed' : 'pointer' }}>
          Send email
        </Button>
      </form>
    </>
  )
}

export default ForgotForm
