import React from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Listbox, ListboxItem } from '@nextui-org/react'
import Link from 'next/link'
import Avatar from '@/components/elements/Avatar'
import { auth } from '@/utils/firebase'

const ProfileDropdown: React.FC<{ profile: IProfile }> = ({ profile }) => {
  const logout = () => {
    auth.signOut()
  }

  return (
    <div className="dropdown-wrapper relative ml-3 h-10 w-10">
      <button role="button" className="block h-10 w-10 rounded-full p-0">
        <Avatar className="h-10 w-10" name={profile.name} premium={profile.premium} file={profile.avatar} />
      </button>
      <div className="dropdown-drop absolute right-0 top-full mt-3 w-60">
        <span className="absolute -top-1 right-2 h-6 w-6 rotate-45 transform rounded bg-primary" />
        <Card>
          <CardHeader className="pb-0 pt-6">
            <div className="flex flex-1 flex-col items-center justify-center">
              <Avatar name={profile.name} file={profile.avatar} isBordered className="m-auto mb-3 block h-24 w-24 rounded-full" />
              <h3 className="text-md capitalized w-full truncate text-center font-semibold">{profile.name}</h3>
              <p className="w-full truncate text-center text-sm">@{profile.username}</p>
            </div>
          </CardHeader>
          <CardBody className="p-3">
            <Listbox className="gap-3" aria-label="Profile dropdown links">
              <ListboxItem
                key="Dasbor-Saya"
                href="/account/edit-profile"
                as={Link}
                classNames={{ title: 'font-semibold' }}
                className="rounded-medium bg-content2 p-2 text-center data-[hover=true]:bg-primary-100/50"
              >
                Edit Profile
              </ListboxItem>
              <ListboxItem
                key="Edit-Profil"
                href="/account/subscription"
                as={Link}
                classNames={{ title: 'font-semibold' }}
                className="rounded-medium bg-content2 p-2 text-center data-[hover=true]:bg-primary-100/50"
              >
                Subscription
              </ListboxItem>
            </Listbox>
          </CardBody>
          <CardFooter className="bg-content2/50">
            <Button color="danger" className="font-semibold" onClick={logout}>
              Sign Out
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default ProfileDropdown