import 'server-only'
import algoliasearch from 'algoliasearch'
import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_ONLY_API_KEY } from '@/constants/config'

const algoClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_ONLY_API_KEY)

export const lessonIndex = algoClient.initIndex('lessons')

export default algoClient
