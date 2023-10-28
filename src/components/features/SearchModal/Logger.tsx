import React from 'react'

const Logger: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="border-b border-divider bg-content2 px-3 dark:border-transparent dark:bg-content3">
      <span className="flex h-7 items-center text-xs leading-none">{children}</span>
    </div>
  )
}

export default Logger
