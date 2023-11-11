'use client'
import { useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { signInWithEmailAndPassword, updatePassword } from 'firebase/auth'
import { useAuth } from '@/components/contexts/AuthContext'
import { auth } from '@/utils/firebase'
import FIREBASE_ERRORS from '@/constants/firebase-errors'
import { Input } from '../../components/Input'
import Button from '../../components/Button'
import HR from '../../components/HR'

const schema = {
  new_password: yup.string().min(6).required().label('New Password'),
  password: yup.string().required().label('Current Password'),
}

const PasswordForm: React.FC = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

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
    <form onSubmit={formik.handleSubmit}>
      <div className="px-3 md:px-5">
        <Input
          label="New Password"
          name="new_password"
          type="password"
          placeholder="New password"
          required
          error={formik.errors.new_password}
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

export default PasswordForm
