import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { categoryOrders } = body

    if (!categoryOrders || !Array.isArray(categoryOrders)) {
      return NextResponse.json(
        { error: '카테고리 순서 데이터가 올바르지 않습니다.' },
        { status: 400 }
      )
    }

    // Supabase RPC 함수 호출
    const { error } = await supabase.rpc('update_category_orders', {
      category_orders: categoryOrders
    })

    if (error) {
      console.error('카테고리 순서 업데이트 오류:', error)
      throw new Error(`RPC 오류: ${error.message}`)
    }

    return NextResponse.json({ message: '카테고리 순서가 업데이트되었습니다.' })
  } catch (error) {
    console.error('카테고리 순서 변경 오류:', error)
    return NextResponse.json(
      {
        error: '카테고리 순서를 변경하는 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
