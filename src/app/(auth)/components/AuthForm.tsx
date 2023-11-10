'use client'
import React from 'react'
import * as yup from 'yup'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useFormik } from 'formik'
import { AuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, UserCredential } from 'firebase/auth'
import { useAuth } from '@/components/contexts/AuthContext'
import { auth } from '@/utils/firebase'
import FIREBASE_ERRORS from '@/constants/firebase-errors'
import SocialAuthProviders from './SocialAuthProviders'
import Alert from './elements/Alert'
import Button from './elements/Button'
import Input from './Input'

const schemas = {
  'sign-in': {
    email: yup.string().email().required().label('Email address'),
    password: yup.string().required().label('Password'),
  },
  'sign-up': {
    email: yup.string().email().required().label('Email address'),
    password: yup.string().min(6).required().label('Password'),
  },
}

const authActions = {
  'sign-in': signInWithEmailAndPassword,
  'sign-up': createUserWithEmailAndPassword,
}

export const AuthForm: React.FC<{ action: 'sign-in' | 'sign-up' }> = ({ action }) => {
  const searchParams = useSearchParams()
  const next = searchParams.get('next')

  const { setLoading } = useAuth({
    whenAuthedProfileNotExists: `/complete-profile${next ? '?next=' + next : ''}`,
    whenAuthedProfileExists: next || '/account',
  })

  const [authError, setAuthError] = React.useState('')

  const executeAuthAction = async (authAction: () => Promise<UserCredential>) => {
    try {
      setLoading(true)
      await authAction()
    } catch (error: any) {
      setAuthError(FIREBASE_ERRORS[error.code] || error.message)
      setLoading(false)
    }
  }

  const handlePopupSignIn = (provider: AuthProvider) => executeAuthAction(() => signInWithPopup(auth, provider))

  const handleFormSubmit = ({ email, password }: any) => executeAuthAction(() => authActions[action](auth, email, password))

  const formik = useFormik({
    initialValues: { password: '', email: '' },
    onSubmit: handleFormSubmit,
    validationSchema: yup.object().shape(schemas[action]),
  })

  const actionText = action === 'sign-in' ? 'Sign in' : 'Sign up'

  return (
    <>
      {authError && <Alert color="danger">{authError}</Alert>}

      <SocialAuthProviders onClick={handlePopupSignIn} />

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
        <Input
          type="password"
          label="Password"
          name="password"
          placeholder="••••••••"
          error={formik.errors.password}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <div className="my-6 text-center text-xs leading-5 text-neutral-600 dark:text-neutral-400">
          <span>
            By clicking '{actionText}', you agree to our{' '}
            <Link href="/terms-of-service" className="text-blue-600 hover:text-blue-700 dark:hover:text-blue-500">
              Terms of Service
            </Link>{' '}
            and our{' '}
            <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-700 dark:hover:text-blue-500">
              Privacy Policy
            </Link>
            .
          </span>
        </div>

        <Button type="submit">{actionText}</Button>
      </form>
    </>
  )
}

export default AuthForm
