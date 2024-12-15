import { auth } from '@/auth'
import Header from '@/components/Header/Header'
import { ReactQueryClientProvider } from '@/providers/ReactQueryClientProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import localFont from 'next/font/local'
import './globals.scss'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'Budgmate',
  description: 'budget management'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  const session = await auth()
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image
    }
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <SessionProvider session={session}>
          <ReactQueryClientProvider>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
              <NextIntlClientProvider messages={messages}>
                <Header />
                <div className="container mx-auto mt-4">{children}</div>
              </NextIntlClientProvider>
            </body>
          </ReactQueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </html>
  )
}
