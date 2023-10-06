import ForgotForm from '../components/ForgotForm'
import Action from '../components/elements/Action'
import Divider from '../components/elements/Divider'
import Heading from '../components/elements/Heading'

export default function Home() {
  return (
    <div className="p-10 pt-14">
      <Heading>Reset Your Password</Heading>
      <ForgotForm />
      <Divider text="or" />
      <div style={{ textAlign: 'center' }}>
        <Action href="/sign-in">Back to sign in page</Action>
      </div>
    </div>
  )
}
