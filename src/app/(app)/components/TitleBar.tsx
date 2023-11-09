import React from 'react'
import cn from 'classnames'

type PropTypes = {
  title?: string
  titleAs?: 'h1' | 'h2' | 'h3' | 'div'
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
}

const TitleBar: React.FC<PropTypes> = ({ title, titleAs, isLoading, className, children }) => {
  const TitleAs = titleAs || 'h2'

  return (
    <div
      className={cn(
        className,
        'rounded-lg border border-neutral-200 bg-neutral-200/30 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-800/30',
      )}
    >
      <div className="flex h-12 items-center justify-between">
        {isLoading ? (
          <>
            <span className="skeleton h-8 w-1/4 rounded-lg md:w-1/2" />
            <span className="skeleton h-8 w-24 rounded-lg" />
          </>
        ) : (
          <>
            <TitleAs className="text-xl leading-none md:text-2xl">{title}</TitleAs>
            {children}
          </>
        )}
      </div>
    </div>
  )
}

export default TitleBar
