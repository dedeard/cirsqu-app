import { redirect } from 'next/navigation'

export default function Page({ params }: { params: { plan: string } }) {
  redirect('/pro/checkout?plan=' + params.plan)
}
