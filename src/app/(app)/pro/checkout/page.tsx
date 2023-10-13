import serverFetch from '@/utils/server-fetch'
import Wrapper from './components/Wrapper'

export default async function Page() {
  const res = await serverFetch(`products`, { cache: 'no-cache' })
  const products = (await res.json()) as IProduct[]

  return <Wrapper products={products} />
}
