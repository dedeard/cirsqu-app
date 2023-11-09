'use client'
import React from 'react'
import { useAuth } from '@/components/contexts/AuthContext'
import { useNotification } from '@/components/contexts/NotificationContext'
import DeleteConfirm from '@/components/elements/DeleteConfirm'
import Spinner from '@/components/svg/Spinner'
import TitleBar from '../../components/TitleBar'
import NotificationItem from './NotificationItem'
import NotificationEmpty from './NotificationEmpty'
import MainLoading from './MainLoading'

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
          <button
            type="button"
            disabled={markAllLoading}
            className="hoverable-green relative h-8 rounded-lg px-3 text-xs disabled:text-transparent"
            onClick={markAllAsRead}
          >
            Mark all as read
            {markAllLoading && (
              <Spinner height={16} width={16} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 stroke-neutral-900" />
            )}
          </button>
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
