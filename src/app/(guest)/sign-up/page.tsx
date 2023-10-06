import AuthForm from '../components/AuthForm'
import AuthTab from '../components/AuthTab'
import Heading from '../components/elements/Heading'

export default function Home() {
  return (
    <>
      <AuthTab />
      <div className="p-10">
        <Heading>Create a New Account</Heading>
        <AuthForm action="sign-up" />
      </div>
    </>
  )
}
