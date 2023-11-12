import { useState } from 'react'
import toast from 'react-hot-toast'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { useRouter } from '@/components/contexts/ProgressBarContext'

const getRecurringMessage = (status: string, plan: string) => {
  switch (status) {
    case 'incomplete':
      return `Uh-oh, it looks like your recurring payment for the ${plan} subscription didn't go through. Please check your payment settings.`
    case 'incomplete_expired':
      return `Your recurring payment for the ${plan} subscription has expired. Let's renew it for uninterrupted service!`
    case 'past_due':
      return `We noticed your recurring payment for the ${plan} subscription is past due. Could you please look into it?`
    case 'active':
      return `Great news! Your ${plan} subscription is active and ready to use. Enjoy!`
    case 'canceled':
      return `We're sorry to see you go. Your ${plan} subscription has been canceled. If you change your mind, we're always here!`
    case 'unpaid':
      return `Looks like there's an unpaid balance on your ${plan} subscription. Please make the payment at the earliest.`
    default:
      return "We encountered an unknown status with your subscription. We'll look into it and get back to you soon!"
  }
}

const getLifetimeMessage = (status: string, plan: string) => {
  switch (status) {
    case 'requires_payment_method':
      return `Looks like we need a payment method for your ${plan} subscription. Could you please provide one?`
    case 'requires_confirmation':
      return `We're all set to activate your ${plan} subscription, but we need your confirmation first.`
    case 'requires_action':
      return `Hold tight! Your ${plan} subscription requires a small action from your side.`
    case 'processing':
      return `Your ${plan} subscription is being processed. We'll update you soon!`
    case 'requires_capture':
      return `Just a moment! We need to capture the payment for your ${plan} subscription.`
    case 'canceled':
      return `We're sorry to see you go. Your ${plan} subscription has been canceled.`
    case 'succeeded':
      return `Hurrah! Your transaction for the ${plan} membership was successful. Welcome aboard!`
    default:
      return "Hmm, we encountered an unknown status. We'll look into it!"
  }
}

const useNotificationItem = (notification: INotification) => {
  const router = useRouter()

  const [markLoading, setMarkLoading] = useState(false)
  const [readLoading, setReadLoading] = useState(false)

  const user = notification.user
  const notificationRef = doc(db, 'notifications', notification.notificationId)

  let message: string = ''
  switch (notification.type) {
    case 'reply':
      message = `Hey, good news! ${user?.name} has just replied to your comment. Let's see what they said!`
      break
    case 'like':
      message = `Woohoo! ${user?.name} liked your comment. Your thoughts are getting appreciated!`
      break
    case 'subscription.recurring':
      message = getRecurringMessage(notification.data?.status, notification.data?.plan)
      break
    case 'subscription.lifetime':
      message = getLifetimeMessage(notification.data?.status, notification.data?.plan)
      break
    default:
      message = `Hmm, we encountered an unknown notification. We'll look into it!`
      break
  }

  const markAsRead = async () => {
    if (notification.readAt) return
    setMarkLoading(true)
    try {
      await updateDoc(notificationRef, { readAt: serverTimestamp() })
    } catch (err: any) {
      toast.error(err.message)
      setMarkLoading(false)
    }
  }

  const read = async () => {
    let path = ''
    switch (notification.type) {
      case 'reply':
      case 'like':
        setReadLoading(true)
        await updateDoc(notificationRef, { readAt: serverTimestamp() })
        path = notification.data?.path + '/#comment-section'
        break
      case 'subscription.recurring':
      case 'subscription.lifetime':
        setReadLoading(true)
        await updateDoc(notificationRef, { readAt: serverTimestamp() })
        path = '/account/subscription'
        break
    }

    router.push(path)
  }

  return { message, user, markLoading, readLoading, markAsRead, read }
}

export default useNotificationItem
