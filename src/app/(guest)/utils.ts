import { getAuthData } from '@/utils/server-fetch'
import { decodeFromBase64 } from '@/utils/base64'
import { redirect } from 'next/navigation'
import 'server-only'

type Params = {
  searchParams?: { next?: string }
}

const base = async ({ searchParams }: Params) => {
  const { user, profile } = await getAuthData()
  let next = '/account'
  if (searchParams?.next) next = decodeFromBase64(next, next)
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
