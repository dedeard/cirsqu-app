import Link from 'next/link'
import { ArrowLeft } from 'react-feather'

const TitleBar: React.FC<{ title: string; slug: string }> = ({ title, slug }) => {
  return (
    <div className="border-b border-neutral-200 py-1 dark:border-neutral-800 xl:px-8">
      <div className="container flex items-center justify-between px-3">
        <Link href={`/lessons/${slug}`} className="group flex items-center text-sm">
          <ArrowLeft className="block pr-3 opacity-60 transition-all group-hover:-translate-x-2" size={28} />
          <span>{title}</span>
        </Link>
      </div>
    </div>
  )
}

export default TitleBar
