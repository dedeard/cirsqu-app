import serverFetch from '@/utils/server-fetch'
import { redirect } from 'next/navigation'
import Success from './Success'

export default async function Page({ searchParams }: { searchParams: { session_id?: string } }) {
  const { session_id } = searchParams
  if (!session_id) return redirect('/pro')
  let res = await serverFetch(`checkout-sessions/${session_id}`, { cache: 'no-cache' })
  if (!res.ok) {
    const error = await res.json()
    return redirect(`/pro?error=${error.message}`)
  }
  const session = await res.json()

  let invoice: any
  if (session.mode === 'subscription') {
    res = await serverFetch(`invoices/${session.invoice}`, { cache: 'no-cache' })
    if (!res.ok) {
      const error = await res.json()
      return redirect(`/pro?error=${error.message}`)
    }
    invoice = await res.json()
  }

  return <Success invoice={invoice} />
}
