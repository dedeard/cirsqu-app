import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_ONLY_API_KEY } from '@/constants/config'
import { Indexes, SearchOptions, SearchResponse } from '@/types/algolia'

interface Options extends SearchOptions {
  index: Indexes
  cache?: RequestCache
  next?: NextFetchRequestConfig
}

const search: <T>(options: Options) => Promise<SearchResponse<T>> = async ({ index, cache, next, ...options }) => {
  const response = await fetch(`https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${index}/query`, {
    method: 'POST',
    headers: {
      'X-Algolia-API-Key': ALGOLIA_SEARCH_ONLY_API_KEY,
      'X-Algolia-Application-Id': ALGOLIA_APP_ID,
    },
    body: JSON.stringify(options),
    cache,
    next,
  })

  const data = await response.json()
  if (!response.ok) {
    throw data
  }

  return data
}

export default search
