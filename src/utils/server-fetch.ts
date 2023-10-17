import { BASE_API_URL } from '@/constants/config'
import 'server-only'

interface IRequestInit extends RequestInit {
  data?: Record<string, unknown>
}

export default function serverFetch(path: string, { data, ...init }: IRequestInit = {}) {
  let headers: HeadersInit = {}
  if (data) {
    headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(data)
  }

  return fetch(`${BASE_API_URL}/${path}`, { ...init, headers })
}
