import serverFetch from '@/utils/server-fetch'
import { redirect } from 'next/navigation'
import Success from './Success'

export const dynamic = 'force-dynamic'

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

  return <Success invoice={invoice} charge={charge} />
}
