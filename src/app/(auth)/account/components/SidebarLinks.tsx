import React from 'react'
import cn from 'classnames'
import { Card, Listbox, ListboxItem } from '@nextui-org/react'
import { usePathname } from 'next/navigation'

const SidebarLinks: React.FC = () => {
  const pathname = usePathname()
  const links = [
    { href: '/account/personal-info', text: 'Personal Information' },
    { href: '/account/password', text: 'Password' },
    { href: '/account/notifications', text: 'Notifications' },
    { href: '/account/linked-accounts', text: 'Linked Accounts' },
    { href: '/account/subscription', text: 'Membership' },
  ]
  return (
    <Card>
      <>
        <Listbox>
          {links.map((link) => {
            const active = pathname === link.href
            return (
              <ListboxItem
                key={link.href}
                href={link.href}
                className={cn(
                  active && 'bg-content2 text-primary data-[hover=true]:text-primary',
                  'rounded-medium p-3 data-[hover=true]:bg-content2',
                )}
              >
                {link.text}
              </ListboxItem>
            )
          })}
        </Listbox>
      </>
    </Card>
  )
}

export default SidebarLinks
