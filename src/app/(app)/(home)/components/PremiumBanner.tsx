'use client'
import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import FAQs from '@/app/pro/(plans)/components/FAQs'

const PremiumBanner: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  const [hover, setHover] = React.useState(false)

  return (
    <section
      data-hover={hover}
      className={cn(
        className,
        'relative rounded-lg border border-neutral-200 bg-neutral-200/30 p-6 text-neutral-800 data-[hover=true]:border-neutral-300 data-[hover=true]:bg-neutral-200/50 dark:border-neutral-800 dark:bg-neutral-800/30 dark:text-neutral-100 dark:data-[hover=true]:border-neutral-600 dark:data-[hover=true]:bg-neutral-800/50',
      )}
      {...props}
    >
      <div className="flex flex-col items-center justify-center py-10 text-center md:py-12">
        <h2 className="mb-3 text-3xl lg:text-4xl">Unlimited access with a premium membership.</h2>
        <p className="mb-10 max-w-lg font-light md:text-lg">Join thousands of developers improving their skills every day</p>
        <Link
          href="/pro"
          className="hoverable-blue inline-flex h-10 items-center rounded-lg px-6 text-sm"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Discover Our Membership Plans
        </Link>
      </div>
      <div className="mx-auto w-full max-w-7xl pb-6 md:px-6 lg:px-8">
        <FAQs />
      </div>
    </section>
  )
}

export default PremiumBanner
