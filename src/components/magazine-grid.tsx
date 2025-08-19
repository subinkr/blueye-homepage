'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Filter, Search, BookOpen, Globe, Tag } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Magazine } from '@/lib/database'
import { useLocale } from 'next-intl'

interface Category {
  id: string
  name: string
  display_order: number
}

export function MagazineGrid() {
  const t = useTranslations('magazine')
  const locale = useLocale()
  const [magazines, setMagazines] = useState<Magazine[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [locale])

  useEffect(() => {
    setCurrentPage(1)
    fetchMagazines(1, true)
  }, [locale, selectedCategory, searchTerm])

  const fetchMagazines = async (page: number = 1, reset: boolean = false) => {
    try {
      if (reset) {
        setIsLoading(true)
      } else {
        setIsLoadingMore(true)
      }

      const url = new URL('/api/magazines', window.location.origin)
      url.searchParams.set('locale', locale)
      url.searchParams.set('status', 'published')
      url.searchParams.set('page', page.toString())
      url.searchParams.set('limit', '10')
      
      if (selectedCategory) {
        url.searchParams.set('categoryId', selectedCategory)
      }

      const response = await fetch(url.toString())
      const data = await response.json()
      
      if (reset) {
        setMagazines(data.data || [])
      } else {
        setMagazines(prev => [...prev, ...(data.data || [])])
      }
      
      setHasMore(data.pagination?.totalPages > page)
    } catch (error) {
      console.error('매거진 로딩 오류:', error)
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      const categoriesData = data.data || []
      setCategories(categoriesData)
      
      if (categoriesData.length > 0 && !selectedCategory) {
        setSelectedCategory(categoriesData[0].id)
      }
    } catch (error) {
      console.error('카테고리 로딩 오류:', error)
    }
  }

  const loadMore = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    fetchMagazines(nextPage, false)
  }

  const filteredMagazines = magazines.filter(magazine => {
    if (searchTerm) {
      return magazine.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             magazine.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    }
    return true
  })

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
        ease: 'easeOut'
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <section className="pt-0 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">카테고리가 없습니다</h3>
            <p className="text-gray-400">매거진을 표시하려면 먼저 카테고리를 생성해주세요.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pt-0 pb-20 relative">
      <div className="max-w-7xl mx-auto">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 pt-20"
        >
          <div className="flex justify-center">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('searchMagazines')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {category.name}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Magazine Grid */}
        <AnimatePresence mode="wait">
          {filteredMagazines.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">{t('noMagazinesFound')}</h3>
              <p className="text-gray-400">{t('tryAdjusting')}</p>
            </motion.div>
          ) : (
            <>
              <motion.div
                key={`${searchTerm}-${selectedCategory}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
              >
                {filteredMagazines.map((magazine) => (
                  <motion.div
                    key={magazine.id}
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="relative overflow-hidden group">
                      {magazine.cover_image ? (
                        <img
                          src={magazine.cover_image}
                          alt={magazine.title}
                          className="w-full h-auto object-contain"
                        />
                      ) : (
                        <div className="h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative">
                          <motion.div
                            animate={{
                              background: [
                                'linear-gradient(45deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3))',
                                'linear-gradient(45deg, rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.3))',
                                'linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))'
                              ]
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <BookOpen className="w-16 h-16 text-white/60" />
                          </div>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 sm:group-hover:opacity-100 sm:opacity-0 opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h4 className="text-sm font-semibold mb-2 line-clamp-2">{magazine.title}</h4>
                          <div
                            className="text-xs text-gray-200 whitespace-pre-line max-h-32 overflow-y-auto hidden sm:block"
                            dangerouslySetInnerHTML={{ __html: magazine.excerpt.replace(/\n/g, '<br>') }}
                          />
                        </div>
                      </div>

                      <motion.a
                        href={magazine.content}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-10"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      />
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none"
                    />
                  </motion.div>
                ))}
              </motion.div>

              {hasMore && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={loadMore}
                    disabled={isLoadingMore}
                    className="px-6 py-3 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingMore ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        로딩 중...
                      </div>
                    ) : (
                      '더 불러오기'
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
