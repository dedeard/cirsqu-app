import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_ONLY_API_KEY } from '@/constants/config'
import { Indexes, ObjectWithObjectID } from '@/types/algolia'

interface Options {
  index: Indexes
  objectID: string
  attributes?: string[]
  cache?: RequestCache
  next?: NextFetchRequestConfig
}

const getObject: <T>(options: Options) => Promise<T & ObjectWithObjectID> = async ({ index, objectID, attributes, cache, next }) => {
  let url = `https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${index}/${objectID}`
  if (attributes) url += `?attributes=${attributes.join(',')}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Algolia-API-Key': ALGOLIA_SEARCH_ONLY_API_KEY,
      'X-Algolia-Application-Id': ALGOLIA_APP_ID,
    },
    cache,
    next,
  })

  const data = await response.json()
  if (!response.ok) {
    throw data
  }

  return data
}

export default getObject
