import { BASE_API_URL } from '@/constants/config'
import 'server-only'

const serverFetch: Fetch = (path, { data, ...init } = {}) => {
  let headers: HeadersInit = {}
  if (data) {
    headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(data)
  }

  return fetch(`${BASE_API_URL}/${path}`, { ...init, headers })
}

export default serverFetch
