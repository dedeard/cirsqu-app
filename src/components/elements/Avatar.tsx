import { storageUrl } from '@/utils/firebase'
import { Avatar as BaseAvatar, AvatarProps } from '@nextui-org/react'
import React from 'react'

const Avatar: React.FC<AvatarProps & { name: string; file?: string }> = ({ alt, name, file, src, showFallback, ...props }) => {
  return <BaseAvatar alt={alt || name} name={name} src={file ? storageUrl(file) : src} showFallback {...props} />
}

export default Avatar
