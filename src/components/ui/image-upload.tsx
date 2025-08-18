'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { uploadImage, validateImageFile } from '@/lib/storage'

interface ImageUploadProps {
  currentImage?: string
  onImageUpload: (imageUrl: string) => void
  onImageRemove: () => void
  folder?: string
  className?: string
  required?: boolean
}

export function ImageUpload({ 
  currentImage, 
  onImageUpload, 
  onImageRemove, 
  folder = 'magazines',
  className = '',
  required = false
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 파일 검증
    const validation = validateImageFile(file)
    if (!validation.isValid) {
      setError(validation.error || '파일 검증에 실패했습니다.')
      return
    }

    setError(null)
    setIsUploading(true)

    try {
      // 미리보기 URL 생성
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)

      // Supabase에 업로드
      const imageUrl = await uploadImage(file, folder)
      
      if (imageUrl) {
        onImageUpload(imageUrl)
        setError(null)
      } else {
        setError('이미지 업로드에 실패했습니다.')
        setPreviewUrl(currentImage || null)
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error)
      setError('이미지 업로드 중 오류가 발생했습니다.')
      setPreviewUrl(currentImage || null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null)
    onImageRemove()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      const input = fileInputRef.current
      if (input) {
        input.files = event.dataTransfer.files
        handleFileSelect({ target: { files: event.dataTransfer.files } } as any)
      }
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-300 ${
          previewUrl 
            ? 'border-purple-500 bg-purple-50/10' 
            : required && !currentImage
            ? 'border-red-300 bg-red-50/5'
            : 'border-gray-300 hover:border-purple-400 bg-gray-50/5'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="미리보기"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {isUploading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full"
                />
              ) : (
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-purple-600" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                {isUploading ? '업로드 중...' : '이미지를 드래그하거나 클릭하여 업로드'}
              </p>
              <p className="text-xs text-gray-500">
                JPG, PNG, WebP 형식, 최대 5MB
              </p>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-red-50 border border-red-200 rounded-md"
        >
          <p className="text-sm text-red-600">{error}</p>
        </motion.div>
      )}

      {currentImage && !previewUrl && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-600">
            현재 이미지가 설정되어 있습니다. 새 이미지를 업로드하면 교체됩니다.
          </p>
        </div>
      )}
    </div>
  )
}
