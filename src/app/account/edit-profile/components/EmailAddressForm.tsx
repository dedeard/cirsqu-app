'use client'
import { useState } from 'react'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import { auth } from '@/utils/firebase/firebase'
import { useAuth } from '@/components/contexts/AuthContext'
import FIREBASE_ERRORS from '@/constants/firebase-errors'
import { Input } from '../../components/Input'
import Button from '../../components/Button'
import { signInWithEmailAndPassword, updateEmail } from 'firebase/auth'
import HR from '../../components/HR'

const schema = {
  email: yup.string().email().required().label('Email address'),
  password: yup.string().required().label('Current Password'),
}

const EmailAddressForm: React.FC = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

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
    <form onSubmit={formik.handleSubmit}>
      <div className="px-3 md:px-5">
        <Input
          label="Email Address"
          name="email"
          placeholder="Enter your email"
          required
          value={formik.values.email}
          error={formik.errors.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <HR className="hidden lg:block" />
        <Input
          label="Current Password"
          name="password"
          type="password"
          placeholder="Current password"
          required
          value={formik.values.password}
          error={formik.errors.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      <HR />
      <div className="px-3 md:px-5">
        <Button type="submit" disabled={isLoading || Object.keys(formik.errors).length > 0} isLoading={isLoading}>
          Save
        </Button>
      </div>
    </form>
  )
}

export default EmailAddressForm
