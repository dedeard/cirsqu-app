'use client'
import React from 'react'
import { Button, Skeleton, Spinner } from '@nextui-org/react'
import { Bell, Check, X } from 'react-feather'
import moment from 'moment'
import cn from 'classnames'
import Avatar from '@/components/elements/Avatar'
import Card from '../../components/Card'
import useNotificationItem from '../hooks/useNotificationItem'

type PropTypes = {
  notification: INotification
  setDeleteQueue: (collectionId: string | null) => void
}

const NotificationItem: React.FC<PropTypes> = ({ notification, setDeleteQueue }) => {
  const { user, message, markLoading, readLoading, markAsRead, read } = useNotificationItem(notification)

  return (
    <li className="relative" role="listitem rounded">
      {readLoading && (
        <div className="absolute bottom-0 left-0 right-0 top-0 z-30 flex items-center justify-center rounded-medium bg-background/20 backdrop-blur">
          <Spinner size="lg" />
        </div>
      )}

      <div className="absolute right-3 top-3 z-20 flex gap-1">
        {!notification.readAt && (
          <Button
            type="button"
            aria-label="Delete button"
            isIconOnly
            color="success"
            size="sm"
            radius="full"
            variant="faded"
            isLoading={markLoading}
            onClick={markAsRead}
          >
            {!markLoading && <Check className="h-[1.3em] w-[1.3em]" />}
          </Button>
        )}
        <Button
          type="button"
          aria-label="Delete button"
          isIconOnly
          color="danger"
          size="sm"
          radius="full"
          variant="faded"
          onClick={() => setDeleteQueue(notification.notificationId)}
        >
          <X className="h-[1.3em] w-[1.3em]" />
        </Button>
      </div>
      <Card
        className={cn(!notification.readAt && 'bg-primary-100 dark:bg-primary-50/50', 'w-full')}
        isHoverable
        isPressable
        forceBodyClassName="flex flex-row gap-2 p-4"
        onClick={read}
      >
        <div>
          {user && <Avatar name={user.name} file={user.avatar} premium={user.premium} className="h-10 w-10" />}

          {!user && (
            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-divider">
              <Bell size={18} />
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex h-10 flex-col justify-center">
            <span className="block text-sm">
              {user?.name || 'System Notification'} {user && <span className="text-xs text-primary">@{user.username}</span>}
            </span>
            <span className="block text-xs opacity-75">{moment(notification.createdAt.toDate()).fromNow()}</span>
          </div>
          <p className="text-sm opacity-75">{message}</p>
        </div>
      </Card>
    </li>
  )
}

export const NotificationItemSkeleton: React.FC = () => {
  return (
    <li className="relative" role="listitem">
      <div className="absolute right-3 top-3 z-20 flex gap-1">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Card forceBodyClassName="flex flex-row gap-2 p-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex h-10 flex-col justify-center gap-1">
            <Skeleton className=" h-4 w-36 rounded-medium" />
            <Skeleton className="h-3 w-20 rounded-medium" />
          </div>
          <Skeleton className="h-5 w-11/12 rounded-medium md:w-3/4 lg:w-1/2" />
        </div>
      </Card>
    </li>
  )
}

export default NotificationItem
