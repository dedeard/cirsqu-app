import AuthForm from '../components/AuthForm'
import Heading from '../components/elements/Heading'
import { authPageRedirect } from '../utils'

export default async function Page(params: any) {
  await authPageRedirect(params)

  return (
    <>
      <Heading>Create a New Account</Heading>
      <AuthForm action="sign-up" />
    </>
  )
}
