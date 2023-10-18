import AuthForm from '../components/AuthForm'
import Action from '../components/elements/Action'
import Divider from '../components/elements/Divider'
import Heading from '../components/elements/Heading'

export default function Page() {
  return (
    <>
      <Heading>Login to Your Account</Heading>
      <AuthForm action="sign-in" />
      <Divider text="or" />
      <Action href="/reset-password-email">Forgot your password?</Action>
    </>
  )
}