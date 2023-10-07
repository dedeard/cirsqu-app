import React from 'react'

interface AvatarProps {
  name: string
  photoUrl?: string
  className?: string
}

const Avatar: React.FC<AvatarProps> = ({ name, photoUrl, className }) => {
  if (photoUrl) {
    return <img alt={name} src={photoUrl} className={className} />
  }

  const parts = name.split(/[ -]/)
  let initials = ''

  for (const part of parts) {
    initials += part[0]
  }

  if (initials.length > 3 && /[A-Z]/.test(initials)) {
    initials = initials.replace(/[a-z]+/g, '')
  }

  initials = initials.substring(0, 2).toUpperCase()

  let fontSize = 30
  if (initials.length === 2) {
    fontSize = 27
  }

  const translateY = fontSize / 3

  return (
    <svg viewBox="0 0 60 60" className={className}>
      <title>{name}</title>
      <rect className="fill-primary-100" x={0} y={0} width={60} height={60} />
      <text
        className="fill-primary-600"
        x="50%"
        y="50%"
        transform={`translate(0 ${translateY})`}
        textAnchor="middle"
        fontFamily="Roboto, sans-serif"
        fontWeight={700}
        fontSize={fontSize}
      >
        {initials}
      </text>
    </svg>
  )
}

export default Avatar
