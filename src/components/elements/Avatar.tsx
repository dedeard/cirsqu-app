'use client'
import { storageUrl } from '@/utils/firebase'
import { Avatar as BaseAvatar, AvatarProps, Badge } from '@nextui-org/react'
import React from 'react'

type PropTypes = AvatarProps & { name: string; file?: string; premium?: boolean }

const Avatar: React.FC<PropTypes> = ({ premium, alt, name, file, src, showFallback, ...props }) => {
  return (
    <Badge disableOutline content="PRO" size="sm" isInvisible={!premium} color="primary" className="font-semibold">
      <BaseAvatar alt={alt || name} name={name} src={file ? storageUrl(file) : src} showFallback {...props} />
    </Badge>
  )
}

export default Avatar
