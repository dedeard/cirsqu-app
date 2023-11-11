import SidebarProfile from '@/components/features/Sidebar/SidebarProfile'
import SidebarLinks from '@/components/features/Sidebar/SidebarLinks'

const links = [
  { href: '/', text: 'Back to Home' },
  { href: '/account/edit-profile', text: 'Edit Profile' },
  { href: '/account/password', text: 'Password' },
  { href: '/account/linked-accounts', text: 'Linked Accounts' },
  { href: '/account/subscription', text: 'Subscription' },
]

const Sidebar: React.FC = () => {
  return (
    <aside className="w-full md:mb-0 md:w-64 md:pr-3">
      <SidebarProfile isFlat />
      <SidebarLinks links={links} />
    </aside>
  )
}

export default Sidebar
