import React from 'react'
import FAQItem from '@/components/elements/FAQItem'

const FAQs: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-neutral-200 dark:divide-neutral-800">
      <h2 className="mb-8 text-center text-2xl tracking-wider md:text-3xl">Frequently asked questions</h2>
      <FAQItem defaultOpen question="What does a premium membership give me?">
        Completely unlimited access to everything! Once you're signed up, you'll be able to watch the entire library of content, and all
        future content.
        <br />
        Oh, and you also get access to course resources, full source code, high quality episode video downloads and the ability to
        participate in course discussions.
      </FAQItem>
      <FAQItem question="How secure is my payment information?">
        Your payment information is secure. We use Stripe for payment processing, a service known for its high standard of security. We
        don't store your payment information on our servers.
      </FAQItem>
      <FAQItem question="Can I cancel?">
        Yes! If you no longer want your membership to renew, you can cancel it directly from your account area. We don't make it difficult,
        by design.
      </FAQItem>
    </div>
  )
}

export default FAQs
