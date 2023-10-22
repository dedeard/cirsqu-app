'use client'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { ArrowLeft, ArrowRight } from 'react-feather'

const Pagination: React.FC<{ totalPage: number; page: number }> = ({ totalPage, page }) => {
  const pathname = usePathname()
  if (totalPage <= 1) return null

  return (
    <div className="flex justify-between">
      <Button
        size="lg"
        variant="flat"
        className="uppercase"
        as={page <= 1 ? 'span' : Link}
        href={`${pathname}${page > 2 ? '?page=' + (page - 1) : ''}`}
        isDisabled={page <= 1}
        startContent={<ArrowLeft />}
      >
        Prev <span className="hidden md:inline">Page</span>
      </Button>
      <Button
        size="lg"
        variant="flat"
        className="uppercase"
        as={page >= totalPage ? 'span' : Link}
        href={`${pathname}?page=${page + 1}`}
        isDisabled={page >= totalPage}
        endContent={<ArrowRight />}
      >
        Next <span className="hidden md:inline">Page</span>
      </Button>
    </div>
  )
}

export default Pagination
