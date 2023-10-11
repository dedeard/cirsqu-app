import React from 'react'
import { AuthProvider } from 'firebase/auth'
import { Button } from '@nextui-org/react'
import Google from '@/components/svg/Google'
import Github from '@/components/svg/Github'
import Facebook from '@/components/svg/Facebook'
import { getProviderById } from '@/utils/firebase'
import Divider from './elements/Divider'

type PropTypes = {
  onClick?: (provider: AuthProvider) => void
}

export const SocialAuthProviders: React.FC<PropTypes> = ({ onClick }) => {
  const providers = [
    {
      provider: getProviderById('google.com'),
      icon: <Google width="1.5rem" height="1.5rem" />,
    },
    {
      provider: getProviderById('facebook.com'),
      icon: <Facebook width="1.5rem" height="1.5rem" />,
    },
    {
      provider: getProviderById('github.com'),
      icon: <Github width="1.5rem" height="1.5rem" />,
    },
  ]

  const handleOnClick = (provider: AuthProvider) => {
    if (onClick) {
      onClick(provider)
    }
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-4 pt-6">
        {providers.map((item, index) => (
          <Button key={index} aria-label={item.provider.providerId} variant="flat" size="lg" onClick={() => handleOnClick(item.provider)}>
            {item.icon}
          </Button>
        ))}
      </div>

      <Divider text="or" />
    </>
  )
}

export default SocialAuthProviders
