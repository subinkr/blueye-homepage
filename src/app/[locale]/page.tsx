import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blueye - 글로벌 프리미엄 라이프 솔루션',
  description: '해외 부동산 투자부터 현지 생활 지원까지, Blueye와 함께하는 글로벌 라이프스타일',
  openGraph: {
    title: 'Blueye - 글로벌 프리미엄 라이프 솔루션',
    description: '해외 부동산 투자부터 현지 생활 지원까지, Blueye와 함께하는 글로벌 라이프스타일',
    url: 'https://blueye.com',
    images: ['/api/og'],
  },
  twitter: {
    title: 'Blueye - 글로벌 프리미엄 라이프 솔루션',
    description: '해외 부동산 투자부터 현지 생활 지원까지, Blueye와 함께하는 글로벌 라이프스타일',
    images: ['/api/og'],
  },
  other: {
    'kakao:title': 'Blueye - 글로벌 프리미엄 라이프 솔루션',
    'kakao:description': '해외 부동산 투자부터 현지 생활 지원까지, Blueye와 함께하는 글로벌 라이프스타일',
    'kakao:image': 'https://blueye.com/api/og',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
      </main>
    </div>
  )
}
