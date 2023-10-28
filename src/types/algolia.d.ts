export type Hit<THit> = THit & {
  readonly objectID: string
  readonly _highlightResult?: HighlightResult<THit>
  readonly _snippetResult?: SnippetResult<THit>
  readonly _rankingInfo?: RankingInfo
  readonly _distinctSeqID?: number
}
