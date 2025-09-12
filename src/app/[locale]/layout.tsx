import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Blueye - 글로벌 프리미엄 라이프 솔루션',
  description: '해외 부동산 투자부터 현지 생활 지원까지, Blueye와 함께하는 글로벌 라이프스타일',
  keywords: '해외부동산, 글로벌라이프, 은퇴이민, 해외투자, 한달살기, 자산분배',
  authors: [{ name: 'Blueye' }],
  creator: 'Blueye',
  publisher: 'Blueye',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://blueye.com'),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://blueye.com',
    title: 'Blueye - 글로벌 프리미엄 라이프 솔루션',
    description: '해외 부동산 투자부터 현지 생활 지원까지, Blueye와 함께하는 글로벌 라이프스타일',
    siteName: 'Blueye',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Blueye - 글로벌 프리미엄 라이프 솔루션',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blueye - 글로벌 프리미엄 라이프 솔루션',
    description: '해외 부동산 투자부터 현지 생활 지원까지, Blueye와 함께하는 글로벌 라이프스타일',
    images: ['/api/og'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'kakao:title': 'Blueye - 글로벌 프리미엄 라이프 솔루션',
    'kakao:description': '해외 부동산 투자부터 현지 생활 지원까지, Blueye와 함께하는 글로벌 라이프스타일',
    'kakao:image': 'https://blueye.com/api/og',
  },
}

const locales = ['ko', 'en', 'zh']

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  if (!locales.includes(locale)) notFound()

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
