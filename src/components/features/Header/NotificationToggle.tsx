import React from 'react'
import Link from 'next/link'
import { Bell } from 'react-feather'
import { Badge, Button } from '@nextui-org/react'
import { useNotification } from '@/components/contexts/NotificationContext'

const NotificationToggle: React.FC = () => {
  const { unreadCount } = useNotification()
  return (
    <Badge disableOutline isInvisible={unreadCount <= 0} content={unreadCount} size="sm" color="danger" className="font-semibold">
      <Button aria-label="Notifications" href="/notifications" isIconOnly className="relative" variant="flat" radius="full" as={Link}>
        <Bell size="1em" />
      </Button>
    </Badge>
  )
}

export default NotificationToggle
