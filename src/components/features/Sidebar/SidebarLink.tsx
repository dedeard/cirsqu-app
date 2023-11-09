import React from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export type SidebarLinkPropTypes = {
  href?: string
  text?: string
  badge?: number
}

const SidebarLink: React.FC<SidebarLinkPropTypes> = ({ text, href, badge }) => {
  const pathname = usePathname()
  const active = pathname === href

  if (!href) {
    return <div className="w-full p-2" />
  }

  return (
    <Link
      href={href}
      className={cn(
        active && 'border-neutral-200 bg-neutral-200/30 dark:border-neutral-800 dark:bg-neutral-800/30',
        !active && 'border-transparent hover:border-neutral-200 dark:hover:border-neutral-800',
        'flex h-10 w-full items-center rounded-lg border px-3',
      )}
    >
      <span className="block flex-1 text-sm">{text}</span>
      {!!badge && (
        <span className="block min-w-[1rem] rounded-lg bg-red-600 px-2 text-center text-xs font-semibold leading-5 text-white">
          {badge}
        </span>
      )}
    </Link>
  )
}

export const SidebarLinkSkeleton: React.FC = () => (
  <div className="flex h-10 w-full items-center rounded-lg border border-neutral-200 bg-neutral-200/30 px-3 dark:border-neutral-800 dark:bg-neutral-800/30">
    <span className="skeleton h-4 flex-1 rounded-lg" />
    <span className="skeleton ml-2 h-4 w-8 rounded-lg" />
  </div>
)

export default SidebarLink
