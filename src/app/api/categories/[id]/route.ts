import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

// 카테고리 개별 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: '카테고리를 찾을 수 없습니다.' },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('카테고리 조회 오류:', error)
    return NextResponse.json(
      {
        error: '카테고리를 조회하는 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// 카테고리 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, display_order } = body

    if (!name) {
      return NextResponse.json(
        { error: '카테고리 이름은 필수입니다.' },
        { status: 400 }
      )
    }

    const updateData: any = { 
      name,
      updated_at: new Date().toISOString()
    }
    if (display_order !== undefined && display_order !== null) {
      updateData.display_order = display_order
    }

    const { data, error } = await supabase
      .from('categories')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('카테고리 수정 오류:', error)
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
    console.error('카테고리 수정 오류:', error)
    return NextResponse.json(
      {
        error: '카테고리를 수정하는 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// 카테고리 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // 해당 카테고리를 사용하는 매거진이 있는지 확인
    const { data: magazines, error: magazinesError } = await supabase
      .from('magazines')
      .select('id')
      .eq('category_id', id)

    if (magazinesError) {
      throw magazinesError
    }

    if (magazines && magazines.length > 0) {
      return NextResponse.json(
        { error: '이 카테고리를 사용하는 매거진이 있어 삭제할 수 없습니다.' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) {
      throw error
    }

    return NextResponse.json({ message: '카테고리가 삭제되었습니다.' })
  } catch (error) {
    console.error('카테고리 삭제 오류:', error)
    return NextResponse.json(
      {
        error: '카테고리를 삭제하는 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
