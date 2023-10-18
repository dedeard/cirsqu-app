import BasicInfo from './components/BasicInfo'
import EmailAddress from './components/EmailAddress'

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-3">
      <BasicInfo />
      <EmailAddress />
    </div>
  )
}