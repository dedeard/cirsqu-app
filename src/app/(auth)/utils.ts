import { getAuthData } from '@/utils/server-fetch'
import { redirect } from 'next/navigation'
import 'server-only'

type Params = {
  searchParams?: { next?: string }
}

const base = async ({ searchParams }: Params) => {
  const { user, profile } = await getAuthData()
  let next = searchParams?.next || '/account'
  if (profile) {
    return redirect(next)
  }
  return user
}

export const authPageRedirect = async (params: Params) => {
  if (await base(params)) {
    return redirect(`/complete-profile${params.searchParams?.next ? '?next=' + params.searchParams.next : ''}`)
  }
}

export const completeProfilePageRedirect = async (params: Params) => {
  const user = await base(params)
  if (!user) {
    return redirect(`/sign-in${params.searchParams?.next ? '?next=' + params.searchParams.next : ''}`)
  }

  return user
}
