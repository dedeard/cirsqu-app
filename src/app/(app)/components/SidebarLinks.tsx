import React from 'react'
import cn from 'classnames'
import { Chip, Listbox, ListboxItem, Spacer } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const SidebarLinks: React.FC = () => {
  const pathname = usePathname()
  const links = [
    { href: '/', text: 'Home' },
    { href: '/lesssons', text: 'Lessons' },
    { href: '/subjects', text: 'Subjects' },
    { href: '/collections', text: 'Collections' },
    null,
    { href: '/histories', text: 'Histories' },
    { href: '/notifications', text: 'Notifications', badge: { color: 'danger', text: 7 } },
    { href: '/pro', text: 'Premium' },
    { href: '/account', text: 'My Account' },
  ]

  return (
    <Listbox aria-label="Sidebar links" className="p-0 pb-5" as="nav">
      {links.map((link, i) => {
        const active = pathname === link?.href
        return (
          <ListboxItem
            key={i}
            href={link?.href}
            as={link ? Link : 'span'}
            className={
              link
                ? cn(
                    active && '!bg-content1 shadow-medium',
                    'rounded-medium p-3 data-[hover=true]:bg-content2/80 dark:data-[hover=true]:bg-content1',
                  )
                : 'cursor-default bg-transparent data-[hover=true]:bg-transparent'
            }
          >
            {link?.text}
            {link?.badge && (
              <Chip size="sm" color={link.badge.color as any} className="absolute right-3 h-5">
                <span className="text-xs font-bold">{link.badge.text}</span>
              </Chip>
            )}
          </ListboxItem>
        )
      })}
    </Listbox>
  )
}

export default SidebarLinks
