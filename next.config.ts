import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],  // MDXをページ拡張子として追加
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  images: {
    unoptimized: true,
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
