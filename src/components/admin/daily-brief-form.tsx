'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ImageUpload } from '@/components/ui/image-upload'

interface DailyBrief {
  id: string
  image_url: string
  published_date: string
  locale: string
  status: 'draft' | 'published'
}

interface DailyBriefFormProps {
  dailyBrief?: DailyBrief
  onSave: (data: Partial<DailyBrief>) => void
  onCancel: () => void
  isOpen: boolean
}

export function DailyBriefForm({ dailyBrief, onSave, onCancel, isOpen }: DailyBriefFormProps) {
  const [imageUrl, setImageUrl] = useState('')
  const [publishedDate, setPublishedDate] = useState('')
  const [locale, setLocale] = useState('ko')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (dailyBrief) {
      setImageUrl(dailyBrief.image_url)
      setPublishedDate(dailyBrief.published_date)
      setLocale(dailyBrief.locale)
      setStatus(dailyBrief.status)
    } else {
      // 새로 생성하는 경우 오늘 날짜로 설정
      const today = new Date().toISOString().split('T')[0]
      setPublishedDate(today)
    }
  }, [dailyBrief])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!imageUrl || !publishedDate) {
      alert('이미지와 발행일은 필수입니다.')
      return
    }

    setIsSubmitting(true)
    
    try {
      await onSave({
        image_url: imageUrl,
        published_date: publishedDate,
        locale,
        status
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (url: string) => {
    setImageUrl(url)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {dailyBrief ? '데일리 브리프 수정' : '새 데일리 브리프 생성'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              금융/부동산 시장 동향, 정부 정책, 회사 방문 손님 사진 등을 포함한 일일 브리프
            </p>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            

            {/* 이미지 업로드 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이미지 *
              </label>
              <ImageUpload
                currentImage={imageUrl}
                onImageUpload={handleImageUpload}
                onImageRemove={() => setImageUrl('')}
                folder="daily-briefs"
              />
            </div>

            {/* 발행일 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                발행일 *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={publishedDate}
                  onChange={(e) => setPublishedDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* 언어 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                언어
              </label>
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="zh">中文</option>
              </select>
            </div>

            {/* 상태 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                상태
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="draft">임시저장</option>
                <option value="published">발행</option>
              </select>
            </div>

            {/* 버튼 */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                취소
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isSubmitting ? '저장 중...' : (dailyBrief ? '수정' : '생성')}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
