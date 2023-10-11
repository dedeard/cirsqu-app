'use client'
import React from 'react'
import * as yup from 'yup'
import { useRouter, useSearchParams } from 'next/navigation'
import { useFormik } from 'formik'
import LoadingScreen from '../../components/elements/LoadingScreen'
import Alert from './elements/Alert'
import UsernamePicker from './UsernamePicker'
import Button from './elements/Button'
import clientFetch from '@/utils/client-fetch'
import { Input } from '@nextui-org/react'

const schema = {
  name: yup.string().min(3).max(20).required().label('Name'),
}

type PropTypes = {
  user: IUser
}

export const CreateProfileForm: React.FC<PropTypes> = ({ user }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [username, setUsername] = React.useState('')

  const handleFormSubmit = async ({ name }: { name: string }) => {
    try {
      setIsLoading(true)
      const res = await clientFetch('profiles', { method: 'POST', data: { name, username } })

      if (!res.ok) {
        const resData = await res.json()
        throw new Error(resData.message || 'Error creating profile')
      }

      const next = searchParams.get('next')
      return router.push(next || '/account', { scroll: false })
    } catch (error: any) {
      setError(error.message)
      setIsLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: { name: user.displayName || '' },
    onSubmit: handleFormSubmit,
    validationSchema: yup.object().shape(schema),
  })

  return (
    <>
      <LoadingScreen show={isLoading} />

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
