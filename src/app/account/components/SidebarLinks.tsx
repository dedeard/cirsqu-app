import React from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SidebarLinks: React.FC = () => {
  const links = [
    { href: '/account/personal-info', text: 'Personal Information' },
    { href: '/account/password', text: 'Password' },
    { href: '/account/notifications', text: 'Notifications' },
    { href: '/account/linked-accounts', text: 'Linked Accounts' },
    { href: '/account/subscription', text: 'Subscription' },
  ]
  return (
    <div className="border bg-white">
      {links.map((link) => (
        <SidebarLink key={link.href} {...link} />
      ))}
    </div>
  )
}

const SidebarLink: React.FC<{ href: string; text: string }> = ({ href, text }) => {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        active && 'border-primary-600 bg-gray-100',
        !active && 'border-transparent',
        'relative flex w-full border-l-4 p-3 text-sm font-semibold hover:bg-gray-100',
      )}
    >
      {text}
    </Link>
  )
}

export default SidebarLinks
