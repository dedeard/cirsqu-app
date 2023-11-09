'use client'
import React from 'react'
import { Bell, Check, X } from 'react-feather'
import moment from 'moment'
import cn from 'classnames'
import Avatar from '@/components/elements/Avatar'
import Spinner from '@/components/svg/Spinner'
import useNotificationItem from '../hooks/useNotificationItem'

type PropTypes = {
  notification: INotification
  setDeleteQueue: (collectionId: string | null) => void
}

const NotificationItem: React.FC<PropTypes> = ({ notification, setDeleteQueue }) => {
  const { user, message, markLoading, readLoading, markAsRead, read } = useNotificationItem(notification)

  return (
    <li className="relative">
      {readLoading && (
        <div className="bg-background/20 absolute bottom-0 left-0 right-0 top-0 z-30 flex items-center justify-center rounded-lg backdrop-blur">
          <Spinner className="m-auto block h-8 w-8" />
        </div>
      )}

      <div className="absolute right-3 top-3 z-20 flex gap-1">
        {!notification.readAt && (
          <button
            type="button"
            title="Mark as read"
            className="hoverable-default relative flex h-8 w-8 rounded-full border"
            disabled={markLoading}
            onClick={markAsRead}
          >
            {markLoading ? (
              <Spinner className="m-auto block h-4 w-4 text-green-600" />
            ) : (
              <Check className="m-auto block h-4 w-4 text-green-600" />
            )}
          </button>
        )}
        <button
          type="button"
          title="Delete this notification"
          className="hoverable-default flex h-8 w-8 rounded-full border"
          onClick={() => setDeleteQueue(notification.notificationId)}
        >
          <X className="m-auto block h-4 w-4 text-red-600" />
        </button>
      </div>

      <button
        className={cn(
          !notification.readAt && '!bg-blue-600/30 hover:!bg-blue-600/40 dark:!bg-blue-600/10 dark:hover:!bg-blue-600/20',
          'hoverable-default flex w-full flex-row gap-2 rounded-lg border p-4 text-left',
        )}
        onClick={read}
      >
        <div>
          {user && (
            <Avatar
              name={user.name}
              file={user.avatar}
              premium={user.premium}
              size={40}
              className="h-10 w-10 bg-neutral-300/50 dark:bg-neutral-700/50"
            />
          )}

          {!user && (
            <span className="border-divider flex h-10 w-10 items-center justify-center rounded-full border-2">
              <Bell size={18} />
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex h-10 flex-col justify-center">
            <span className="block text-sm">
              {user?.name || 'System Notification'} {user && <span className="text-primary text-xs">@{user.username}</span>}
            </span>
            <span className="block text-xs opacity-75">{moment(notification.createdAt.toDate()).fromNow()}</span>
          </div>
          <p className="text-sm opacity-75">{message}</p>
        </div>
      </button>
    </li>
  )
}

export const NotificationItemSkeleton: React.FC = () => {
  return (
    <li className="relative">
      <div className="absolute right-3 top-3 z-20 flex gap-1">
        <span className="skeleton h-8 w-8 rounded-full" />
        <span className="skeleton h-8 w-8 rounded-full" />
      </div>
      <div className="flex w-full flex-row  gap-2 rounded-lg border border-neutral-200 bg-neutral-200/30 p-4 dark:border-neutral-800 dark:bg-neutral-800/30">
        <span className="skeleton h-10 w-10 rounded-full" />
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex h-10 flex-col justify-center gap-1">
            <span className="skeleton  h-4 w-36 rounded-lg" />
            <span className="skeleton h-3 w-20 rounded-lg" />
          </div>
          <span className="skeleton h-5 w-11/12 rounded-lg md:w-3/4 lg:w-1/2" />
        </div>
      </div>
    </li>
  )
}

export default NotificationItem
