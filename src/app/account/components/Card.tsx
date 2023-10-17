'use client'
import { Card as NCard, CardProps, CardHeader } from '@nextui-org/react'
import classNames from 'classnames'

type CardPropTypes = {
  title: string
} & CardProps

const Card: React.FC<CardPropTypes> = ({ title, className, children, ...props }) => {
  return (
    <NCard shadow="none" className={classNames(className, 'border-small border-divider dark:border-transparent')} {...props}>
      <CardHeader className="bg-content2/50 px-5">
        <h1 className="text-lg md:text-xl">
          <span className="uppercase leading-loose md:tracking-widest">{title}</span>
        </h1>
      </CardHeader>
      {children}
    </NCard>
  )
}

export default Card
