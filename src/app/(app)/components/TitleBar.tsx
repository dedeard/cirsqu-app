'use client'
import React from 'react'
import cn from 'classnames'
import { Card, CardBody, Skeleton } from '@nextui-org/react'

type PropTypes = {
  title: string
  titleAs?: 'h1' | 'h2' | 'h3' | 'div'
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
}

const TitleBar: React.FC<PropTypes> = ({ title, titleAs, isLoading, className, children }) => {
  const TitleAs = titleAs || 'h1'

  return (
    <Card className={cn(className, 'border border-divider bg-opacity-75 dark:border-transparent')} shadow="none">
      <CardBody className="px-4 py-3">
        <div className="flex h-12 items-center justify-between">
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-1/4 rounded-medium" />
              <Skeleton className="h-10 w-24 rounded-medium" />
            </>
          ) : (
            <>
              <TitleAs className="text-xl uppercase leading-none md:text-2xl md:tracking-widest">{title}</TitleAs>
              {children}
            </>
          )}
        </div>
      </CardBody>
    </Card>
  )
}

export default TitleBar
