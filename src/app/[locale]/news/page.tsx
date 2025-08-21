'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Calendar, X } from 'lucide-react'
import { Navigation } from '@/components/navigation'

interface DailyBrief {
  id: string
  image_url: string
  published_date: string
  created_at: string
}

export default function NewsPage() {
  const t = useTranslations('news')
  const [dailyBriefs, setDailyBriefs] = useState<DailyBrief[]>([])
  const [selectedBrief, setSelectedBrief] = useState<DailyBrief | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [imageScale, setImageScale] = useState(1)


  useEffect(() => {
    fetchDailyBriefs()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedBrief) {
        setSelectedBrief(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedBrief])

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
    setSelectedBrief(brief)
    setImageScale(1) // 모달 열 때 스케일 초기화
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-900 relative">
      {/* Global Background Animation */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(5, 150, 105, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)"
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
      
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-32 pb-16 px-4 relative z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
          {t('description')}
        </p>
      </motion.div>

      {/* 데일리 브리프 그리드 */}
      <div className="container mx-auto px-4 pb-16 relative z-10">
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

      {/* 이미지 상세 모달 */}
      <AnimatePresence>
        {selectedBrief && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBrief(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 닫기 버튼 */}
              <button
                onClick={() => setSelectedBrief(null)}
                className="absolute top-6 right-6 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors backdrop-blur-sm"
              >
                <X className="w-6 h-6" />
              </button>

              {/* 발행일 표시 */}
              <div className="absolute top-6 left-6 z-20 bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{formatDate(selectedBrief.published_date)}</span>
                </div>
              </div>

              {/* 이미지 */}
              <div className="relative w-full h-full flex items-center justify-center overflow-auto">
                <img
                  src={selectedBrief.image_url}
                  alt="데일리 브리프"
                  className="object-contain max-w-[90vw] max-h-[90vh] cursor-zoom-in transition-transform duration-200"
                  style={{ 
                    transform: `scale(${imageScale})`,
                    transformOrigin: 'center center'
                  }}

                />
              </div>

              {/* 줌 컨트롤 버튼들 */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-3">
                {/* 축소 버튼 */}
                <button
                  onClick={() => setImageScale(prev => Math.max(0.5, prev * 0.9))}
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors backdrop-blur-sm"
                  title="축소"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                
                {/* 현재 배율 표시 */}
                <div className="bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm text-sm min-w-[80px] text-center">
                  {Math.round(imageScale * 100)}%
                </div>
                
                {/* 확대 버튼 */}
                <button
                  onClick={() => setImageScale(prev => Math.min(3, prev * 1.1))}
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors backdrop-blur-sm"
                  title="확대"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                
                {/* 초기화 버튼 */}
                <button
                  onClick={() => setImageScale(1)}
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors backdrop-blur-sm"
                  title="원본 크기"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
