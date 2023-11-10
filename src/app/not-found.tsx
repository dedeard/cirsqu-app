import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/features/Header'
import SimpleFooter from '@/components/elements/SimpleFooter'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header onlyBrand />

      <div className="m-auto py-10 text-center">
        <h1 className="mb-6 text-8xl font-black">404</h1>
        <h2 className="mb-4 text-xl">Page Not Found.</h2>
        <p className="mb-4 opacity-80">Could not find requested resource</p>
        <Link href="/" className="hoverable-blue inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm">
          Back to Home
        </Link>
      </div>

      <div className="container px-3">
        <span className="mb-6 block h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-800" />

        <SimpleFooter />
      </div>
    </main>
  )
}
