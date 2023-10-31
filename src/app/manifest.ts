import { MetadataRoute } from 'next'
import colors from 'tailwindcss/colors'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CIRSQU',
    short_name: 'CIRSQU',
    description: 'Practical screencasts for developers',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: colors.blue['600'],
    icons: [
      {
        src: '/images/icons/192/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icons/256/icon.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/images/icons/512/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },

      {
        src: '/images/maskable/192/icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/images/maskable/256/icon.png',
        sizes: '256x256',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/images/maskable/512/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
