import type { Metadata } from 'next'
import Wrapper from '../../components/Wrapper'

export const metadata: Metadata = {
  title: 'CIRSQU Terms of Service - Know Your Rights and Responsibilities',
  description:
    "Our Terms of Service govern the use of CIRSQU's services and products. We encourage you to read them carefully to understand your rights and responsibilities as a user of our platform. Your use of our services indicates your acceptance of these terms.",
}

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
