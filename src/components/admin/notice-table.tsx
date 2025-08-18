'use client'

import { motion } from 'framer-motion'
import { Notice } from '@/lib/database'
import { Bell, Globe, Calendar, Edit, Trash2, Eye, EyeOff } from 'lucide-react'

interface NoticeTableProps {
  notices: Notice[]
  isLoading: boolean
  onEdit: (notice: Notice) => void
  onDelete: (id: string) => void
}

export function NoticeTable({ notices, isLoading, onEdit, onDelete }: NoticeTableProps) {
  const getStatusBadge = (status: string) => {
    const isPublished = status === 'published'
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isPublished 
          ? 'bg-green-100 text-green-800' 
          : 'bg-yellow-100 text-yellow-800'
      }`}>
        {isPublished ? (
          <>
            <Eye className="w-3 h-3 mr-1" />
            발행됨
          </>
        ) : (
          <>
            <EyeOff className="w-3 h-3 mr-1" />
            임시저장
          </>
        )}
      </span>
    )
  }



  return (
    <motion.div
      key="notices"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden"
    >
      {isLoading ? (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
          <p className="text-gray-300 mt-4">로딩 중...</p>
        </div>
      ) : notices.length === 0 ? (
        <div className="p-8 text-center">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300">공지사항이 없습니다.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  제목
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  언어
                </th>
                
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  생성일
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  액션
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {notices.map((notice) => (
                <tr key={notice.id} className="hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">
                      {notice.title}
                    </div>
                    <div 
                      className="text-xs text-gray-400 mt-1 line-clamp-2 prose prose-invert prose-xs max-w-none"
                      dangerouslySetInnerHTML={{ __html: notice.content }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-300">
                        {notice.locale === 'ko' ? '한국어' : 
                         notice.locale === 'en' ? 'English' : '中文'}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(notice.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-300">
                        {new Date(notice.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onEdit(notice)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(notice.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  )
}
