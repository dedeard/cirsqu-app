import serverFetch from '@/utils/server-fetch'
import Wrapper from './Wrapper'

export default async function Page(props: { searchParams: { plan: string } }) {
  const res = await serverFetch(`products`, { cache: 'no-cache' })
  const data = await res.json()

  return <Wrapper products={data} />
}
