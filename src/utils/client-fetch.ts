import { BASE_API_URL } from '@/constants/config'
import { auth } from './firebase'

interface IRequestInit extends RequestInit {
  data?: Record<string, unknown>
}

export default async function clientFetch(path: string, { data, ...init }: IRequestInit = {}) {
  let headers: HeadersInit = {}
  if (data) {
    headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(data)
  }

  const user = auth.currentUser
  if (user) {
    const token = await user.getIdToken()
    headers.Authorization = `Bearer ${token}`
  }

  return fetch(`${BASE_API_URL}/${path}`, { ...init, headers })
}
