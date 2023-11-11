'use client'
import { useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import clientFetch from '@/utils/client-fetch'
import { usernameNotExist } from '@/utils/firestore'
import { storageUrl } from '@/utils/firebase'
import { useAuth } from '@/components/contexts/AuthContext'
import Button from '../../components/Button'
import { Input, Textarea } from '../../components/Input'
import { InputAvatar } from '../../components/InputAvatar'
import HR from '../../components/HR'

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
  const [isLoading, setIsLoading] = useState(false)
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarError, setAvatarError] = useState('')

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

      const response = await clientFetch('profiles', { method: 'PUT', body: formData })

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
      name: profile?.name,
      username: profile?.username,
      bio: profile?.bio || '',
      website: profile?.website || '',
    },
    onSubmit: handleFormSubmit,
    validationSchema: yup.object().shape(getSchema(profile?.username || '')),
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="px-3 md:px-5">
        <Input
          label="Name"
          name="name"
          placeholder="Enter your name"
          required
          value={formik.values.name}
          error={formik.errors.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <HR className="hidden lg:block" />
        <Input
          label="Username"
          name="username"
          placeholder="Enter your username"
          required
          value={formik.values.username}
          error={formik.errors.username}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <HR className="hidden lg:block" />
        <InputAvatar
          label="Avatar"
          name="avatar"
          file={avatar}
          error={avatarError}
          nickname={profile?.name || ''}
          avatar={storageUrl(profile?.avatar)}
          onFileChange={setAvatar}
          onValidationError={setAvatarError}
        />
        <HR className="hidden lg:block" />
        <Input
          label="Website"
          name="website"
          placeholder="Ex: https://dedeard.my.id"
          value={formik.values.website}
          error={formik.errors.website}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <HR className="hidden lg:block" />
        <Textarea
          label="Bio"
          name="bio"
          placeholder="Tell us about yourself..."
          value={formik.values.bio}
          error={formik.errors.bio}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      <HR />
      <div className="px-3 md:px-5">
        <Button type="submit" disabled={isLoading || !!avatarError || Object.keys(formik.errors).length > 0} isLoading={isLoading}>
          Save
        </Button>
      </div>
    </form>
  )
}

export default BasicInfoForm
