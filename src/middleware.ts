import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['ko', 'en', 'zh'],
  defaultLocale: 'ko',
  localePrefix: 'always',
  localeDetection: true
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
