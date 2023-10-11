import { BASE_API_URL } from '@/constants/config'
import { getProfile } from './firestore'
import { cookies } from 'next/headers'
import 'server-only'

interface IRequestInit extends RequestInit {
  data?: Record<string, unknown>
}

export default function appFetch(path: string, { data, ...init }: IRequestInit = {}) {
  let headers: HeadersInit = {}
  if (data) {
    headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(data)
  }

  const session = cookies().get('session')?.value

  if (session) {
    headers = {
      ...headers,
      Cookie: `session=${session}`,
    }
  }

  return fetch(`${BASE_API_URL}/${path}`, { ...init, headers })
}

export async function getUserData(): Promise<IUser | null> {
  const response = await appFetch(`auth/user-data`, { cache: 'no-store' })

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
