import React from 'react'

const SectionHeading: React.FC<{ text: string }> = ({ text }) => {
  return (
    <h2 className="relative mb-12 text-4xl">
      <span className="relative before:absolute before:-bottom-4 before:block before:h-2 before:w-3/4 before:rounded-full before:bg-blue-600 before:content-[''] after:absolute after:-bottom-7 after:block after:h-2 after:w-1/2 after:rounded-full after:bg-neutral-500 after:content-['']">
        {text}
      </span>
    </h2>
  )
}

export default SectionHeading
