import type { Metadata } from 'next'
import Main from './components/Main'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Notifications - CIRSQU',
  description:
    'Keep track of your CIRSQU journey! Our notification center ensures you never miss an update on your coding lessons, feedback, and interactions. Stay informed, stay ahead!',
}

export default function NotificationsPage() {
  return <Main />
}
