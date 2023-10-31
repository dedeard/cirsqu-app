'use client'
import React, { useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, runTransaction, serverTimestamp, where } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { useProfiles } from './ProfilesContext'
import toast from 'react-hot-toast'

interface NotificationContextProps {
  notifications: INotification[]
  loading: boolean
  markAllLoading: boolean
  deleteLoading: boolean
  unreadCount: number
  markAllAsRead: () => Promise<void>
  deleteNotification: (notificationId: string) => Promise<void>
}

const NotificationContext = React.createContext<NotificationContextProps>({
  notifications: [],
  loading: true,
  markAllLoading: false,
  deleteLoading: false,
  unreadCount: 0,
  markAllAsRead: async () => {},
  deleteNotification: async () => {},
})

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const { fetchProfiles } = useProfiles()
  const [loading, setLoading] = useState(true)
  const [markAllLoading, setMarkAllLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [notifications, setNotifications] = useState<INotification[]>([])
  const unreadCount = notifications.filter((el) => !el.readAt).length

  const markAllAsRead = async () => {
    setMarkAllLoading(true)
    try {
      await runTransaction(db, async (transaction) => {
        for (const notification of notifications) {
          if (!notification.readAt) {
            transaction.update(doc(db, 'notifications', notification.notificationId), { readAt: serverTimestamp() })
          }
        }
      })
      toast.success('Success fully marked all to read successfully!')
    } catch (error: any) {
      toast.error(error.message)
    }
    setMarkAllLoading(false)
  }

  const deleteNotification = async (notificationId: string) => {
    setDeleteLoading(true)
    try {
      await deleteDoc(doc(db, 'notifications', notificationId))
      toast.success('Notification deleted successfully!')
    } catch (error: any) {
      toast.error(error.message)
    }
    setDeleteLoading(false)
  }

  useEffect(() => {
    if (!user) return

    const q = query(collection(db, 'notifications'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'))
    return onSnapshot(q, async (snapshot) => {
      const notifications = snapshot.docs.map((doc) => ({ notificationId: doc.id, ...doc.data() }) as INotification)

      const profileIds: string[] = []
      for (const item of notifications) {
        if (item.data?.userId) profileIds.push(item.data.userId)
      }
      const profiles = await fetchProfiles(profileIds)
      setNotifications([
        ...notifications.map((el) => {
          return {
            ...el,
            user: profiles.find(({ objectID }) => objectID === el.data?.userId),
          }
        }),
      ])

      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <NotificationContext.Provider
      value={{ loading, markAllLoading, deleteLoading, notifications, unreadCount, markAllAsRead, deleteNotification }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)
