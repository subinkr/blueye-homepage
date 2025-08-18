'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Magazine, Category } from '@/lib/database'
import { Button } from '@/components/ui/button'
import { ImageUpload } from '@/components/ui/image-upload'
import { X, Save, Plus, Tag } from 'lucide-react'

interface MagazineFormProps {
  magazine?: Magazine
  categories: Category[]
  onSave: (data: Partial<Magazine>) => void
  onCancel: () => void
  isOpen: boolean
}

export function MagazineForm({ magazine, categories, onSave, onCancel, isOpen }: MagazineFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    cover_image: '',
    status: 'draft' as 'draft' | 'published',
    locale: 'ko',
    category_id: '',
    published_at: ''
  })

  useEffect(() => {
    if (magazine) {
      setFormData({
        title: magazine.title,
        content: magazine.content,
        excerpt: magazine.excerpt,
        cover_image: magazine.cover_image,
        status: magazine.status,
        locale: magazine.locale,
        category_id: magazine.category_id || '',
        published_at: magazine.published_at ? new Date(magazine.published_at).toISOString().split('T')[0] : ''
      })
    } else {
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        cover_image: '',
        status: 'draft',
        locale: 'ko',
        category_id: '',
        published_at: ''
      })
    }
  }, [magazine])



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 필수 필드 검증
    if (!formData.title || !formData.content || !formData.excerpt || !formData.cover_image) {
      alert('모든 필수 필드를 입력해주세요.')
      return
    }
    
    onSave(formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {magazine ? '매거진 수정' : '새 매거진 생성'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목 *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                언어
              </label>
              <select
                value={formData.locale}
                onChange={(e) => handleChange('locale', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="zh">中文</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              요약 *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="매거진 요약을 입력하세요..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              커버 이미지 *
            </label>
            <ImageUpload
              currentImage={formData.cover_image}
              onImageUpload={(imageUrl) => handleChange('cover_image', imageUrl)}
              onImageRemove={() => handleChange('cover_image', '')}
              folder="magazines"
              required={true}
            />
            {!formData.cover_image && (
              <p className="text-sm text-red-500 mt-1">
                커버 이미지는 필수입니다.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              매거진 링크 *
            </label>
            <input
              type="url"
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="https://example.com/magazine"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              매거진이 호스팅되는 외부 링크를 입력하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => handleChange('category_id', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">카테고리 선택</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                상태
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="draft">임시저장</option>
                <option value="published">발행</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                업로드 날짜
              </label>
              <input
                type="date"
                value={formData.published_at}
                onChange={(e) => handleChange('published_at', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                비워두면 현재 날짜로 설정됩니다.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              취소
            </Button>
            <Button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {magazine ? (
                <>
                  <Save className="w-4 h-4" />
                  저장
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  생성
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
