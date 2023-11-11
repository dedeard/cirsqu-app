import type { Metadata } from 'next'
import Panel from '../components/Panel'
import BasicInfoForm from './components/BasicInfoForm'
import EmailAddressForm from './components/EmailAddressForm'

export const metadata: Metadata = {
  title: 'Edit Your Profile - CIRSQU',
}

export default function EditProfilePage() {
  return (
    <div className="grid grid-cols-1 gap-3">
      <Panel title="Basic Information">
        <BasicInfoForm />
      </Panel>
      <Panel title="Email Address">
        <EmailAddressForm />
      </Panel>
    </div>
  )
}
