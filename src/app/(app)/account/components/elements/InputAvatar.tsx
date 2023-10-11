import React from 'react'
import cn from 'classnames'
import Label from './Label'
import InputError from '@/app/components/elements/InputError'
import Avatar from '@/app/components/elements/Avatar'
import fileValidation from '@/utils/file-validator'

type InputAvatarProps = React.InputHTMLAttributes<HTMLInputElement> & {
  file?: File | null
  label: string
  error?: string
  avatar?: string
  nickname: string
  onFileChange?: (file: File | null) => void
  onValidationError?: (error: string) => void
}

export const InputAvatar: React.FC<InputAvatarProps> = ({
  file,
  error,
  label,
  avatar,
  type,
  onFileChange,
  onValidationError,
  ...props
}) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
  const [previewImage, setPreviewImage] = React.useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0]
    let isValidFile = fileValidation(file, {
      setError: onValidationError,
      allowedMimeTypes,
      maxSize: 3,
    })
    if (file && isValidFile) {
      const reader = new FileReader()
      reader.onload = (event) => setPreviewImage(event.target?.result as string)
      reader.readAsDataURL(file)
      onValidationError?.('')
      onFileChange?.(file)
    } else {
      setPreviewImage('')
      onFileChange?.(null)
    }
  }

  const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    onValidationError?.('')
    onFileChange?.(null)
    setPreviewImage('')
  }

  return (
    <Label htmlFor={props.name} text={label}>
      <div className={cn(error && 'mb-2', 'mt-2 flex items-center transition-spacing lg:mt-0')}>
        <Avatar name={props.nickname} photoUrl={previewImage || avatar} className="mr-3 block h-14 w-14 rounded-full" />
        <label className="flex h-10 cursor-pointer items-center justify-center border border-gray-200 bg-gray-50 px-4">
          Change
          <input
            id={props.name}
            type="file"
            className="hidden"
            accept={allowedMimeTypes.join(', ')}
            onChange={handleFileChange}
            {...props}
          />
        </label>
        {!!file && (
          <button
            type="button"
            className=" ml-2 flex h-10 cursor-pointer items-center justify-center border border-gray-200 bg-gray-50 px-4"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
      <InputError error={error} />
    </Label>
  )
}
