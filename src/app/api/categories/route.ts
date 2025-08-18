import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

// 카테고리 목록 조회
export async function GET(request: NextRequest) {
  try {

    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Supabase 환경 변수가 설정되지 않았습니다.')
      return NextResponse.json(
        { error: '서버 설정 오류' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = (page - 1) * limit



    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Supabase 쿼리 오류:', error)
      throw error
    }


    return NextResponse.json({ 
      data: data || [],
      pagination: {
        page,
        limit,
        total: data?.length || 0
      }
    })
  } catch (error) {
    console.error('카테고리 조회 오류 상세:', error)
    return NextResponse.json(
      {
        error: '카테고리를 조회하는 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// 새 카테고리 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, display_order } = body

    if (!name) {
      return NextResponse.json(
        { error: '카테고리 이름은 필수입니다.' },
        { status: 400 }
      )
    }

    // display_order가 없으면 가장 큰 값 + 1로 설정
    let finalDisplayOrder = display_order
    if (finalDisplayOrder === undefined || finalDisplayOrder === null) {
      const { data: maxOrderData } = await supabase
        .from('categories')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1)
      
      finalDisplayOrder = (maxOrderData?.[0]?.display_order || 0) + 1
    }

    const { data, error } = await supabase
      .from('categories')
      .insert({
        name,
        display_order: finalDisplayOrder
      })
      .select()
      .single()

    if (error) {
      console.error('카테고리 생성 오류:', error)
      if (error.code === '23505') {
        return NextResponse.json(
          { error: '이미 존재하는 카테고리 이름입니다.' },
          { status: 400 }
        )
      }
      throw error
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('카테고리 생성 오류:', error)
    return NextResponse.json(
      {
        error: '카테고리를 생성하는 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
