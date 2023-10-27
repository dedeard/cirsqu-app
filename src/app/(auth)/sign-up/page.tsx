import AuthForm from '../components/AuthForm'
import Heading from '../components/elements/Heading'

export default function SignUpPage() {
  return (
    <>
      <Heading>Create a New Account</Heading>
      <AuthForm action="sign-up" />
    </>
  )
}
