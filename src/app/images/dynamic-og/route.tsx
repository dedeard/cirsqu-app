import { ImageResponse } from 'next/og'
import Logo from '@/components/svg/Logo'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const hasTitle = searchParams.has('title')
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'My default title'

    return new ImageResponse(
      (
        <div tw="flex h-full w-full flex-col bg-black text-center p-[50px] pb-[100px]">
          <div tw="flex items-center text-blue-600">
            <div tw="flex">
              <Logo height={50} width={50} />
            </div>
            <div tw="flex pl-4">
              <div tw="text-3xl tracking-widest text-white">CIRSQU</div>
            </div>
          </div>
          <div tw="flex mx-auto flex-1 items-center text-white pt-8 text-5xl">{title}</div>
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
