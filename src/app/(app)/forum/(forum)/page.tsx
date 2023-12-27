import Link from 'next/link'
import Tab from './components/Tab'

export default function ForumPage({ searchParams }: { searchParams: { tag?: string } }) {
  return (
    <div>
      <Tab tag={searchParams.tag} />
    </div>
  )
}
