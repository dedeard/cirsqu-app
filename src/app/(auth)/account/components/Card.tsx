'use client'
import { Card as NCard, CardProps, CardHeader } from '@nextui-org/react'

type CardPropTypes = {
  title: string
} & CardProps

const Card: React.FC<CardPropTypes> = ({ title, children, ...props }) => {
  return (
    <NCard {...props}>
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
