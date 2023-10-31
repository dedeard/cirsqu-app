import { ImageResponse } from 'next/og'
import Logo from '@/components/svg/Logo'

export const runtime = 'edge'

export async function GET() {
  const appName = 'CIRSQU'
  try {
    return new ImageResponse(
      (
        <div tw="flex h-full w-full flex-col items-center justify-center bg-black text-center">
          <div tw="flex items-center justify-center text-center text-blue-600 mb-3">
            <Logo height={120} width={120} />
          </div>
          <div tw="flex text-white pt-8">
            {appName.split('').map((el, i) => (
              <div key={i} tw="mx-3 text-6xl">
                {el}
              </div>
            ))}
          </div>
          <p tw="tracking-widest text-white">Explore our screencasts and enhance your coding skills. Suitable for all skill levels.</p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
