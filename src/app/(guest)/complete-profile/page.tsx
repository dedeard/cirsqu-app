import Heading from '../components/elements/Heading'
import CreateProfileForm from '../components/CreateProfileForm'
import { completeProfilePageRedirect } from '../utils'

export default async function Page(params: any) {
  const user = await completeProfilePageRedirect(params)
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
