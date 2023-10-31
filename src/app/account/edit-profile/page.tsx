import type { Metadata } from 'next'
import BasicInfo from './components/BasicInfo'
import EmailAddress from './components/EmailAddress'

export const metadata: Metadata = {
  title: 'Edit Your Profile - CIRSQU',
  description:
    'Personalize your CIRSQU account! Update your profile information, adjust your preferences, and make your learning experience truly your own. Your journey, your way!',
}

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-3">
      <BasicInfo />
      <EmailAddress />
    </div>
  )
}
