import type { Metadata } from 'next'
import fs from 'fs/promises'
import Markdown from 'react-markdown'
import Wrapper from '../components/Wrapper'

export const metadata: Metadata = {
  title: 'CIRSQU Terms of Service - Know Your Rights and Responsibilities',
  description:
    "Our Terms of Service govern the use of CIRSQU's services and products. We encourage you to read them carefully to understand your rights and responsibilities as a user of our platform. Your use of our services indicates your acceptance of these terms.",
  openGraph: {
    title: 'CIRSQU Terms of Service - Know Your Rights and Responsibilities',
    description:
      "Our Terms of Service govern the use of CIRSQU's services and products. We encourage you to read them carefully to understand your rights and responsibilities as a user of our platform. Your use of our services indicates your acceptance of these terms.",
    url: '/terms-of-service',
  },
  alternates: {
    canonical: '/terms-of-service',
  },
}

export default async function TermsOfServicePage() {
  const content = await fs.readFile('content/markdown/terms-of-service.md')
  return (
    <Wrapper
      title="Terms of Service"
      content="Welcome to CIRSQU. By using our services, you agree to these terms. Please read them carefully."
    >
      <Markdown>{content.toString()}</Markdown>
    </Wrapper>
  )
}
