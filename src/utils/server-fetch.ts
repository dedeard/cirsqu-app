import { BASE_API_URL } from '@/constants/config'
import { cookies } from 'next/headers'
import 'server-only'

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
