'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ExternalLink, Filter, Search, Bell, Globe, Eye } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Notice } from '@/lib/database'
import { useLocale } from 'next-intl'
import { NoticeDetailModal } from './notice-detail-modal'

const categories = [
  { id: 'all', label: 'All', icon: Bell }
]

export function NoticeList() {
  const t = useTranslations('notices')
  const locale = useLocale()
  const [notices, setNotices] = useState<Notice[]>([])
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>([])
  // const [selectedCategory, setSelectedCategory] = useState('all') // 제거됨
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  useEffect(() => {
    fetchNotices()
  }, [locale])

  const fetchNotices = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/notices?locale=${locale}&status=published`)
      const data = await response.json()
      setNotices(data.data || [])
      setFilteredNotices(data.data || [])
    } catch (error) {
      console.error('공지사항 로딩 오류:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let filtered = notices

    if (searchTerm) {
      filtered = filtered.filter(notice => 
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredNotices(filtered)
  }, [notices, searchTerm])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <section className="pt-0 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">


        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 pt-20"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('searchNotices')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter - 제거됨 */}
          </div>
        </motion.div>

        {/* Notice List */}
        <AnimatePresence mode="wait">
          {filteredNotices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">{t('noNoticesFound')}</h3>
              <p className="text-gray-400">{t('tryAdjusting')}</p>
            </motion.div>
          ) : (
            <motion.div
              key={`${searchTerm}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6"
            >
              {filteredNotices.map((notice) => (
                <motion.div
                  key={notice.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    setSelectedNotice(notice)
                    setShowDetailModal(true)
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <Globe className="w-4 h-4" />
                          <span className="text-xs font-medium">
                            {notice.locale === 'ko' ? '한국어' : 
                             notice.locale === 'en' ? 'English' : '中文'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        {formatDate(notice.created_at)}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {notice.title}
                    </h3>
                    <div 
                      className="text-gray-300 text-sm mb-4 leading-relaxed prose prose-invert prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: notice.content }}
                    />
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 상세 보기 모달 */}
      <NoticeDetailModal
        notice={selectedNotice}
        onClose={() => {
          setShowDetailModal(false)
          setSelectedNotice(null)
        }}
        isOpen={showDetailModal}
      />
    </section>
  )
}
