'use client'

import { useTranslations } from 'next-intl'
import { Facebook, Youtube, Instagram, MessageCircle, FileText } from 'lucide-react'
import { Logo } from '@/components/ui/logo'

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/blueye.asia.official', label: 'Facebook' },
  { icon: Youtube, href: 'https://www.youtube.com/@blueyeasia', label: 'Youtube' },
  { icon: Instagram, href: 'https://www.instagram.com/blueyeasia', label: 'Instagram' },
  { icon: MessageCircle, href: 'https://pf.kakao.com/_qpRxjxb', label: 'Kakaotalk' },
  { icon: FileText, href: 'https://blog.naver.com/ggumproject', label: 'Blog' },
]

const globalCenters = [
  { key: 'shanghai' },
  { key: 'seoul' },
  { key: 'cambodia' },
  { key: 'malaysia' },
  { key: 'hochiminh' },
  { key: 'hanoi' }
]

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Global Centers Section */}
        <div className="w-full text-xs flex flex-col gap-8 lg:gap-1 text-gray-500 font-normal lg:font-bold mb-12">
          <div className="flex flex-col justify-center items-center gap-1">
            <div className="flex items-center mb-8">
              <Logo size="lg" className="h-12" />
            </div>
            <div className="text-base font-bold mt-8 text-center">
              {t('countries')}
            </div>
            <div className="lg:flex gap-4 font-bold text-center mt-4">
              <div>{t('magazine')}</div>
              <div className="hidden lg:block">|</div>
              <div>{t('education')}</div>
              <div className="hidden lg:block">|</div>
              <div>{t('newspaper')}</div>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <br />
            <br />
            <br />
          </div>
          
          {/* Global Centers */}
          {globalCenters.map((center, index) => {
            const hasPhone = ['shanghai', 'seoul', 'cambodia'].includes(center.key)
            return (
              <div key={index} className="lg:flex gap-4">
                <div className="font-bold w-24">{t(`centers.${center.key}.name`)}</div>
                <div className="hidden lg:block">|</div>
                <div>{t(`centers.${center.key}.address`)}</div>
                {hasPhone && (
                  <>
                    <div className="hidden lg:block">|</div>
                    <div>{t('representativePhone')} {t(`centers.${center.key}.phone`)}</div>
                  </>
                )}
              </div>
            )
          })}
          
          <br />
          <div className="font-normal text-center">{t('copyright')}</div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center">
          <div className="flex gap-4 px-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
