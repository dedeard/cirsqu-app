'use client'
import { Card, CardProps, CardHeader } from '@nextui-org/react'
import cn from 'classnames'

type PanelPropTypes = {
  title: string
} & CardProps

const Panel: React.FC<PanelPropTypes> = ({ title, className, children, ...props }) => {
  return (
    <Card shadow="none" className={cn(className, 'border border-divider dark:border-transparent')} {...props}>
      <CardHeader className="bg-content2/50 px-5">
        <h1 className="text-lg md:text-xl">
          <span className="uppercase leading-loose md:tracking-widest">{title}</span>
        </h1>
      </CardHeader>
      {children}
    </Card>
  )
}

export default Panel
