'use client'

import { useState, useEffect } from 'react'
import { motion, Reorder } from 'framer-motion'
import { Category } from '@/lib/database'
import { Button } from '@/components/ui/button'
import { CategoryForm } from './category-form'
import { CategoryTable } from './category-table'
import { Plus, GripVertical } from 'lucide-react'

export function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isReordering, setIsReordering] = useState(false)


  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data.data || [])
    } catch (error) {
      console.error('카테고리 로딩 오류:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (categoryData: Partial<Category>) => {
    try {
      if (editingCategory) {
        // 수정
        const response = await fetch(`/api/categories/${editingCategory.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(categoryData)
        })
        if (!response.ok) throw new Error('수정 실패')
      } else {
        // 생성
        const response = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(categoryData)
        })
        if (!response.ok) throw new Error('생성 실패')
      }
      
      fetchCategories()
      setIsFormOpen(false)
      setEditingCategory(null)
    } catch (error) {
      console.error('카테고리 저장 오류:', error)
      alert('저장 중 오류가 발생했습니다.')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('삭제 실패')
      
      fetchCategories()
    } catch (error) {
      console.error('카테고리 삭제 오류:', error)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }



  const handleEdit = (category: Category | any) => {
    setEditingCategory(category.id ? category : null)
    setIsFormOpen(true)
  }

  const handleCancel = () => {
    setIsFormOpen(false)
    setEditingCategory(null)
  }

  const handleReorder = async (newOrder: Category[]) => {
    try {
      const categoryOrders = newOrder.map((category, index) => ({
        id: category.id,
        display_order: index
      }))

      const response = await fetch('/api/categories/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryOrders })
      })

      if (!response.ok) {
        throw new Error('순서 변경 실패')
      }

      setCategories(newOrder)
    } catch (error) {
      console.error('카테고리 순서 변경 오류:', error)
      alert('순서 변경 중 오류가 발생했습니다.')
      // 에러 발생 시 원래 순서로 복원
      fetchCategories()
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {isReordering ? (
        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">카테고리 순서 변경</h3>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsReordering(false)}
                variant="outline"
                size="sm"
                className="text-white border-white/20 hover:bg-white/10"
              >
                취소
              </Button>
              <Button
                onClick={() => setIsReordering(false)}
                size="sm"
                className="bg-green-500 hover:bg-green-600"
              >
                완료
              </Button>
            </div>
          </div>
          
          <Reorder.Group axis="y" values={categories} onReorder={handleReorder} className="space-y-2">
            {categories.map((category) => (
              <Reorder.Item
                key={category.id}
                value={category}
                className="flex items-center gap-3 p-3 bg-white/10 rounded-md cursor-move hover:bg-white/20 transition-colors"
              >
                <GripVertical className="w-4 h-4 text-white/60" />
                <span className="text-white flex-1">{category.name}</span>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      ) : (
        <CategoryTable
          categories={categories}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReorder={() => setIsReordering(true)}
        />
      )}

      <CategoryForm
        category={editingCategory}
        onSave={handleSave}
        onCancel={handleCancel}
        isOpen={isFormOpen}
      />
    </div>
  )
}
