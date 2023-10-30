import React from 'react'
import { Inbox } from 'react-feather'
import Card from '../../components/Card'
import { useNotification } from '@/components/contexts/NotificationContext'

const NotificationEmpty: React.FC = () => {
  const { notifications, loading } = useNotification()

  const isLoadingOrNotEmpty = loading || notifications.length !== 0

  if (isLoadingOrNotEmpty) return null

  return (
    <Card className="mb-3" forceBodyClassName="px-4 py-16">
      <div className="mb-4 flex animate-pulse justify-center">
        <Inbox className="h-28 w-28 md:h-32 md:w-32" strokeWidth={0.5} />
      </div>
      <p className="mx-auto mb-6 max-w-lg text-center text-lg font-light tracking-wider">
        You currently have no notifications. As you interact more with our platform, important updates and messages will appear here.
      </p>
    </Card>
  )
}

export default NotificationEmpty
