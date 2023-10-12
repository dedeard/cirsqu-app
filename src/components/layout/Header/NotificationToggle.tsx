import React from 'react'
import Link from 'next/link'
import { Bell } from 'react-feather'
import { Button, Chip } from '@nextui-org/react'

const NotificationToggle: React.FC = () => {
  const count = '9+'
  return (
    <span className="relative">
      <span className="min-w-4 absolute -right-1 -top-1 z-10 block h-4 rounded-full bg-red-600 px-1 text-center text-xs leading-4 text-white empty:hidden">
        {count || ''}
      </span>
      <Button href="/notifications" isIconOnly className="relative" variant="flat" radius="full" as={Link}>
        <Bell size="1em" />
      </Button>
    </span>
  )
}

export default NotificationToggle
