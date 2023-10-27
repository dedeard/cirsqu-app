'use client'
import React from 'react'
import { Skeleton } from '@nextui-org/react'
import Card from './Card'

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
    <Card className={className} forceBodyClassName="px-4 py-3">
      <div className="flex h-12 items-center justify-between">
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-1/4 rounded-medium md:w-1/2" />
            <Skeleton className="h-8 w-24 rounded-medium" />
          </>
        ) : (
          <>
            <TitleAs className="text-xl leading-none md:text-2xl">{title}</TitleAs>
            {children}
          </>
        )}
      </div>
    </Card>
  )
}

export default TitleBar
