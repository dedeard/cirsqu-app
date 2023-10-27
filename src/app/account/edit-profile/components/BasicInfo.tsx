'use client'
import React from 'react'
import * as yup from 'yup'
import { Input, Textarea } from '../../components/Input'
import Button from '../../components/Button'
import { usernameNotExist } from '@/utils/firestore'
import { useFormik } from 'formik'
import { InputAvatar } from '../../components/InputAvatar'
import clientFetch from '@/utils/client-fetch'
import toast from 'react-hot-toast'
import { storageUrl } from '@/utils/firebase'
import { CardBody, CardFooter, Divider } from '@nextui-org/react'
import Panel from '../../components/Panel'
import { useAuth } from '@/components/contexts/AuthContext'

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

export default function BasicInfo() {
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
    // @ts-expect-error
    <Panel as="form" title="Basic Information" className="lg:max-w-3xl" onSubmit={formik.handleSubmit}>
      <CardBody>
        <Input
          label="Name"
          name="name"
          placeholder="Enter your name"
          required
          value={formik.values.name}
          errorMessage={formik.errors.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <Divider className="hidden lg:block" />
        <Input
          label="Username"
          name="username"
          placeholder="Enter your username"
          required
          value={formik.values.username}
          errorMessage={formik.errors.username}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <Divider className="hidden lg:block" />
        <InputAvatar
          label="Avatar"
          name="avatar"
          file={avatar}
          errorMessage={avatarError}
          nickname={profile?.name || ''}
          avatar={storageUrl(profile?.avatar)}
          onFileChange={setAvatar}
          onValidationError={setAvatarError}
        />
        <Divider className="hidden lg:block" />
        <Input
          label="Website"
          name="website"
          placeholder="Ex: https://dedeard.my.id"
          value={formik.values.website}
          errorMessage={formik.errors.website}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <Divider className="hidden lg:block" />
        <Textarea
          label="Bio"
          name="bio"
          placeholder="Tell us about yourself..."
          value={formik.values.bio}
          errorMessage={formik.errors.bio}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </CardBody>
      <Divider />
      <CardFooter>
        <Button type="submit" disabled={isLoading || !!avatarError || Object.keys(formik.errors).length > 0} isLoading={isLoading}>
          Save
        </Button>
      </CardFooter>
    </Panel>
  )
}
