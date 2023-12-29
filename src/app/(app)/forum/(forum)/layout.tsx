import { RAW_TAGS } from '@/constants/raw-tags'
import Tab from './components/Tab'
import Tags from './components/Tags'

export default function ForumLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 xl:flex-row">
      <div className="pt-3 xl:flex-1">
        <Tab />
        <>{children}</>
      </div>
      <Tags tags={RAW_TAGS} />
    </div>
  )
}
