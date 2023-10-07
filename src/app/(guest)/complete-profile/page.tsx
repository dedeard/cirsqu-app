import { getUserData } from '@/utils/server-fetch'
import Heading from '../components/elements/Heading'
import { redirect } from 'next/navigation'
import CreateProfileForm from '../components/CreateProfileForm'

export default async function Home() {
  const user = await getUserData()
  if (!user) {
    return redirect('/account')
  }

  return (
    <div className="p-10 pt-14">
      <Heading>Complete Your Profile</Heading>
      <p className="my-6 text-center text-sm leading-5 text-gray-700">
        To ensure a secure and personalized experience, please complete your profile before proceeding to the app. This information will be
        used solely for identification purposes.
      </p>
      <CreateProfileForm user={user} />
    </div>
  )
}
