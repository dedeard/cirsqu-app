import React from 'react'
import cn from 'classnames'
import { Chip, Listbox, ListboxItem, Skeleton } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/contexts/AuthContext'

type LinkType = {
  href: string
  text: string
  badge?: {
    color: string
    text: number
  }
}

const baseLinks: LinkType[] = [
  { href: '/', text: 'Home' },
  { href: '/lessons', text: 'Lessons' },
  { href: '/subjects', text: 'Subjects' },
  { href: '/pro', text: 'Premium' },
]

const SidebarLinks: React.FC = () => {
  const pathname = usePathname()
  const { user, initLoading } = useAuth()
  const [links, setLinks] = React.useState<(LinkType | null)[]>(baseLinks)

  React.useEffect(() => {
    if (!initLoading && user) {
      setLinks([
        ...baseLinks,
        null,
        { href: '/histories', text: 'Histories' },
        { href: '/collections', text: 'Collections' },
        { href: '/notifications', text: 'Notifications', badge: { color: 'danger', text: 9 } },
        { href: '/account', text: 'My Account' },
      ])
    } else if (!initLoading && !user) {
      setLinks([...baseLinks, null, { href: '/sign-in', text: 'Sign In' }, { href: '/sign-up', text: 'Sign Up' }])
    } else {
      setLinks(baseLinks)
    }
  }, [initLoading, user])

  return (
    <>
      <Listbox aria-label="Sidebar links" className="p-0 pb-5" as="nav">
        {links.map((link, i) => {
          const active = pathname === link?.href
          if (!link) {
            return <ListboxItem key={i} as="span" className="pointer-events-none !bg-transparent p-2" textValue="spacer" />
          }
          return (
            <ListboxItem
              key={link.href}
              href={link.href}
              as={Link}
              className={cn(
                active && '!bg-content1 shadow-medium',
                'rounded-medium p-3 data-[hover=true]:bg-content2/80 dark:data-[hover=true]:bg-content1',
              )}
              endContent={
                link.badge && (
                  <Chip size="sm" color={link.badge.color as any} className="absolute right-3 h-5">
                    <span className="text-xs font-bold">{link.badge.text}</span>
                  </Chip>
                )
              }
            >
              {link.text}
            </ListboxItem>
          )
        })}
      </Listbox>
      {initLoading && (
        <div className="pb-5">
          {Array.from(Array(3).keys()).map((i) => (
            <div key={i} className="mb-1 flex h-11 items-center justify-center rounded-medium bg-content2/50 px-3 dark:bg-content1/50">
              <Skeleton className="h-4 flex-1 rounded-medium" />
              <Skeleton className="ml-2 h-4 w-8 rounded-medium" />
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default SidebarLinks
