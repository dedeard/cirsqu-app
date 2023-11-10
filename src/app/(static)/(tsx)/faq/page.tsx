import type { Metadata } from 'next'
import FAQItem from '@/components/elements/FAQItem'
import faqs from './faqs'

export const metadata: Metadata = {
  title: 'CIRSQU FAQs - Find Your Answers',
  description:
    'Got questions about CIRSQU? Our FAQ page provides answers to commonly asked questions about our platform, courses, and services. Explore to find the information you need, and embark on your coding journey with confidence!',
  openGraph: {
    title: 'CIRSQU FAQs - Find Your Answers',
    description:
      'Got questions about CIRSQU? Our FAQ page provides answers to commonly asked questions about our platform, courses, and services. Explore to find the information you need, and embark on your coding journey with confidence!',
  },
  alternates: {
    canonical: '/faq',
  },
}

export default function FAQPage() {
  return (
    <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
      {faqs.map(({ question, answer }) => (
        <FAQItem key={question} question={question}>
          {answer}
        </FAQItem>
      ))}
    </div>
  )
}
