import { useRef, useState } from 'react'
import cn from 'classnames'
import { AlertCircle } from 'react-feather'
import Avatar from '@/components/elements/Avatar'
import fileValidation from '@/utils/file-validator'
import Label from './Label'

type InputAvatarProps = React.InputHTMLAttributes<HTMLInputElement> & {
  file?: File | null
  label: string
  error?: string
  avatar?: string
  nickname: string
  onFileChange?: (file: File | null) => void
  onValidationError?: (errorMessage: string) => void
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
  const [previewImage, setPreviewImage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

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
      <div className="w-full lg:w-2/3">
        <div className={cn(error && 'mb-2', 'mt-2 flex items-center transition-spacing lg:mt-0')}>
          <Avatar name={props.nickname} src={previewImage || avatar} size={48} className="mr-3 block h-12 w-12" />

          <button
            type="button"
            className="hoverable-default h-9 items-center justify-center rounded-lg border px-4 text-sm"
            onClick={() => inputRef.current?.click()}
          >
            Change
          </button>

          <input
            id={props.name}
            ref={inputRef}
            type="file"
            aria-hidden="true"
            className="hidden"
            accept={allowedMimeTypes.join(', ')}
            onChange={handleFileChange}
            {...props}
          />

          {!!file && (
            <button
              type="button"
              className="hoverable-red ml-3 h-9 items-center justify-center rounded-lg px-4 text-sm"
              onClick={handleReset}
            >
              Reset
            </button>
          )}
        </div>

        {error && (
          <div className="flex items-center rounded-lg bg-red-100 p-2 text-sm">
            <AlertCircle className="block h-6 w-6 text-red-600" />
            <span className="ml-2 block text-neutral-800">{error}</span>
          </div>
        )}
      </div>
    </Label>
  )
}
