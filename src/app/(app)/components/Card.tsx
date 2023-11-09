'use client'
import React from 'react'
import { Card as BaseCard, CardBody, CardProps } from '@nextui-org/react'
import cn from 'classnames'

type PropTypes = {
  href?: string
  forceBodyClassName?: string
} & CardProps

const Card: React.FC<PropTypes> = ({ children, className, forceBodyClassName, ...props }) => {
  return (
    <BaseCard className={cn(className, 'border-divider group border bg-opacity-75 dark:border-transparent')} shadow="none" {...props}>
      <CardBody className={cn(forceBodyClassName || 'overflow-hidden p-3 md:p-6')}>{children}</CardBody>
    </BaseCard>
  )
}

export default Card
