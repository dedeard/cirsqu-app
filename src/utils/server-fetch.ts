import { BASE_API_URL } from '@/constants/config'
import { IProfile, IUser } from '@/types'
import { cookies } from 'next/headers'
import 'server-only'
import { getProfile } from './firestore'

export default function serverFetch(endpoint: string | URL, init?: RequestInit) {
  const session = cookies().get('session')?.value

  let url: URL | string
  if (endpoint instanceof URL) {
    url = endpoint
  } else {
    url = `${BASE_API_URL}/${endpoint}`
  }

  const options: RequestInit = init || {}
  if (session) {
    options.headers = {
      Cookie: `session=${session}`,
      ...options.headers,
    }
  }

  return fetch(url, options)
}

export async function getUserData(): Promise<IUser | null> {
  const response = await serverFetch(`auth/user-data`, {
    cache: 'no-store',
  })

  if (response.ok) {
    return response.json()
  }

  return null
}

export async function getAuthData() {
  const user = await getUserData()
  let profile: IProfile | null = null

  if (user) {
    profile = await getProfile(user.uid)
  }

  return { user, profile }
}
