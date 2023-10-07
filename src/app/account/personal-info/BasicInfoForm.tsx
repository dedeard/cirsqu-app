'use client'
import React from 'react'
import * as yup from 'yup'
import { Input, Textarea } from '../components/elements/Input'
import Button from '../components/elements/Button'
import { usernameNotExist } from '@/utils/firestore'
import { useAuth } from '../components/AuthContext'
import { useFormik } from 'formik'
import storageUrl from '@/utils/storage-url'
import { InputAvatar } from '../components/elements/InputAvatar'
import clientFetch from '@/utils/client-fetch'
import toast from 'react-hot-toast'

const getSchema = (username: string) => ({
  name: yup.string().min(3).max(20).required(),
  bio: yup.string().max(250),
  website: yup.string().url(),
  username: yup
    .string()
    .required()
    .min(6)
    .max(20)
    .test('alphanumeric', 'Username must only contain alphanumeric characters.', (value) => /^[a-zA-Z0-9]*$/.test(value))
    .test('username-unique', 'Username is already taken, please choose another one.', (val) => {
      if (val.toLocaleLowerCase() === username) return true
      return usernameNotExist(val)
    }),
})

const BasicInfoForm: React.FC = () => {
  const { profile } = useAuth()
  const [isLoading, setIsLoading] = React.useState(false)
  const [avatar, setAvatar] = React.useState<File | null>(null)
  const [avatarError, setAvatarError] = React.useState('')

  const handleFormSubmit = async (data: any) => {
    setIsLoading(true)

    try {
      const formData = new FormData()
      Object.keys(data).forEach((key) => {
        if (data[key]) formData.append(key, data[key])
      })
      if (avatar) {
        formData.append('avatar', avatar)
      }

      const response = await clientFetch('profiles', 'PUT', formData)

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Profile update failed. Please try again.')
      }

      setAvatar(null)
      toast.success('Profile updated successfully!')
    } catch (error: any) {
      toast.error(`An error occurred: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: profile.name,
      username: profile.username,
      bio: profile.bio || '',
      website: profile.website || '',
    },
    onSubmit: handleFormSubmit,
    validationSchema: yup.object().shape(getSchema(profile.username)),
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-3">
        <Input
          label="Name"
          name="name"
          required
          value={formik.values.name}
          error={formik.errors.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <span className="block h-px lg:bg-gray-200" />
        <Input
          label="Username"
          name="username"
          required
          value={formik.values.username}
          error={formik.errors.username}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <span className="block h-px lg:bg-gray-200" />
        <InputAvatar
          label="Avatar"
          name="avatar"
          file={avatar}
          error={avatarError}
          nickname={profile.name}
          avatar={storageUrl(profile.avatar)}
          onFileChange={setAvatar}
          onValidationError={setAvatarError}
        />
        <span className="block h-px lg:bg-gray-200" />
        <Input
          label="Website"
          name="website"
          value={formik.values.website}
          error={formik.errors.website}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <span className="block h-px lg:bg-gray-200" />
        <Textarea
          label="Bio"
          name="bio"
          value={formik.values.bio}
          error={formik.errors.bio}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      <div className="border-t p-3">
        <Button type="submit" disabled={isLoading || !!avatarError || Object.keys(formik.errors).length > 0} loading={isLoading}>
          Save
        </Button>
      </div>
    </form>
  )
}

export default BasicInfoForm
