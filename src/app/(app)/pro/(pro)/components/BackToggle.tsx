'use client'
import React from 'react'
import cn from 'classnames'
import { ArrowLeftCircle } from 'react-feather'
import { useRouter } from 'next/navigation'

const BackToggle: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter()
  return (
    <button type="button" className={cn(className, 'absolute block p-6')} aria-label="Back toggle" onClick={() => router.back()}>
      <ArrowLeftCircle />
    </button>
  )
}

export default BackToggle
