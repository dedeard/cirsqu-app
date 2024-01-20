import Avatar from '@/components/elements/Avatar'
import React from 'react'

type PropTypes = {
  name: string
  username: string
  avatar?: string
}

const AuthorCard: React.FC<PropTypes> = ({ name, username, avatar }) => {
  return (
    <div className="mb-3 w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200/30 dark:border-neutral-800 dark:bg-neutral-800/30">
      <div className="p-3">
        <div className="flex flex-col items-center justify-center pb-3 pt-6">
          <a href="#" className="m-auto flex rounded-full">
            <Avatar name={name} src={avatar} size={96} className="h-24 w-24 bg-neutral-300 dark:bg-neutral-700" />
          </a>
        </div>
        <h4 className="truncate text-center text-lg font-semibold uppercase">
          <a href="#">{name}</a>
        </h4>
        <div className="mb-3 truncate text-center text-sm opacity-60">
          <a href="#">{'@' + username}</a>
        </div>
      </div>
      <div className="bg-neutral-200/30 p-2 dark:bg-neutral-800/30">
        <p className="text-center text-xs">This question was created by {name}</p>
      </div>
    </div>
  )
}

export default AuthorCard
