import React from 'react'
import Link from 'next/link'
import { Bell } from 'react-feather'

const NotificationToggle: React.FC = () => {
  const count = 1
  return (
    <Link
      href="/notifications"
      className="relative flex h-9 w-9 items-center justify-center rounded-full border bg-gray-100 p-0 text-sm text-gray-700 hover:bg-gray-200"
    >
      <Bell size="0.875rem" />
      <span className="min-w-4 absolute -right-1 -top-1 block h-4 rounded-full bg-red-600 px-1 text-center text-xs leading-4 text-white empty:hidden">
        {count || ''}
      </span>
    </Link>
  )
}

export default NotificationToggle
