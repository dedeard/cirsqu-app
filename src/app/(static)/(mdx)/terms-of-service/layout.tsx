import Wrapper from '../../components/Wrapper'

export default function TermsOfServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper
      title="Terms of Service"
      content="Welcome to CIRSQU. By using our services, you agree to these terms. Please read them carefully."
    >
      {children}
    </Wrapper>
  )
}
