import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

// GET: 공지사항 목록 조회
export async function GET(request: NextRequest) {
  try {

    
    // Supabase 연결 확인
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Supabase 환경 변수가 설정되지 않았습니다.')
      return NextResponse.json(
        { error: '서버 설정 오류' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'ko'
    const status = searchParams.get('status') || 'published'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit



    let query = supabase
      .from('notices')
      .select('*')
      .eq('locale', locale)
      .order('created_at', { ascending: false })

    if (status !== 'all') {
      query = query.eq('status', status)
    }

    const { data, error, count } = await query
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Supabase 쿼리 오류:', error)
      throw error
    }



    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })
  } catch (error) {
    console.error('공지사항 조회 오류 상세:', error)
    return NextResponse.json(
      { 
        error: '공지사항을 조회하는 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// POST: 새 공지사항 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, locale, status } = body

    if (!title || !content || !locale) {
      return NextResponse.json(
        { error: '제목, 내용, 언어는 필수입니다.' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('notices')
      .insert({
        title,
        content,
        locale,
        status: status || 'draft'
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('공지사항 생성 오류:', error)
    return NextResponse.json(
      { error: '공지사항을 생성하는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
