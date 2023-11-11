import type { Metadata } from 'next'
import Google from '@/components/svg/Google'
import Facebook from '@/components/svg/Facebook'
import Github from '@/components/svg/Github'
import Panel from '../components/Panel'
import LinkedAccountToggle from './components/LinkedAccountToggle'

export const metadata: Metadata = {
  title: 'Linked Accounts - CIRSQU',
}

export default function LinkedAccountsPage() {
  const providers: { id: 'facebook.com' | 'github.com' | 'google.com'; icon: React.ReactNode }[] = [
    {
      id: 'google.com',
      icon: <Google width="1.5rem" height="1.5rem" />,
    },
    {
      id: 'facebook.com',
      icon: <Facebook width="1.5rem" height="1.5rem" />,
    },
    {
      id: 'github.com',
      icon: <Github width="1.5rem" height="1.5rem" />,
    },
  ]
  return (
    <Panel title="Linked Accounts">
      <ul className="p-3 md:px-5">
        {providers.map((provider) => (
          <li key={provider.id} className="flex border-b border-neutral-200 last:border-b-0 dark:border-neutral-800 ">
            <div className="flex h-16 items-center pr-3 md:pr-5">{provider.icon}</div>
            <div className="flex h-16 flex-1 items-center capitalize">{provider.id.split('.')[0]}</div>
            <div className="flex h-16 items-center">
              <LinkedAccountToggle id={provider.id} />
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  )
}
