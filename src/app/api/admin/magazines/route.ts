import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

// GET: 관리자용 매거진 목록 조회 (모든 언어, 모든 상태)
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
    const status = searchParams.get('status') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    let query = supabase
      .from('magazines')
      .select(`
        *,
        category:categories(id, name)
      `)
      .order('created_at', { ascending: false })

    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    // 전체 개수를 먼저 가져오기
    const countQuery = supabase
      .from('magazines')
      .select('*', { count: 'exact', head: true })

    if (status && status !== 'all') {
      countQuery.eq('status', status)
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
    console.error('관리자 매거진 조회 오류 상세:', error)
    return NextResponse.json(
      { 
        error: '매거진을 조회하는 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
