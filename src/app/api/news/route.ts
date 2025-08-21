import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'ko'
    const status = searchParams.get('status') || 'published'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = (page - 1) * limit

    let query = supabase
      .from('daily_briefs')
      .select('*', { count: 'exact' })
      .eq('locale', locale)
      .order('published_date', { ascending: false })

    if (status !== 'all') {
      query = query.eq('status', status)
    }

    const { data, error, count } = await query
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('데일리 브리프 조회 오류:', error)
      return NextResponse.json(
        { error: '데일리 브리프 조회에 실패했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })
  } catch (error) {
    console.error('API 오류:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { image_url, published_date, locale = 'ko', status = 'draft' } = body

    if (!image_url || !published_date) {
      return NextResponse.json(
        { error: '이미지와 발행일은 필수입니다.' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('daily_briefs')
      .insert({
        image_url,
        published_date,
        locale,
        status
      })
      .select()
      .single()

    if (error) {
      console.error('데일리 브리프 생성 오류:', error)
      return NextResponse.json(
        { error: '데일리 브리프 생성에 실패했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('API 오류:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
