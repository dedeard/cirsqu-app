import serverFetch from '@/utils/server-fetch'
import { redirect } from 'next/navigation'
import Success from './Success'

export default async function Page({ searchParams }: { searchParams: { session_id?: string } }) {
  const { session_id } = searchParams
  if (!session_id) return redirect('/pro')
  let res = await serverFetch(`checkout-sessions/${session_id}`)
  if (!res.ok) {
    const error = await res.json()
    return redirect(`/pro?error=${error.message}`)
  }

  const { invoice, charge } = await res.json()

  if (!invoice && !charge) throw new Error()

  return <Success invoice={invoice} charge={charge} />
}
