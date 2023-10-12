import React from 'react'
import Avatar from '@/components/elements/Avatar'
import SidebarLinks from './SidebarLinks'
import { timestampToDate } from '@/utils/firestore'
import { useAuthRequired } from '@/components/contexts/AuthRequiredContext'
import { Card, CardBody, CardFooter } from '@nextui-org/react'

const Sidebar: React.FC = () => {
  const { profile } = useAuthRequired()
  return (
    <aside className="mb-3 w-full md:mb-0 md:w-64 md:pr-3">
      <Card className="mb-3">
        <CardBody>
          <div className="flex  flex-col items-center justify-center pt-5 text-center">
            <div className="mb-3 h-24 w-24 rounded-full border ">
              <Avatar name={profile.name} size="lg" className="block h-full w-full rounded-full" />
            </div>
            <h3 className="mb-1 w-full truncate text-xl font-semibold capitalize leading-none">{profile.name}</h3>
            <p className="w-full truncate leading-none text-gray-700">@{profile.username}</p>
          </div>
        </CardBody>
        <CardFooter className="bg-content2">
          <span className="block w-full text-center text-xs">Joined {timestampToDate(profile.createdAt)?.fromNow()}</span>
        </CardFooter>
      </Card>

      <SidebarLinks />
    </aside>
  )
}

export default Sidebar
