import type { Metadata } from 'next'
import fs from 'fs/promises'
import Markdown from 'react-markdown'
import Wrapper from '../components/Wrapper'

export const metadata: Metadata = {
  title: 'CIRSQU Privacy Policy - Your Privacy is Our Priority',
  description:
    'At CIRSQU, we deeply respect your privacy. Our Privacy Policy outlines how we collect, use, and protect your personal information. We are committed to maintaining the highest levels of privacy and security. Read our policy to understand your rights and our responsibilities.',
  openGraph: {
    title: 'CIRSQU Privacy Policy - Your Privacy is Our Priority',
    description:
      'At CIRSQU, we deeply respect your privacy. Our Privacy Policy outlines how we collect, use, and protect your personal information. We are committed to maintaining the highest levels of privacy and security. Read our policy to understand your rights and our responsibilities.',
    url: '/privacy-policy',
  },
  alternates: {
    canonical: '/privacy-policy',
  },
}

export default async function PrivacyPolicyPage() {
  const content = await fs.readFile('content/markdown/privacy-policy.md')

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
      <Markdown>{content.toString()}</Markdown>
    </Wrapper>
  )
}
