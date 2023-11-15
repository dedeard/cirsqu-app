import type { Metadata } from 'next'
import AuthForm from '../components/AuthForm'
import Action from '../components/elements/Action'
import Divider from '../components/elements/Divider'
import Heading from '../components/elements/Heading'

export const metadata: Metadata = {
  title: 'Sign In to CIRSQU - Your Gateway to Coding Mastery',
  description:
    'Unlock a world of coding wisdom with CIRSQU! Sign in to access a trove of comprehensive screencasts and lessons, meticulously crafted for developers of all skill levels. Your coding journey begins here!',
  openGraph: {
    title: 'Sign In to CIRSQU - Your Gateway to Coding Mastery',
    description:
      'Unlock a world of coding wisdom with CIRSQU! Sign in to access a trove of comprehensive screencasts and lessons, meticulously crafted for developers of all skill levels. Your coding journey begins here!',
    url: '/sign-in',
  },
  alternates: {
    canonical: '/sign-in',
  },
}

export default function SignInPage() {
  return (
    <>
      <Heading>Login to Your Account</Heading>
      <AuthForm action="sign-in" />
      <Divider text="or" />
      <Action href="/reset-password-email">Forgot your password?</Action>
    </>
  )
}
