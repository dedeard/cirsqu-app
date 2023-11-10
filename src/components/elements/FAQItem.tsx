'use client'
import React, { useState } from 'react'
import cn from 'classnames'
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
        <span className="text-lg text-neutral-700 dark:text-neutral-300">{question}</span>
        <span className="ml-6 flex items-center py-1">
          <ChevronRight className={cn(isOpen && 'rotate-90', 'h-6 w-6 transition-all')} />
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 pr-12">
          <p className="font-light text-neutral-600 dark:text-neutral-400" {...props}>
            {children}
          </p>
        </div>
      )}
    </div>
  )
}

export default FAQItem
