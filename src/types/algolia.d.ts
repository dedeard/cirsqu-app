export type Indexes = 'lessons' | 'subjects' | 'profiles'

export type Hit<THit> = THit & {
  objectID: string
  _highlightResult?: HighlightResult<THit>
  _snippetResult?: SnippetResult<THit>
  _rankingInfo?: RankingInfo
  _distinctSeqID?: number
}

export type ObjectWithObjectID = {
  objectID: string
}

export type SearchOptions = {
  query?: string
  similarQuery?: string
  facetFilters?: string | string[] | Array<string[] | string>
  optionalFilters?: string | string[] | Array<string[] | string>
  numericFilters?: string | string[] | Array<string[] | string>
  tagFilters?: string | string[] | Array<string[] | string>
  sumOrFiltersScores?: boolean
  filters?: string
  page?: number
  hitsPerPage?: number
  offset?: number
  length?: number
  attributesToHighlight?: string[]
  attributesToSnippet?: string[]
  attributesToRetrieve?: string[]
  highlightPreTag?: string
  highlightPostTag?: string
  snippetEllipsisText?: string
  restrictHighlightAndSnippetArrays?: boolean
  facets?: string[]
  maxValuesPerFacet?: number
  facetingAfterDistinct?: boolean
  minWordSizefor1Typo?: number
  minWordSizefor2Typos?: number
  allowTyposOnNumericTokens?: boolean
  disableTypoToleranceOnAttributes?: string[]
  queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone'
  removeWordsIfNoResults?: 'none' | 'lastWords' | 'firstWords' | 'allOptional'
  advancedSyntax?: boolean
  advancedSyntaxFeatures?: Array<'exactPhrase' | 'excludeWords'>
  optionalWords?: string | string[]
  disableExactOnAttributes?: string[]
  exactOnSingleWordQuery?: 'attribute' | 'none' | 'word'
  alternativesAsExact?: Array<'ignorePlurals' | 'singleWordSynonym' | 'multiWordsSynonym'>
  enableRules?: boolean
  ruleContexts?: string[]
  distinct?: boolean | number
  analytics?: boolean
  analyticsTags?: string[]
  synonyms?: boolean
  replaceSynonymsInHighlight?: boolean
  minProximity?: number
  responseFields?: string[]
  maxFacetHits?: number
  percentileComputation?: boolean
  clickAnalytics?: boolean
  personalizationImpact?: number
  enablePersonalization?: boolean
  restrictSearchableAttributes?: string[]
  sortFacetValuesBy?: 'count' | 'alpha'
  typoTolerance?: boolean | 'min' | 'strict'
  aroundLatLng?: string
  aroundLatLngViaIP?: boolean
  aroundRadius?: number | 'all'
  aroundPrecision?: number | Array<{ from: number; value: number }>
  minimumAroundRadius?: number
  insideBoundingBox?: Array<number[]> | string
  insidePolygon?: Array<number[]>
  ignorePlurals?: boolean | string[]
  removeStopWords?: boolean | string[]
  naturalLanguages?: string[]
  getRankingInfo?: boolean
  userToken?: string
  enableABTest?: boolean
  decompoundQuery?: boolean
  relevancyStrictness?: number
  enableReRanking?: boolean
  reRankingApplyFilter?: string | string[] | Array<string[] | string> | null
  queryLanguages?: string[]
  explain?: string[]
}

export type SearchResponse<TObject = {}> = {
  hits: Array<Hit<TObject>>
  page: number
  length?: number
  offset?: number
  nbHits: number
  nbSortedHits?: number
  nbPages: number
  hitsPerPage: number
  processingTimeMS: number
  exhaustiveNbHits: boolean
  exhaustiveFacetsCount?: boolean
  facets?: Record<string, Record<string, number>>
  facets_stats?: Record<
    string,
    {
      min: number
      max: number
      avg: number
      sum: number
    }
  >
  query: string
  queryAfterRemoval?: string
  params: string
  queryID?: string
  message?: string
  aroundLatLng?: string
  automaticRadius?: string
  serverUsed?: string
  index?: string
  indexUsed?: string
  abTestID?: number
  abTestVariantID?: number
  parsedQuery?: string
  userData?: any
  appliedRules?: Array<Record<string, any>>
  explain?: {
    match: {
      alternatives: Array<{
        types: string[]
        words: string[]
        typos: number
        offset: number
        length: number
      }>
    }
    params?: Record<string, any>
    redirect?: {
      index?: RedirectRuleIndexMetadata[]
    }
  }
  appliedRelevancyStrictness?: number
  renderingContent?: Settings['renderingContent']
}

export type GetObjectsOptions = {
  attributesToRetrieve?: string[]
}

export type GetObjectsResponse<TObject> = {
  results: Array<(TObject & ObjectWithObjectID) | null>
}
