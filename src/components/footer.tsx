'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Youtube, Instagram, MessageCircle, FileText, MapPin, Phone, Mail } from 'lucide-react'
import { Logo } from '@/components/ui/logo'

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/blueye.asia.official', label: 'Facebook' },
  { icon: Youtube, href: 'https://www.youtube.com/@blueyeasia', label: 'Youtube' },
  { icon: Instagram, href: 'https://www.instagram.com/blueyeasia', label: 'Instagram' },
  { icon: MessageCircle, href: 'https://pf.kakao.com/_qpRxjxb', label: 'Kakaotalk' },
  { icon: FileText, href: 'https://blog.naver.com/ggumproject', label: 'Blog' },
]

const globalCenters = [
  {
    name: '상하이센터',
    address: '上海市闵行区虹泉路1000号 A座701室',
    phone: '(186) 1694 0029'
  },
  {
    name: '서울센터',
    address: '서울특별시 영등포구 국회대로 62길 5, 5층 502호(여의도동, 신태진빌딩)',
    phone: '010 5763 0617'
  },
  {
    name: '캄보디아센터',
    address: 'St.Sopheak Monkol RD, Tonle Basak, koh Pich Phnom Penh',
    phone: '(855) 15 493 600'
  },
  {
    name: '말레이시아센터',
    address: 'HI JAUAN MACROLINK, BLOCK A-32-05,Medini Central1,79250, Iskandar PuteriI,Johor'
  },
  {
    name: '호치민센터',
    address: '2F, 8/6 Vo Truong Toan Street , An Phu Ward, Thu Duc City, HCMC'
  },
  {
    name: '하노이센터',
    address: 'The garden 1002, my dinh 1, nam tu liem, hanoi'
  }
]

export function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Global Centers Section */}
        <div className="w-full text-xs flex flex-col gap-8 lg:gap-1 text-gray-500 font-normal lg:font-bold mb-12">
          <div className="flex flex-col justify-center items-center gap-1">
            <div className="flex items-center mb-8">
              <Logo size="lg" className="h-12" />
            </div>
            <div className="text-base font-bold mt-8 text-center break-words">
              대한민국 · 말레이시아 · 베트남 · 싱가포르 · 아랍에미리트 · 중국 · 캄보디아
            </div>
            <div className="lg:flex gap-4 font-bold text-center mt-4">
              <div>아시아 라이프 매거진 더리치(The Litchi)</div>
              <div className="hidden lg:block">|</div>
              <div>에듀아시아(EDU ASIA)</div>
              <div className="hidden lg:block">|</div>
              <div>베한타임즈(Vietnam-Korea Times)</div>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <br />
            <br />
            <br />
          </div>
          
          {/* Global Centers */}
          {globalCenters.map((center, index) => (
            <div key={index} className="lg:flex gap-4">
              <div className="font-bold w-24">{center.name}</div>
              <div className="hidden lg:block">|</div>
              <div className="break-words">{center.address}</div>
              {center.phone && (
                <>
                  <div className="hidden lg:block">|</div>
                  <div>대표전화 {center.phone}</div>
                </>
              )}
            </div>
          ))}
          
          <br />
          <div className="font-normal text-center">ⓒCopyright 2002 - 2024 BLUEYE. All Rights Reserved.</div>
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
