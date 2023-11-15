import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: `/${process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET}/**`,
      },
    ],
  },
  experimental: {
    webpackBuildWorker: true,
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
})

export default withMDX(nextConfig)
