'use client'
import React from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { usePathname } from 'next/navigation'

const Pagination: React.FC<{ totalPage: number; page: number }> = ({ totalPage, page }) => {
  const pathname = usePathname()
  if (totalPage <= 1) return null

  return (
    <div className="flex">
      {!(page <= 1) && (
        <Link
          className="hoverable-default mr-auto flex items-center rounded-lg border p-3 pr-5"
          href={`${pathname}${page > 2 ? '?page=' + (page - 1) : ''}`}
        >
          <ChevronLeft size={20} className="mr-3" />
          <span>
            Prev <span className="hidden md:inline">Page</span>
          </span>
        </Link>
      )}
      {!(page >= totalPage) && (
        <Link className="hoverable-default ml-auto flex items-center rounded-lg border p-3 pl-5" href={`${pathname}?page=${page + 1}`}>
          <span>
            Next <span className="hidden md:inline">Page</span>
          </span>
          <ChevronRight size={20} className="ml-3" />
        </Link>
      )}
    </div>
  )
}

export default Pagination
