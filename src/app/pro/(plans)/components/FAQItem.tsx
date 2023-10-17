'use client'
import React, { useState } from 'react'
import { ArrowDownCircle, ArrowUpCircle } from 'react-feather'

type FAQItemProps = {
  question: string
  defaultOpen?: boolean
} & React.HTMLAttributes<HTMLParagraphElement>

const FAQItem: React.FC<FAQItemProps> = ({ question, defaultOpen, children, ...props }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  return (
    <div className="py-6">
      <button type="button" className="flex w-full items-start justify-between text-left" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-lg text-white">{question}</span>
        <span className="ml-6 flex items-center py-1 text-gray-400">
          {isOpen ? <ArrowUpCircle className="h-6 w-6" /> : <ArrowDownCircle className="h-6 w-6" />}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 pr-12">
          <p className="text-gray-400" {...props}>
            {children}
          </p>
        </div>
      )}
    </div>
  )
}

export default FAQItem
