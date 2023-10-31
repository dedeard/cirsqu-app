import type { Metadata } from 'next'
import Heading from '../components/elements/Heading'
import CreateProfileForm from '../components/CreateProfileForm'

export const metadata: Metadata = {
  title: 'Complete Your CIRSQU Profile - Personalize Your Learning Experience',
  description:
    'Complete your profile to tailor your CIRSQU experience! Providing more information allows us to customize your learning path, ensuring you get the most out of our vast library of coding lessons. Enhance your learning journey with us today!',
}

export default function CompleteProfilePage() {
  return (
    <>
      <Heading>Complete Your Profile</Heading>
      <p className="my-6 text-center text-sm leading-5 text-gray-700 dark:text-gray-300">
        To ensure a secure and personalized experience, please complete your profile before proceeding to the app. This information will be
        used solely for identification purposes.
      </p>

      <CreateProfileForm />
    </>
  )
}
