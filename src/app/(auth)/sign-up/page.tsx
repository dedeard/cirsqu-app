import type { Metadata } from 'next'
import AuthForm from '../components/AuthForm'
import Heading from '../components/elements/Heading'

export const metadata: Metadata = {
  title: 'Join CIRSQU - Embark on Your Coding Adventure',
  description:
    'Start your journey to coding mastery with CIRSQU! Register to access a vast array of screencasts and lessons, designed to equip developers of all proficiency levels. Your path to becoming a coding expert starts here!',
}

export default function SignUpPage() {
  return (
    <>
      <Heading>Create a New Account</Heading>
      <AuthForm action="sign-up" />
    </>
  )
}
