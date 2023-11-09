import React from 'react'
import { Inbox } from 'react-feather'
import { useNotification } from '@/components/contexts/NotificationContext'

const NotificationEmpty: React.FC = () => {
  const { notifications, loading } = useNotification()

  if (loading || notifications.length !== 0) return null

  return (
    <div className="mb-3 rounded-lg border border-neutral-200 bg-neutral-200/30 px-4 py-16 dark:border-neutral-800 dark:bg-neutral-800/30">
      <div className="mb-4 flex animate-pulse justify-center">
        <Inbox className="h-28 w-28 md:h-32 md:w-32" strokeWidth={0.5} />
      </div>
      <p className="mx-auto mb-6 max-w-lg text-center text-lg font-light tracking-wider">
        You currently have no notifications. As you interact more with our platform, important updates and messages will appear here.
      </p>
    </div>
  )
}

export default NotificationEmpty
