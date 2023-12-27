import React from 'react'
import NextLink, { LinkProps } from 'next/link'
import cn from 'classnames'

type LinkPropType = LinkProps & { className?: string }

const Link: React.FC<React.PropsWithChildren<LinkPropType>> = ({ className, ...props }) => {
  return <NextLink className={cn(className, 'hoverable-default flex h-12 items-center rounded-lg border px-3 text-sm')} {...props} />
}

const Tab: React.FC<{ tag?: string }> = ({ tag }) => {
  return (
    <div className="borderbg-neutral-200/30 flex w-full justify-between gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800 dark:bg-neutral-800/30">
      <Link href="/forum" className={!tag ? 'active' : ''}>
        Globals
      </Link>
      {tag && (
        <Link href={`/forum?tag=${tag}`} className="active">
          {'#' + tag}
        </Link>
      )}
      <Link href="/forum/my-questions">My Question</Link>
      <Link href="/forum/rules" className="ml-auto">
        Post Question
      </Link>
    </div>
  )
}

export default Tab
