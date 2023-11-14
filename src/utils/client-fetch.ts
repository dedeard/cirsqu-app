import { BASE_API_URL } from '@/constants/config'
import { auth } from './firebase'

const clientFetch: Fetch = async (path, { data, ...init } = {}) => {
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

export default clientFetch
