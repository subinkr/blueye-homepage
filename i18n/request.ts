import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

const locales = ['ko', 'en', 'zh']

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale
  
  if (!locales.includes(locale as any)) {
    notFound()
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    locale: locale,
    timeZone: 'Asia/Seoul'
  }
})
