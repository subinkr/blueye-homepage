import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

// GET: 매거진 목록 조회
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
    const categoryId = searchParams.get('categoryId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '8')
    const offset = (page - 1) * limit



    let query = supabase
      .from('magazines')
      .select(`
        *,
        category:categories(id, name)
      `)
      .eq('locale', locale)
      .order('published_at', { ascending: false })

    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    if (categoryId && categoryId !== 'all') {
      query = query.eq('category_id', categoryId)
    }

    // 전체 개수를 먼저 가져오기
    const countQuery = supabase
      .from('magazines')
      .select('*', { count: 'exact', head: true })
      .eq('locale', locale)
      .order('published_at', { ascending: false })

    if (status && status !== 'all') {
      countQuery.eq('status', status)
    }

    if (categoryId && categoryId !== 'all') {
      countQuery.eq('category_id', categoryId)
    }

    const { count: totalCount, error: countError } = await countQuery
    
    if (countError) {
      console.error('카운트 쿼리 오류:', countError)
      throw countError
    }

    // 실제 데이터 가져오기
    const { data, error } = await query
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
        total: totalCount || 0,
        totalPages: Math.ceil((totalCount || 0) / limit)
      }
    })
  } catch (error) {
    console.error('매거진 조회 오류 상세:', error)
    return NextResponse.json(
      { 
        error: '매거진을 조회하는 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// POST: 새 매거진 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, excerpt, cover_image, locale, status, category_id, published_at } = body

    if (!title || !content || !locale || !excerpt || !cover_image) {
      return NextResponse.json(
        { error: '제목, 링크, 언어, 요약, 커버 이미지는 필수입니다.' },
        { status: 400 }
      )
    }

    const insertData: any = {
      title,
      content,
      excerpt,
      cover_image,
      locale,
      status: status || 'draft'
    }

    // published_at 처리
    if (published_at && published_at.trim()) {
      insertData.published_at = new Date(published_at).toISOString()
    } else if (status === 'published') {
      insertData.published_at = new Date().toISOString()
    } else {
      insertData.published_at = null
    }

    if (category_id) {
      insertData.category_id = category_id
    }

    const { data, error } = await supabase
      .from('magazines')
      .insert(insertData)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('매거진 생성 오류:', error)
    return NextResponse.json(
      { error: '매거진을 생성하는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
