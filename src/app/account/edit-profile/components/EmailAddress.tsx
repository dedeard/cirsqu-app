'use client'
import React from 'react'
import * as yup from 'yup'
import { Input } from '../../components/Input'
import Button from '../../components/Button'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { CardBody, CardFooter, Divider } from '@nextui-org/react'
import Panel from '../../components/Panel'
import { useAuth } from '@/components/contexts/AuthContext'
import { auth } from '@/utils/firebase'
import { signInWithEmailAndPassword, updateEmail } from 'firebase/auth'
import FIREBASE_ERRORS from '@/constants/firebase-errors'
import { Eye, EyeOff } from 'react-feather'

const schema = {
  email: yup.string().email().required().label('Email address'),
  password: yup.string().required().label('Current Password'),
}

export default function EmailAddress() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(false)

  const handleFormSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true)

    try {
      const resp = await signInWithEmailAndPassword(auth, user?.email || '', data.password)
      await updateEmail(resp.user, data.email)

      toast.success('EMail address updated successfully!')
    } catch (error: any) {
      toast.error(FIREBASE_ERRORS[error.code] || `An error occurred: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: user?.email || '',
      password: '',
    },
    onSubmit: handleFormSubmit,
    validationSchema: yup.object().shape(schema),
  })

  return (
    // @ts-expect-error
    <Panel as="form" title="Email Address" className="lg:max-w-3xl" onSubmit={formik.handleSubmit}>
      <CardBody>
        <Input
          label="Email Address"
          name="email"
          placeholder="Enter your email"
          required
          value={formik.values.email}
          errorMessage={formik.errors.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <Divider className="hidden lg:block" />
        <Input
          label="Current Password"
          name="password"
          type={isVisible ? 'text' : 'password'}
          placeholder="Current password"
          required
          value={formik.values.password}
          errorMessage={formik.errors.password}
          endContent={
            <button
              aria-label="Visible password toggle"
              className="focus:outline-none"
              type="button"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <Eye className="pointer-events-none  h-4 text-default-400" />
              ) : (
                <EyeOff className="pointer-events-none  h-4 text-default-400" />
              )}
            </button>
          }
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </CardBody>
      <Divider />
      <CardFooter>
        <Button type="submit" disabled={isLoading || Object.keys(formik.errors).length > 0} isLoading={isLoading}>
          Save
        </Button>
      </CardFooter>
    </Panel>
  )
}
