'use client'
import React from 'react'
import * as yup from 'yup'
import { Input } from '../../components/Input'
import Button from '../../components/Button'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { CardBody, CardFooter, Divider } from '@nextui-org/react'
import Card from '../../components/Card'
import { useAuth } from '@/components/contexts/AuthContext'
import { auth } from '@/utils/firebase'
import { signInWithEmailAndPassword, updatePassword } from 'firebase/auth'
import FIREBASE_ERRORS from '@/constants/firebase-errors'
import { Eye, EyeOff } from 'react-feather'

const schema = {
  new_password: yup.string().min(6).required().label('New Password'),
  password: yup.string().required().label('Current Password'),
}

export default function Password() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState({ new_password: false, password: false })

  const handleFormSubmit = async (data: { new_password: string; password: string }) => {
    setIsLoading(true)

    try {
      const resp = await signInWithEmailAndPassword(auth, user?.email || '', data.password)
      await updatePassword(resp.user, data.new_password)

      toast.success('Password updated successfully!')
    } catch (error: any) {
      toast.error(FIREBASE_ERRORS[error.code] || `An error occurred: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      new_password: '',
      password: '',
    },
    onSubmit: handleFormSubmit,
    validationSchema: yup.object().shape(schema),
  })

  return (
    // @ts-expect-error
    <Card as="form" title="Change Password" className="lg:max-w-3xl" onSubmit={formik.handleSubmit}>
      <CardBody>
        <Input
          label="New Password"
          name="new_password"
          placeholder="New password"
          required
          errorMessage={formik.errors.new_password}
          type={isVisible.new_password ? 'text' : 'password'}
          endContent={
            <button
              aria-label="Visible password toggle"
              className="focus:outline-none"
              type="button"
              onClick={() => setIsVisible({ ...isVisible, new_password: !isVisible.new_password })}
            >
              {isVisible.new_password ? (
                <Eye className="pointer-events-none  h-4 text-default-400" />
              ) : (
                <EyeOff className="pointer-events-none  h-4 text-default-400" />
              )}
            </button>
          }
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <Divider className="hidden lg:block" />
        <Input
          label="Current Password"
          name="password"
          placeholder="Current password"
          required
          errorMessage={formik.errors.password}
          type={isVisible.password ? 'text' : 'password'}
          endContent={
            <button
              aria-label="Visible password toggle"
              className="focus:outline-none"
              type="button"
              onClick={() => setIsVisible({ ...isVisible, password: !isVisible.password })}
            >
              {isVisible.password ? (
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
    </Card>
  )
}
