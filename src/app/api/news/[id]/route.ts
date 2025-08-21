import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { image_url, published_date, locale, status } = body

    if (!image_url || !published_date) {
      return NextResponse.json(
        { error: '이미지와 발행일은 필수입니다.' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('daily_briefs')
      .update({
        image_url,
        published_date,
        locale,
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('데일리 브리프 수정 오류:', error)
      return NextResponse.json(
        { error: '데일리 브리프 수정에 실패했습니다.' },
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { error } = await supabase
      .from('daily_briefs')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('데일리 브리프 삭제 오류:', error)
      return NextResponse.json(
        { error: '데일리 브리프 삭제에 실패했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API 오류:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
