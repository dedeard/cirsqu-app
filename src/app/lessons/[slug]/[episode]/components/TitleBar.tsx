import React from 'react'
import { ArrowLeft } from 'react-feather'
import Link from 'next/link'

const TitleBar: React.FC<{ title: string; slug: string }> = ({ title, slug }) => {
  return (
    <div className="border-divider border-b py-1 xl:px-8">
      <div className="container flex items-center justify-between px-3">
        <Link href={`/lessons/${slug}`} className="group flex items-center">
          <ArrowLeft className="block pr-3 opacity-60 transition-all group-hover:-translate-x-2" size={32} />
          <span>{title}</span>
        </Link>
      </div>
    </div>
  )
}

export default TitleBar
