'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface DailyBrief {
  id: string
  image_url: string
  published_date: string
  created_at: string
}

export function NewsList() {
  const t = useTranslations('news')
  const [dailyBriefs, setDailyBriefs] = useState<DailyBrief[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDailyBriefs()
  }, [])

  const fetchDailyBriefs = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/news')
      const data = await response.json()
      setDailyBriefs(data.data || [])
    } catch (error) {
      console.error('소식 로딩 오류:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleImageClick = (brief: DailyBrief) => {
    // 이미지를 새 탭에서 열기
    window.open(brief.image_url, '_blank')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
      </div>
    )
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Daily Brief Grid */}
        {dailyBriefs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 text-gray-400 mx-auto mb-4">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4m7 0v4a2 2 0 01-2 2h-2m-4-3H9M7 16h6M7 8h6v4m7 0v4a2 2 0 01-2 2h-2" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">{t('noNewsFound')}</h3>
            <p className="text-gray-400">{t('tryAdjusting')}</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
          >
            {dailyBriefs.map((brief, index) => (
              <motion.div
                key={brief.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 cursor-pointer"
                onClick={() => handleImageClick(brief)}
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={brief.image_url}
                    alt={`데일리 브리프 - ${formatDate(brief.published_date)}`}
                    className="w-full h-auto object-contain"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 sm:group-hover:opacity-100 sm:opacity-0 opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="text-xs text-gray-200">
                        {formatDate(brief.published_date)}
                      </div>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
