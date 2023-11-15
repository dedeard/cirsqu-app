import React from 'react'
import Image from 'next/image'
import cn from 'classnames'
import { storageUrl } from '@/utils/firebase/firebase'

type PropTypes = {
  name: string
  src?: string
  file?: string
  premium?: boolean
  size?: number
} & React.HTMLAttributes<HTMLSpanElement>

const Avatar: React.FC<PropTypes> = ({ name, src, file, premium, size = 40, className, ...props }) => {
  const srcUrl = file ? storageUrl(file) : src
  let nickname: string = ''

  if (!srcUrl) {
    let initials: string = ''
    let parts = name.split(/[ -]/)
    for (let i = 0; i < parts.length; i++) {
      if (initials.length >= 2) {
        break // Maximum 2 characters
      }
      let partInitial = parts[i].charAt(0)
      initials += partInitial
    }
    nickname = initials.toUpperCase()
  }

  return (
    <span
      className={cn(className, 'relative flex items-center justify-center rounded-full text-center font-semibold')}
      style={{ height: size, width: size }}
      {...props}
    >
      {srcUrl ? <Image alt={name} height={size} width={size} src={srcUrl} className="block h-full w-full rounded-full" /> : nickname}
      {premium && (
        <span className="absolute bottom-0 left-1/2 z-10 block min-w-[1rem] -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-1 py-0 text-center text-[0.5rem] font-semibold leading-3 text-white">
          PRO
        </span>
      )}
    </span>
  )
}

export default Avatar
