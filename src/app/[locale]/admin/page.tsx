'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagazineForm } from '@/components/admin/magazine-form'
import { NoticeForm } from '@/components/admin/notice-form'
import { CategoryManager } from '@/components/admin/category-manager'
import { MagazineTable } from '@/components/admin/magazine-table'
import { NoticeTable } from '@/components/admin/notice-table'
import { Magazine, Notice, Category } from '@/lib/database'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Bell, 
  Plus, 
  Tag,
  LogOut
} from 'lucide-react'
import { AuthModal } from '@/components/admin/auth-modal'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'magazines' | 'notices' | 'categories'>('notices')
  const [magazines, setMagazines] = useState<Magazine[]>([])
  const [notices, setNotices] = useState<Notice[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showMagazineForm, setShowMagazineForm] = useState(false)
  const [showNoticeForm, setShowNoticeForm] = useState(false)
  const [editingMagazine, setEditingMagazine] = useState<Magazine | null>(null)
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null)
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')

  useEffect(() => {
    // 인증 상태 확인
    const checkAuth = () => {
      const authenticated = sessionStorage.getItem('admin_authenticated') === 'true'
      setIsAuthenticated(authenticated)
      if (!authenticated) {
        setShowAuthModal(true)
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
    }
  }, [statusFilter, isAuthenticated])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      
      // 매거진 데이터 가져오기
      const magazineResponse = await fetch(`/api/magazines?status=${statusFilter}`)
      const magazineData = await magazineResponse.json()
      setMagazines(magazineData.data || [])

      // 공지사항 데이터 가져오기
      const noticeResponse = await fetch(`/api/notices?status=${statusFilter}`)
      const noticeData = await noticeResponse.json()
      setNotices(noticeData.data || [])

      // 카테고리 데이터 가져오기
      const categoryResponse = await fetch('/api/categories')
      const categoryData = await categoryResponse.json()
      setCategories(categoryData.data || [])
    } catch (error) {
      console.error('데이터 로딩 오류:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMagazineSave = async (data: Partial<Magazine>) => {
    try {
      if (editingMagazine) {
        // 수정
        const response = await fetch(`/api/magazines/${editingMagazine.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        if (response.ok) {
          setShowMagazineForm(false)
          setEditingMagazine(null)
          fetchData()
        }
      } else {
        // 생성
        const response = await fetch('/api/magazines', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        if (response.ok) {
          setShowMagazineForm(false)
          fetchData()
        }
      }
    } catch (error) {
      console.error('매거진 저장 오류:', error)
    }
  }

  const handleNoticeSave = async (data: Partial<Notice>) => {
    try {
      if (editingNotice) {
        // 수정
        const response = await fetch(`/api/notices/${editingNotice.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        if (response.ok) {
          setShowNoticeForm(false)
          setEditingNotice(null)
          fetchData()
        }
      } else {
        // 생성
        const response = await fetch('/api/notices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        if (response.ok) {
          setShowNoticeForm(false)
          fetchData()
        }
      }
    } catch (error) {
      console.error('공지사항 저장 오류:', error)
    }
  }

  const handleDelete = async (type: 'magazine' | 'notice' | 'category', id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      const response = await fetch(`/api/${type}s/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        fetchData()
      }
    } catch (error) {
      console.error('삭제 오류:', error)
    }
  }

  const handleEdit = (type: 'magazine' | 'notice', item: Magazine | Notice) => {
    if (type === 'magazine') {
      setEditingMagazine(item as Magazine)
      setShowMagazineForm(true)
    } else if (type === 'notice') {
      setEditingNotice(item as Notice)
      setShowNoticeForm(true)
    }
  }

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated')
    setIsAuthenticated(false)
    setShowAuthModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* 인증 모달 */}
      <AuthModal 
        isOpen={showAuthModal} 
        onSuccess={handleAuthSuccess} 
      />

      {/* 인증되지 않은 경우 로딩 화면 */}
      {!isAuthenticated && !showAuthModal && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
        </div>
      )}

      {/* 인증된 경우에만 대시보드 표시 */}
      {isAuthenticated && (
        <div className="container mx-auto px-4 py-8">
          {/* 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 relative"
          >
            <div className="absolute top-0 right-0">
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="text-white border-white/20 hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                로그아웃
              </Button>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              관리자 대시보드
            </h1>
            <p className="text-xl text-gray-300">
              콘텐츠를 관리하고 새로운 정보를 추가하세요
            </p>
          </motion.div>

          {/* 통계 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center">
                <Bell className="w-8 h-8 text-blue-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">총 공지사항</p>
                  <p className="text-2xl font-bold text-white">{notices.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center">
                <BookOpen className="w-8 h-8 text-purple-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">총 매거진</p>
                  <p className="text-2xl font-bold text-white">{magazines.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center">
                <Tag className="w-8 h-8 text-green-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">총 카테고리</p>
                  <p className="text-2xl font-bold text-white">{categories.length}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 탭 네비게이션 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 mb-8"
          >
            <button
              onClick={() => setActiveTab('notices')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'notices'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Bell className="w-4 h-4 inline mr-2" />
              공지사항
            </button>
            <button
              onClick={() => setActiveTab('magazines')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'magazines'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              매거진
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'categories'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Tag className="w-4 h-4 inline mr-2" />
              카테고리
            </button>
          </motion.div>

          {/* 필터 및 액션 버튼 */}
          {activeTab !== 'categories' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
            >
              <div className="flex items-center space-x-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">전체</option>
                  <option value="published">발행됨</option>
                  <option value="draft">임시저장</option>
                </select>
              </div>
              
              <Button
                onClick={() => {
                  if (activeTab === 'notices') {
                    setEditingNotice(null)
                    setShowNoticeForm(true)
                  } else if (activeTab === 'magazines') {
                    setEditingMagazine(null)
                    setShowMagazineForm(true)
                  }
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                새 {activeTab === 'notices' ? '공지사항' : '매거진'} 생성
              </Button>
            </motion.div>
          )}

          {/* 콘텐츠 */}
          <AnimatePresence mode="wait">
            {activeTab === 'notices' && (
              <NoticeTable
                notices={notices}
                isLoading={isLoading}
                onEdit={(notice) => handleEdit('notice', notice)}
                onDelete={(id) => handleDelete('notice', id)}
              />
            )}
            {activeTab === 'magazines' && (
              <MagazineTable
                magazines={magazines}
                isLoading={isLoading}
                onEdit={(magazine) => handleEdit('magazine', magazine)}
                onDelete={(id) => handleDelete('magazine', id)}
              />
            )}
            {activeTab === 'categories' && (
              <CategoryManager />
            )}
          </AnimatePresence>

          {/* 폼 모달 */}
          <MagazineForm
            magazine={editingMagazine || undefined}
            categories={categories}
            onSave={handleMagazineSave}
            onCancel={() => {
              setShowMagazineForm(false)
              setEditingMagazine(null)
            }}
            isOpen={showMagazineForm}
          />

          <NoticeForm
            notice={editingNotice || undefined}
            onSave={handleNoticeSave}
            onCancel={() => {
              setShowNoticeForm(false)
              setEditingNotice(null)
            }}
            isOpen={showNoticeForm}
          />
        </div>
      )}
    </div>
  )
}
