import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

// GET: 특정 공지사항 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: '공지사항을 찾을 수 없습니다.' },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('공지사항 조회 오류:', error)
    return NextResponse.json(
      { error: '공지사항을 조회하는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// PUT: 공지사항 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, content, status } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: '제목과 내용은 필수입니다.' },
        { status: 400 }
      )
    }

    const updateData: any = {
      title,
      content,
      updated_at: new Date().toISOString()
    }

    if (status !== undefined) {
      updateData.status = status
    }

    const { data, error } = await supabase
      .from('notices')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: '공지사항을 찾을 수 없습니다.' },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('공지사항 수정 오류:', error)
    return NextResponse.json(
      { error: '공지사항을 수정하는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// DELETE: 공지사항 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { error } = await supabase
      .from('notices')
      .delete()
      .eq('id', id)

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: '공지사항을 찾을 수 없습니다.' },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json({ message: '공지사항이 삭제되었습니다.' })
  } catch (error) {
    console.error('공지사항 삭제 오류:', error)
    return NextResponse.json(
      { error: '공지사항을 삭제하는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
