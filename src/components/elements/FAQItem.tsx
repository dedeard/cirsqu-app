'use client'
import classNames from 'classnames'
import React, { useState } from 'react'
import { ChevronRight } from 'react-feather'

type FAQItemProps = {
  question: string
  defaultOpen?: boolean
} & React.HTMLAttributes<HTMLParagraphElement>

const FAQItem: React.FC<FAQItemProps> = ({ question, defaultOpen, children, ...props }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  return (
    <div className="py-6">
      <button type="button" className="flex w-full items-start justify-between text-left" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-foreground text-lg">{question}</span>
        <span className="text-foreground-600 ml-6 flex items-center py-1">
          <ChevronRight className={classNames(isOpen && 'rotate-90', 'h-6 w-6 transition-all')} />
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 pr-12">
          <p className="text-foreground-600" {...props}>
            {children}
          </p>
        </div>
      )}
    </div>
  )
}

export default FAQItem
