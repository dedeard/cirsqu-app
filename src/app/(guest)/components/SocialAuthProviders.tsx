import React from 'react'
import { AuthProvider } from 'firebase/auth'
import Google from '@/app/components/svg/Google'
import Github from '@/app/components/svg/Github'
import Facebook from '@/app/components/svg/Facebook'
import getProviderById from '@/utils/get-provider-by-id'
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
      <div className="mb-4 text-center text-lg font-semibold uppercase text-gray-700">or continue with</div>

      <div className="grid grid-cols-3 gap-4">
        {providers.map((item, index) => (
          <button
            key={index}
            aria-label={item.provider.providerId}
            className="flex cursor-pointer items-center justify-center border border-gray-300 bg-white p-3 transition-shadow hover:shadow"
            onClick={() => handleOnClick(item.provider)}
          >
            {item.icon}
          </button>
        ))}
      </div>

      <Divider text="or" />
    </>
  )
}

export default SocialAuthProviders
