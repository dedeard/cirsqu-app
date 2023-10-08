import Card from '../components/Card'
import BasicInfoForm from './BasicInfoForm'

export default function PersonalInfoPage() {
  return (
    <Card title="Basic Information" className="lg:max-w-3xl">
      <BasicInfoForm />
    </Card>
  )
}
