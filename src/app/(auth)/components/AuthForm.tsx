'use client'
import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { AuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, UserCredential } from 'firebase/auth'
import SocialAuthProviders from './SocialAuthProviders'
import { auth } from '@/utils/firebase'
import { useRouter, useSearchParams } from 'next/navigation'
import FIREBASE_ERRORS from '@/constants/firebase-errors'
import clientFetch from '@/utils/client-fetch'
import LoadingScreen from '@/components/elements/LoadingScreen'
import Alert from './elements/Alert'
import Button from './elements/Button'
import { Input } from '@nextui-org/react'
import { Eye, EyeOff } from 'react-feather'

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
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isLoading, setIsLoading] = React.useState(false)
  const [authError, setAuthError] = React.useState('')
  const [isVisible, setIsVisible] = React.useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const executeAuthAction = async (authAction: () => Promise<UserCredential>) => {
    try {
      setIsLoading(true)
      const user = await authAction()
      const token = await user.user.getIdToken()

      const loginResp = await clientFetch('auth/login', { method: 'POST', data: { token } })

      if (!loginResp.ok) {
        const data = await loginResp.json()
        throw new Error(data.message)
      }

      const profileResp = await clientFetch('profiles')
      const next = searchParams.get('next')

      if (profileResp.ok) {
        const profile = await profileResp.json()
        if (profile) {
          return router.push(next || '/account', { scroll: false })
        }
      }
      return router.push(next ? `/complete-profile?next=${next}` : '/complete-profile', { scroll: false })
    } catch (error: any) {
      setAuthError(FIREBASE_ERRORS[error.code] || error.message)
      setIsLoading(false)
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
      <LoadingScreen show={isLoading} />

      {authError && <Alert color="danger">{authError}</Alert>}

      <SocialAuthProviders onClick={handlePopupSignIn} />

      <form className="grid grid-cols-1 gap-4" onSubmit={formik.handleSubmit}>
        <Input
          type="text"
          label="Email address"
          name="email"
          errorMessage={formik.errors.email}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Input
          type={isVisible ? 'text' : 'password'}
          label="Password"
          name="password"
          errorMessage={formik.errors.password}
          value={formik.values.password}
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <EyeOff className="text-default-400 pointer-events-none h-5" />
              ) : (
                <Eye className="text-default-400 pointer-events-none h-5" />
              )}
            </button>
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <div className="my-6 text-center text-xs leading-5 opacity-75">
          <span>
            By clicking '{actionText}', you agree to our{' '}
            <a href="#" className="text-primary-600">
              Terms of Use
            </a>{' '}
            and our{' '}
            <a href="#" className="text-primary-600">
              Privacy Policy
            </a>
            .
          </span>
        </div>

        <Button type="submit">{actionText}</Button>
      </form>
    </>
  )
}

export default AuthForm
