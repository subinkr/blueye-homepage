import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'
import { deleteImage } from '@/lib/storage'

// GET: 특정 매거진 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data, error } = await supabase
      .from('magazines')
      .select(`
        *,
        category:categories(id, name)
      `)
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: '매거진을 찾을 수 없습니다.' },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('매거진 조회 오류:', error)
    return NextResponse.json(
      { error: '매거진을 조회하는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// PUT: 매거진 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, content, excerpt, cover_image, status, category_id, published_at } = body

    if (!title || !content || !excerpt || !cover_image) {
      return NextResponse.json(
        { error: '제목, 링크, 요약, 커버 이미지는 필수입니다.' },
        { status: 400 }
      )
    }

    const updateData: any = {
      title,
      content,
      excerpt,
      updated_at: new Date().toISOString()
    }

    if (category_id !== undefined) {
      updateData.category_id = category_id || null
    }

    if (cover_image !== undefined) {
      updateData.cover_image = cover_image
    }

    if (status !== undefined) {
      updateData.status = status
    }

    // published_at 처리
    if (published_at !== undefined) {
      if (published_at && published_at.trim()) {
        updateData.published_at = new Date(published_at).toISOString()
      } else if (status === 'published') {
        updateData.published_at = new Date().toISOString()
      } else {
        updateData.published_at = null
      }
    }

    const { data, error } = await supabase
      .from('magazines')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: '매거진을 찾을 수 없습니다.' },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('매거진 수정 오류:', error)
    return NextResponse.json(
      { error: '매거진을 수정하는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// DELETE: 매거진 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // 먼저 매거진 정보를 가져와서 이미지 경로 확인
    const { data: magazine, error: fetchError } = await supabase
      .from('magazines')
      .select('cover_image')
      .eq('id', id)
      .single()

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json(
          { error: '매거진을 찾을 수 없습니다.' },
          { status: 404 }
        )
      }
      throw fetchError
    }

    // 매거진 삭제
    const { error: deleteError } = await supabase
      .from('magazines')
      .delete()
      .eq('id', id)

    if (deleteError) {
      throw deleteError
    }

    // 이미지가 있으면 삭제
    if (magazine.cover_image) {
      try {
        // URL에서 파일 경로 추출
        const url = new URL(magazine.cover_image)
        const pathParts = url.pathname.split('/')
        const filePath = pathParts.slice(-2).join('/') // 'magazines/filename.ext'
        
        await deleteImage(filePath)
      } catch (imageError) {
        // 이미지 삭제 실패해도 매거진은 삭제되었으므로 계속 진행
      }
    }

    return NextResponse.json({ message: '매거진이 삭제되었습니다.' })
  } catch (error) {
    console.error('매거진 삭제 오류:', error)
    return NextResponse.json(
      { error: '매거진을 삭제하는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
