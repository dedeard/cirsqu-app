import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Check, FileText } from 'react-feather'
import serverFetch from '@/utils/server-fetch'

export const revalidate = 7200

export const metadata: Metadata = {
  title: 'CIRSQU Subscription Success - Welcome to Advanced Learning',
  description:
    "Congratulations! You've successfully subscribed to CIRSQU Pro. Prepare to delve into advanced courses, personalized learning paths, and premium support. Thank you for choosing CIRSQU. Your advanced coding journey begins now!",
  robots: 'noindex',
}

export default async function Page({ searchParams }: { searchParams: { session_id?: string } }) {
  const { session_id } = searchParams
  if (!session_id) return redirect('/pro')

  let res = await serverFetch(`checkout-sessions/${session_id}`)

  if (!res.ok) {
    const error = await res.json()
    const errorMessage = error?.message || 'An unknown error occurred.'
    return redirect(`/pro?error=${encodeURIComponent(errorMessage)}`)
  }

  const { invoice, charge } = await res.json()

  if (!invoice && !charge) {
    throw new Error('No invoice or charge found.')
  }

  return (
    <div className="background-animate text-foreground dark flex min-h-screen items-center justify-start bg-gradient-to-br from-black via-slate-950 to-black">
      <div className="container max-w-[500px] px-6 py-14">
        <div className="flex items-center justify-center pb-7 pt-14">
          <span className="relative block  animate-pulse">
            <FileText strokeWidth={1} className="block h-36 w-36" />
            <span className="absolute -bottom-2 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
              <Check className="h-5 w-5" />
            </span>
          </span>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 text-center text-2xl">Thank you for subscribing!</h3>
          <p className="text-center text-sm font-light">
            Visit the subscriptions page to manage your subscriptions. This includes viewing current plans, making edits, and updating your
            subscription preferences.
          </p>
        </div>

        <div className="mx-auto flex max-w-[300px] flex-col gap-3">
          {invoice && (
            <a
              href={invoice.hosted_invoice_url}
              target="_blank"
              className="hoverable-default flex h-10 items-center justify-center rounded-lg border text-sm uppercase"
            >
              View Invoice
            </a>
          )}
          {charge && (
            <a
              href={charge.receipt_url}
              target="_blank"
              className="hoverable-default flex h-10 items-center justify-center rounded-lg border text-sm uppercase"
            >
              See Receipt
            </a>
          )}
          <Link href="/" className="hoverable-blue flex h-10 items-center justify-center rounded-lg text-sm uppercase">
            Return to CIRSQU
          </Link>
        </div>
      </div>
    </div>
  )
}
