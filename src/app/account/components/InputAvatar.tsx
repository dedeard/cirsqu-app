import { useRef, useState } from 'react'
import cn from 'classnames'
import { AlertCircle } from 'react-feather'
import Avatar from '@/components/elements/Avatar'
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

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif']
const MAX_SIZE = 3 // MB

const validateFile = (file?: File) => {
  if (!file) return false
  const { size, type } = file
  const fileSizeInKB = size / 1024

  if (fileSizeInKB > MAX_SIZE * 1024) {
    return `File size should be within ${MAX_SIZE}MB`
  }

  if (!ALLOWED_MIME_TYPES.includes(type)) {
    return `Invalid file type. Please choose one of the following types: ${ALLOWED_MIME_TYPES.join(', ')}`
  }

  return true
}

const InputAvatar: React.FC<InputAvatarProps> = ({ file, error, label, avatar, type, onFileChange, onValidationError, ...props }) => {
  const [previewImage, setPreviewImage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const result = validateFile(file)
    if (result === true) {
      const reader = new FileReader()
      reader.onload = (event) => setPreviewImage(event.target?.result as string)
      reader.readAsDataURL(file!)
      onValidationError?.('')
      onFileChange?.(file || null)
    } else {
      onValidationError?.(result || '')
      resetFile()
    }
  }

  const resetFile = () => {
    setPreviewImage('')
    onValidationError?.('')
    onFileChange?.(null)
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
            accept={ALLOWED_MIME_TYPES.join(', ')}
            onChange={handleFileChange}
            {...props}
          />

          {!!file && (
            <button
              type="button"
              className="hoverable-red ml-3 h-9 items-center justify-center rounded-lg px-4 text-sm"
              onClick={resetFile}
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

export default InputAvatar
