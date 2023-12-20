import type { Metadata } from 'next'
import fs from 'fs/promises'
import FAQItem from '@/components/elements/FAQItem'
import Wrapper from '../components/Wrapper'

export const metadata: Metadata = {
  title: 'CIRSQU FAQs - Find Your Answers',
  description:
    'Got questions about CIRSQU? Our FAQ page provides answers to commonly asked questions about our platform, courses, and services. Explore to find the information you need, and embark on your coding journey with confidence!',
  openGraph: {
    title: 'CIRSQU FAQs - Find Your Answers',
    description:
      'Got questions about CIRSQU? Our FAQ page provides answers to commonly asked questions about our platform, courses, and services. Explore to find the information you need, and embark on your coding journey with confidence!',
    url: '/faq',
  },
  alternates: {
    canonical: '/faq',
  },
}

export default async function FAQPage() {
  const data = await fs.readFile('content/json/faq.json')
  const faqs = JSON.parse(data.toString())
  return (
    <Wrapper
      title="Frequently Asked Questions"
      content="Welcome to CIRSQU's FAQ page. Here, you'll find answers to common questions about our services."
    >
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {faqs.map(({ question, answer }: Record<string, string>) => (
          <FAQItem key={question} question={question}>
            {answer}
          </FAQItem>
        ))}
      </div>
    </Wrapper>
  )
}
