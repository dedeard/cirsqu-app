'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const Tags: React.FC<{ tags: string[] }> = ({ tags }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="xl:w-72">
      <div className="sticky top-16 w-full pb-3 xl:py-3 ">
        <div className="w-full rounded-lg border border-neutral-200 bg-neutral-200/30 p-3 dark:border-neutral-800 dark:bg-neutral-800/30">
          <p className="mb-3 text-lg font-semibold uppercase">Tags</p>
          <ul className="mb-3 flex flex-wrap gap-1">
            {(open ? tags : tags.slice(0, 50)).map((tag) => (
              <li key={tag} className="flex-1">
                <Link
                  href={`/forum?tag=${tag}`}
                  className="hoverable-default block whitespace-nowrap rounded-md border px-2 text-center text-xs leading-5"
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
          <button className="hoverable-default block w-full rounded-lg border p-2 text-sm uppercase" onClick={() => setOpen(!open)}>
            {open ? 'Show Less' : 'Show All Tags'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Tags
