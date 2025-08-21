'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit, Trash2, Calendar, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DailyBrief {
  id: string
  image_url: string
  published_date: string
  locale: string
  status: 'draft' | 'published'
  created_at: string
}

interface DailyBriefTableProps {
  dailyBriefs: DailyBrief[]
  isLoading: boolean
  onEdit: (dailyBrief: DailyBrief) => void
  onDelete: (id: string) => void
  hasMore?: boolean
  isLoadingMore?: boolean
  onLoadMore?: () => void
}

export function DailyBriefTable({ 
  dailyBriefs, 
  isLoading, 
  onEdit, 
  onDelete,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore
}: DailyBriefTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }



  const getLocaleName = (locale: string) => {
    const locales: Record<string, string> = {
      ko: '한국어',
      en: 'English',
      zh: '中文'
    }
    return locales[locale] || locale
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { text: '임시저장', className: 'bg-yellow-100 text-yellow-800' },
      published: { text: '발행', className: 'bg-green-100 text-green-800' }
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
        {config.text}
      </span>
    )
  }

  if (isLoading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
        </div>
      </div>
    )
  }

  if (dailyBriefs.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8 text-center">
        <p className="text-gray-300 text-lg">등록된 데일리 브리프가 없습니다.</p>
        <p className="text-gray-400 mt-2">새로운 데일리 브리프를 생성해보세요.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 테이블 */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  이미지
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  발행일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  언어
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  상태
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {dailyBriefs.map((brief) => (
                <motion.tr
                  key={brief.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <img
                        src={brief.image_url}
                        alt={brief.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-300">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(brief.published_date)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-300">
                      <Globe className="w-4 h-4 mr-2" />
                      {getLocaleName(brief.locale)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(brief.status)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(brief)}
                        className="text-blue-400 border-blue-400/20 hover:bg-blue-400/10"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(brief.id)}
                        className="text-red-400 border-red-400/20 hover:bg-red-400/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 더보기 버튼 */}
      {hasMore && (
        <div className="text-center">
          <Button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            {isLoadingMore ? '로딩 중...' : '더 보기'}
          </Button>
        </div>
      )}
    </div>
  )
}
