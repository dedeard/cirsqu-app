import { BASE_API_URL } from '@/constants/config'

type BodyType = Record<string, unknown> | FormData | undefined

export default function clientFetch(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: BodyType) {
  const url = `${BASE_API_URL}/${endpoint}`

  // Default headers
  const headers: HeadersInit = {}

  let requestBody: BodyInit | undefined

  // Add JSON content type header if not FormData
  if (!(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
    if (body) {
      requestBody = JSON.stringify(body)
    }
  } else {
    requestBody = body
  }

  const options: RequestInit = {
    method,
    headers,
    credentials: 'include',
    body: requestBody,
  }

  return fetch(url, options)
}
