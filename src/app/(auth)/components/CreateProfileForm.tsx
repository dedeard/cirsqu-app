'use client'
import React from 'react'
import * as yup from 'yup'
import { useRouter, useSearchParams } from 'next/navigation'
import { useFormik } from 'formik'
import Alert from './elements/Alert'
import UsernamePicker from './UsernamePicker'
import Button from './elements/Button'
import clientFetch from '@/utils/client-fetch'
import { Input } from '@nextui-org/react'
import { useAuth } from '@/components/contexts/AuthContext'

const schema = {
  name: yup.string().min(3).max(20).required().label('Name'),
}

export const CreateProfileForm: React.FC = () => {
  const searchParams = useSearchParams()
  const next = searchParams.get('next')

  const { setLoading, user } = useAuth({
    whenNotAuthed: `/sign-in${next ? '?next=' + next : ''}`,
    whenAuthedProfileExists: next || '/account',
  })

  const [error, setError] = React.useState('')
  const [username, setUsername] = React.useState('')

  const handleFormSubmit = async ({ name }: { name: string }) => {
    try {
      setLoading(true)
      const res = await clientFetch('profiles', { method: 'POST', data: { name, username } })

      if (!res.ok) {
        const resData = await res.json()
        throw new Error(resData.message || 'Error creating profile')
      }
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: { name: user?.displayName || '' },
    onSubmit: handleFormSubmit,
    validationSchema: yup.object().shape(schema),
  })

  return (
    <>
      {error && <Alert color="danger">{error}</Alert>}

      {!username ? (
        <UsernamePicker onPicked={setUsername} />
      ) : (
        <>
          <h2 className="mb-3 text-center text-lg uppercase" onClick={() => setUsername('')}>
            Set Your Name
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <Input
              type="text"
              label="Name"
              name="name"
              errorMessage={formik.errors.name}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="my-6">
              <Button type="submit">Complete profile</Button>
            </div>
          </form>
        </>
      )}
    </>
  )
}

export default CreateProfileForm
