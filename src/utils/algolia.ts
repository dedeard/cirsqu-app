import algoliasearch from 'algoliasearch'
import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_ONLY_API_KEY } from '@/constants/config'
import 'server-only'

const algoClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_ONLY_API_KEY)

export const lessonIndex = algoClient.initIndex('lessons')

export const subjectIndex = algoClient.initIndex('subjects')

export default algoClient
