'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { NewsList } from '@/components/news-list'
import { NewsHero } from '@/components/news-hero'
import { useLocale } from 'next-intl'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '뉴스 - Blueye',
  description: '글로벌 부동산 투자와 해외 라이프스타일 관련 최신 뉴스와 시장 동향을 확인하세요.',
  openGraph: {
    title: '뉴스 - Blueye',
    description: '글로벌 부동산 투자와 해외 라이프스타일 관련 최신 뉴스와 시장 동향을 확인하세요.',
    url: 'https://blueye.com/news',
    images: ['/api/og'],
  },
  twitter: {
    title: '뉴스 - Blueye',
    description: '글로벌 부동산 투자와 해외 라이프스타일 관련 최신 뉴스와 시장 동향을 확인하세요.',
    images: ['/api/og'],
  },
  other: {
    'kakao:title': '뉴스 - Blueye',
    'kakao:description': '글로벌 부동산 투자와 해외 라이프스타일 관련 최신 뉴스와 시장 동향을 확인하세요.',
    'kakao:image': 'https://blueye.com/api/og',
  },
}

export default function NewsPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative">
      {/* Global Background Animation */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(30, 58, 138, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
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
              className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full"
            />
          </motion.div>
        ) : (
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <NewsHero />
            <NewsList />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
