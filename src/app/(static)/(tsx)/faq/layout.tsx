import Wrapper from '../../components/Wrapper'

interface FAQLayoutProps {
  children: React.ReactNode
}

export default function FAQLayout({ children }: FAQLayoutProps) {
  return (
    <Wrapper
      title="Frequently Asked Questions"
      content="Welcome to CIRSQU's FAQ page. Here, you'll find answers to common questions about our services."
    >
      {children}
    </Wrapper>
  )
}
