import React from 'react'
import cn from 'classnames'
import Label from './Label'
import Avatar from '@/components/elements/Avatar'
import fileValidation from '@/utils/file-validator'
import { Button } from '@nextui-org/react'

type InputAvatarProps = React.InputHTMLAttributes<HTMLInputElement> & {
  file?: File | null
  label: string
  errorMessage?: string
  avatar?: string
  nickname: string
  onFileChange?: (file: File | null) => void
  onValidationError?: (errorMessage: string) => void
}

export const InputAvatar: React.FC<InputAvatarProps> = ({
  file,
  errorMessage,
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
      <div className={cn(errorMessage && 'mb-2', 'transition-spacing mt-2 flex items-center lg:mt-0')}>
        <Avatar name={props.nickname} src={previewImage || avatar} className="mr-3 block h-12 w-12" />
        <Button as="label" variant="flat">
          Change
          <input
            id={props.name}
            type="file"
            aria-hidden="true"
            className="hidden"
            accept={allowedMimeTypes.join(', ')}
            onChange={handleFileChange}
            {...props}
          />
        </Button>
        {!!file && (
          <Button variant="flat" type="button" color="danger" className="ml-2" onClick={handleReset}>
            Reset
          </Button>
        )}
      </div>
      <div className="text-tiny text-danger">{errorMessage}</div>
    </Label>
  )
}
