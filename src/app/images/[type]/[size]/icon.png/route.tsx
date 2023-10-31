import { ImageResponse } from 'next/og'
import Logo from '@/components/svg/Logo'

export const runtime = 'edge'

export async function GET(request: Request, { params }: { params: { type: string; size: string } }) {
  let size = Number(params.size)
  let inner = 80

  if (isNaN(size)) size = 192
  else if (size <= 30) size = 30
  else if (size >= 1024) size = 1024

  if (params.type === 'maskable') inner = 50

  try {
    const { searchParams } = new URL(request.url)
    const hasTitle = searchParams.has('title')
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'My default title'

    return new ImageResponse(
      (
        <div tw="flex h-full w-full items-center justify-center bg-blue-600 text-white">
          <Logo height={`${inner}%`} width={`${inner}%`} />
        </div>
      ),
      {
        width: size,
        height: size,
      },
    )
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
