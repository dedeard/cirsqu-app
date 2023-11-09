import React from 'react'
import Link from 'next/link'
import { Bell } from 'react-feather'
import { useNotification } from '@/components/contexts/NotificationContext'

const NotificationToggle: React.FC = () => {
  const { unreadCount } = useNotification()
  return (
    <Link
      aria-label="Notifications"
      href="/notifications"
      className="hoverable-default relative flex h-10 w-10 items-center justify-center rounded-full border text-sm"
    >
      <Bell size="1em" />
      <span className="absolute right-0 top-0 z-10 block min-w-[1rem] whitespace-nowrap rounded-full bg-red-600 px-1 py-0 text-center text-[0.625rem] font-semibold leading-4 text-white empty:hidden">
        {unreadCount || ''}
      </span>
    </Link>
  )
}

export default NotificationToggle
