import React from 'react'
import { Chip, Skeleton } from '@nextui-org/react'
import ResultItem, { ResultItemSkeleton } from './ResultItem'

const Results: React.FC<{ loading?: boolean }> = ({ loading }) => {
  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto py-3">
      <div className="flex flex-wrap gap-3 px-3">
        {!loading && Array.from(Array(20).keys()).map((i) => <Chip key={i}>{i} PHP</Chip>)}
        {loading && Array.from(Array(3).keys()).map((i) => <Skeleton key={i} className="h-7 w-20 rounded-medium" />)}
      </div>
      <ul className="flex flex-col gap-3 px-3">
        {!loading &&
          Array.from(Array(20).keys()).map((i) => (
            <li key={i}>
              <ResultItem />
            </li>
          ))}
        {loading &&
          Array.from(Array(3).keys()).map((i) => (
            <li key={i}>
              <ResultItemSkeleton />
            </li>
          ))}
      </ul>
      {/* <NoResults query="Lorem ipsum dolor sit amet, consectetur adipisicing elit" /> */}
    </div>
  )
}

export default Results
