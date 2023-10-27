import Wrapper from '../../components/Wrapper'

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper
      title="Privacy Policy"
      content={
        <>
          By using our services, you agree to our privacy terms.
          <span className="block pt-3 text-sm font-semibold">Last Updated: October 27, 2023</span>
        </>
      }
    >
      {children}
    </Wrapper>
  )
}
