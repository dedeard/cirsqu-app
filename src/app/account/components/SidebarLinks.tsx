import React from 'react'
import cn from 'classnames'
import { Listbox, ListboxItem } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const SidebarLinks: React.FC = () => {
  const pathname = usePathname()
  const links = [
    { href: '/', text: 'Back to Home' },
    { href: '/account/edit-profile', text: 'Edit Profile' },
    { href: '/account/password', text: 'Password' },
    // { href: '/account/notifications', text: 'Notifications' },
    { href: '/account/linked-accounts', text: 'Linked Accounts' },
    { href: '/account/subscription', text: 'Subscription' },
  ]
  return (
    <Listbox aria-label="Sidebar links" className="p-0">
      {links.map((link) => {
        const active = pathname === link.href
        return (
          <ListboxItem
            key={link.href}
            href={link.href}
            as={Link}
            classNames={{ title: 'font-bold' }}
            className={cn(active && 'bg-content2 dark:bg-content1', 'rounded-medium p-3 data-[hover=true]:bg-content2')}
          >
            {link.text}
          </ListboxItem>
        )
      })}
    </Listbox>
  )
}

export default SidebarLinks
