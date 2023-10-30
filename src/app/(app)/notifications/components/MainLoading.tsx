import React from 'react'
import { NotificationItemSkeleton } from './NotificationItem'
import TitleBar from '../../components/TitleBar'

const MainLoading: React.FC = () => {
  return (
    <>
      <TitleBar isLoading className="mb-3" />

      <ul className="grid grid-cols-1 gap-3" role="list">
        {Array.from(Array(4).keys()).map((i) => (
          <NotificationItemSkeleton key={i} />
        ))}
      </ul>
    </>
  )
}

export default MainLoading
