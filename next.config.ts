import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  sassOptions: {
    // includePaths: ['./styles'],
    // prependData: `@import "main.scss";`
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.daisyui.com'
      }
    ]
  }
}

export default withNextIntl(nextConfig)
