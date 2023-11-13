import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_ONLY_API_KEY } from '@/constants/config'
import { GetObjectsOptions, GetObjectsResponse, Indexes } from '@/types/algolia'

interface Options extends GetObjectsOptions {
  index: Indexes
  objectIDs: string[]
  cache?: RequestCache
  next?: NextFetchRequestConfig
}

const getObjects: <T>(options: Options) => Promise<GetObjectsResponse<T>> = async ({ index, objectIDs, cache, next, ...options }) => {
  const request = objectIDs.map((objectID) => ({ indexName: index, objectID }))

  const response = await fetch(`https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/*/objects`, {
    method: 'POST',
    headers: {
      'X-Algolia-API-Key': ALGOLIA_SEARCH_ONLY_API_KEY,
      'X-Algolia-Application-Id': ALGOLIA_APP_ID,
    },
    body: JSON.stringify({ request, ...options }),
    cache,
    next,
  })

  const data = await response.json()
  if (!response.ok) {
    throw data
  }

  return data
}

export default getObjects
