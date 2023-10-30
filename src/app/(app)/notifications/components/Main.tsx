'use client'
import React from 'react'
import NotificationEmpty from './NotificationEmpty'
import MainLoading from './MainLoading'
import TitleBar from '../../components/TitleBar'
import { useAuth } from '@/components/contexts/AuthContext'
import { useNotification } from '@/components/contexts/NotificationContext'
import { Button } from '@nextui-org/react'
import NotificationItem from './NotificationItem'
import DeleteConfirm from '@/components/elements/DeleteConfirm'

const Main: React.FC = () => {
  const { initLoading } = useAuth({
    whenNotAuthed: '/sign-in?next=/notifications',
    whenAuthedProfileNotExists: '/complete-profile?next=/notifications',
  })

  const [deleteQueue, setDeleteQueue] = React.useState<string | null>(null)
  const { loading, deleteLoading, notifications, unreadCount, markAllLoading, markAllAsRead, deleteNotification } = useNotification()

  const handleDeleteNotification = async () => {
    if (!deleteQueue) return
    await deleteNotification(deleteQueue)
    setDeleteQueue(null)
  }

  if (loading || initLoading) return <MainLoading />

  return (
    <>
      <DeleteConfirm
        isOpen={!!deleteQueue}
        isLoading={deleteLoading}
        message="Are you sure you want to delete this notification? Please note that this action cannot be undone."
        onCancel={() => setDeleteQueue(null)}
        onConfirm={handleDeleteNotification}
      />

      <TitleBar title={`Notifications (${notifications.length})`} className="mb-3">
        {unreadCount > 0 && (
          <Button color="success" size="sm" isLoading={markAllLoading} onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </TitleBar>

      <NotificationEmpty />

      <ul className="grid grid-cols-1 gap-3" role="list">
        {notifications.map((notification) => (
          <NotificationItem key={notification.notificationId} notification={notification} setDeleteQueue={setDeleteQueue} />
        ))}
      </ul>
    </>
  )
}

export default Main
