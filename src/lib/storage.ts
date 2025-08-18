import { supabase } from './database'

// 이미지 업로드 함수
export async function uploadImage(file: File, folder: string = 'magazines'): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, file)

    if (error) {
      console.error('이미지 업로드 오류:', error)
      return null
    }

    // 공개 URL 반환
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)

    return publicUrl
  } catch (error) {
    console.error('이미지 업로드 오류:', error)
    return null
  }
}

// 이미지 삭제 함수
export async function deleteImage(filePath: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from('images')
      .remove([filePath])

    if (error) {
      console.error('이미지 삭제 오류:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('이미지 삭제 오류:', error)
    return false
  }
}

// 파일 크기 검증 (5MB 제한)
export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  if (file.size > maxSize) {
    return { isValid: false, error: '파일 크기는 5MB 이하여야 합니다.' }
  }

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'JPG, PNG, WebP 형식만 지원됩니다.' }
  }

  return { isValid: true }
}
