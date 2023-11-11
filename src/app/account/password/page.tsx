import type { Metadata } from 'next'
import Panel from '../components/Panel'
import PasswordForm from './components/PasswordForm'

export const metadata: Metadata = {
  title: 'Change Your Password - CIRSQU',
}

export default function PasswordPage() {
  return (
    <Panel title="Change Password">
      <PasswordForm />
    </Panel>
  )
}
