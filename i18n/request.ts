import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

const locales = ['ko', 'en', 'zh']
const defaultLocale = 'ko'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale
  
  // 로케일이 없거나 유효하지 않으면 기본 로케일 사용
  if (!locale || !locales.includes(locale as any)) {
    return {
      messages: (await import(`../messages/${defaultLocale}.json`)).default,
      locale: defaultLocale,
      timeZone: 'Asia/Seoul'
    }
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    locale: locale,
    timeZone: 'Asia/Seoul'
  }
})
