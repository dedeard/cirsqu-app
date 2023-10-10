import ForgotForm from '../components/ForgotForm'
import Action from '../components/elements/Action'
import Divider from '../components/elements/Divider'
import Heading from '../components/elements/Heading'
import { authPageRedirect } from '../utils'

export default async function Page(params: any) {
  await authPageRedirect(params)

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
