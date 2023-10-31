import type { Metadata } from 'next'
import LinkedAccounts from './components/LinkedAccounts'

export const metadata: Metadata = {
  title: 'Linked Accounts - CIRSQU',
  description:
    'Manage your linked accounts here. Connect or disconnect your CIRSQU account with other services for seamless integration and convenience. Your accounts, your control!',
}

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-3">
      <LinkedAccounts />
    </div>
  )
}
