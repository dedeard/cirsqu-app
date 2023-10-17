import React from 'react'
import Link from 'next/link'
import { Bell } from 'react-feather'
import { Badge, Button, Chip } from '@nextui-org/react'

const NotificationToggle: React.FC = () => {
  const count = 0
  return (
    <Badge disableOutline isInvisible={count <= 0} content={count} size="sm" color="danger" className="font-bold">
      <Button href="/notifications" isIconOnly className="relative" variant="flat" radius="full" as={Link}>
        <Bell size="1em" />
      </Button>
    </Badge>
  )
}

export default NotificationToggle
