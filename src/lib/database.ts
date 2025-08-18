import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 카테고리 타입 정의
export interface Category {
  id: string
  name: string
  display_order: number
  created_at: string
  updated_at: string
}

// 매거진 타입 정의
export interface Magazine {
  id: string
  title: string
  content: string // 링크 URL로 사용
  excerpt: string
  cover_image: string
  published_at: string
  created_at: string
  updated_at: string
  locale: string
  status: 'draft' | 'published'
  category_id?: string
  category?: Category
}

// 공지사항 타입 정의
export interface Notice {
  id: string
  title: string
  content: string
  created_at: string
  updated_at: string
  locale: string
  status: 'draft' | 'published'
}
