'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Category } from '@/lib/database'
import { Button } from '@/components/ui/button'
import { X, Save, Plus } from 'lucide-react'

interface CategoryFormProps {
  category?: Category | null
  onSave: (data: Partial<Category>) => void
  onCancel: () => void
  isOpen: boolean
}

export function CategoryForm({ category, onSave, onCancel, isOpen }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: ''
  })

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name
      })
    } else {
      setFormData({
        name: ''
      })
    }
  }, [category])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name) {
      alert('카테고리 이름은 필수입니다.')
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
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {category ? '카테고리 수정' : '새 카테고리 생성'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리 이름 *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="카테고리 이름을 입력하세요..."
              required
            />
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
              {category ? (
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
