'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { NoticeList } from '@/components/notice-list'
import { NoticeHero } from '@/components/notice-hero'
import { useLocale } from 'next-intl'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '공지사항 - Blueye',
  description: 'Blueye의 최신 공지사항과 서비스 업데이트 소식을 확인하세요.',
  openGraph: {
    title: '공지사항 - Blueye',
    description: 'Blueye의 최신 공지사항과 서비스 업데이트 소식을 확인하세요.',
    url: 'https://blueye.com/notices',
    images: ['/api/og'],
  },
  twitter: {
    title: '공지사항 - Blueye',
    description: 'Blueye의 최신 공지사항과 서비스 업데이트 소식을 확인하세요.',
    images: ['/api/og'],
  },
  other: {
    'kakao:title': '공지사항 - Blueye',
    'kakao:description': 'Blueye의 최신 공지사항과 서비스 업데이트 소식을 확인하세요.',
    'kakao:image': 'https://blueye.com/api/og',
  },
}

export default function NoticesPage() {
  const locale = useLocale()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 페이지 로딩 애니메이션
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-900 relative">
      {/* Global Background Animation */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(20, 184, 166, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(20, 184, 166, 0.2) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
        />
      </div>

      <Navigation />
      
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-900"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full"
            />
          </motion.div>
        ) : (
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <NoticeHero />
            <NoticeList />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
