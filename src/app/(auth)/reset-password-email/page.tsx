import ForgotForm from '../components/ForgotForm'
import Action from '../components/elements/Action'
import Divider from '../components/elements/Divider'
import Heading from '../components/elements/Heading'

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
