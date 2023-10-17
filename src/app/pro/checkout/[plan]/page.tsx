import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function Page({ params }: { params: { plan: string } }) {
  redirect('/pro/checkout?plan=' + params.plan)
}
