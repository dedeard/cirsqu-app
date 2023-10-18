'use client'

import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { Check, FileText } from 'react-feather'

const Success: React.FC<{ invoice?: Record<string, any>; charge?: Record<string, any> }> = ({ invoice, charge }) => {
  return (
    <div className="background-animate flex min-h-screen items-center justify-start bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-foreground dark">
      <div className="container max-w-[500px] px-6 py-14">
        <div className="flex items-center justify-center pb-7 pt-14">
          <span className="relative block  animate-pulse">
            <FileText className="block h-32 w-32" />
            <span className="absolute -bottom-2 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-success text-white">
              <Check className="h-5 w-5" />
            </span>
          </span>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 text-center text-2xl font-bold">Thank you for subscribing!</h3>
          <p className="text-center text-sm ">
            Visit the subscriptions page to manage your subscriptions. This includes viewing current plans, making edits, and updating your
            subscription preferences.
          </p>
        </div>

        <div className="mx-auto flex max-w-[300px] flex-col gap-3">
          {invoice && (
            <Button
              as={Link}
              href={invoice.hosted_invoice_url}
              target="_blank"
              variant="bordered"
              fullWidth
              className="font-bold uppercase"
            >
              View Invoice
            </Button>
          )}
          {charge && (
            <Button as={Link} href={charge.receipt_url} target="_blank" variant="bordered" fullWidth className="font-bold uppercase">
              See Receipt
            </Button>
          )}
          <Button as={Link} href="/" color="primary" fullWidth className="font-bold uppercase">
            Return to CIRSQU
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Success