import { redirect } from 'next/navigation'
import serverFetch from '@/utils/server-fetch'

export default async function Page(props: { searchParams: { plan: string } }) {
  const res = await serverFetch(`checkout/session/${props.searchParams.plan}`, { method: 'POST', cache: 'no-cache' })
  const data = await res.json()
  if (res.ok) {
    redirect(data.url)
  } else {
    redirect(`/plans?errors=${data.message}`)
  }
}
