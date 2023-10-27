import FAQItem from '@/components/elements/FAQItem'
import faqs from './faqs'

export default function FAQPage() {
  return (
    <div className="divide-y divide-divider">
      {faqs.map(({ question, answer }) => (
        <FAQItem key={question} question={question}>
          {answer}
        </FAQItem>
      ))}
    </div>
  )
}
