'use client'
import { Link } from '@nextui-org/react'
import NextLink from 'next/link'

const Action: React.FC<{
  href: string
  children?: React.ReactNode
}> = ({ href, children }) => (
  <div className="text-center">
    <Link href={href} color="primary" size="lg" as={NextLink}>
      {children}
    </Link>
  </div>
)

export default Action
