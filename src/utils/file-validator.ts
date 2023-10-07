interface FileValidationOptions {
  allowedMimeTypes?: string[]
  maxSize?: number
  setError?: (error: string) => void
}

export default function fileValidation(file?: File, options?: FileValidationOptions) {
  const { allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'], maxSize = 3, setError } = options || {}

  if (!file) return false

  const fileSizeInKB = file.size / 1024

  if (fileSizeInKB > maxSize * 1024) {
    setError?.(`File size should be within ${maxSize}MB`)
    return false
  }

  if (!allowedMimeTypes.includes(file.type)) {
    setError?.(`Invalid file type. Please choose one of the following types: ${allowedMimeTypes.join(', ')}`)
    return false
  }

  return true
}
