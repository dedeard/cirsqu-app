import React from 'react'
import cn from 'classnames'
import { Chip, Skeleton } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export type SidebarLinkPropTypes = {
  href?: string
  text?: string
  badge?: {
    color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | undefined
    text: number
  }
}

const SidebarLink: React.FC<SidebarLinkPropTypes> = ({ text, href, badge, ...props }) => {
  const pathname = usePathname()
  const active = pathname === href

  if (!href) {
    return <div className="w-full p-2" />
  }

  return (
    <Link
      href={href}
      className={cn(
        active && 'border-divider !bg-content1/75 dark:border-transparent',
        !active && 'border-transparent',
        'flex h-10 w-full items-center rounded-medium border px-3 hover:bg-content2/75 dark:hover:bg-content1/75',
      )}
    >
      <span className="block flex-1">{text}</span>
      {badge && (
        <Chip size="sm" color={badge.color} className="h-5">
          <span className="text-xs font-semibold">{badge.text}</span>
        </Chip>
      )}
    </Link>
  )
}

export const SidebarLinkSkeleton: React.FC = () => (
  <div className="flex h-10 w-full items-center rounded-medium bg-content2/50 px-3 dark:bg-content1/50">
    <Skeleton className="h-4 flex-1 rounded-medium" />
    <Skeleton className="ml-2 h-4 w-8 rounded-medium" />
  </div>
)

export default SidebarLink
