import type { Metadata } from 'next'
import ForgotForm from '../components/ForgotForm'
import Action from '../components/elements/Action'
import Divider from '../components/elements/Divider'
import Heading from '../components/elements/Heading'

export const metadata: Metadata = {
  title: 'Reset Your CIRSQU Password - Secure Your Account',
  description:
    'Reset your password to ensure the security of your CIRSQU account. We are committed to providing a safe and secure learning environment for all our users. Follow the instructions in the email to swiftly regain access to your account.',
  openGraph: {
    title: 'Reset Your CIRSQU Password - Secure Your Account',
    description:
      'Reset your password to ensure the security of your CIRSQU account. We are committed to providing a safe and secure learning environment for all our users. Follow the instructions in the email to swiftly regain access to your account.',
    url: '/reset-password-email',
  },
  alternates: {
    canonical: '/reset-password-email',
  },
}

export default function ResetPasswordEmailPage() {
  return (
    <>
      <Heading>Reset Your Password</Heading>
      <ForgotForm />
      <Divider text="or" />
      <Action href="/sign-in">Back to sign in page</Action>
    </>
  )
}
