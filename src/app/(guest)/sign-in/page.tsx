import AuthForm from '../components/AuthForm'
import AuthTab from '../components/AuthTab'
import Action from '../components/elements/Action'
import Divider from '../components/elements/Divider'
import Heading from '../components/elements/Heading'

export default function Home() {
  return (
    <>
      <AuthTab />
      <div className="p-10">
        <Heading>Login to Your Account</Heading>
        <AuthForm action="sign-in" />
        <Divider text="or" />
        <div style={{ textAlign: 'center' }}>
          <Action href="/reset-password-email">Forgot your password?</Action>
        </div>
      </div>
    </>
  )
}
