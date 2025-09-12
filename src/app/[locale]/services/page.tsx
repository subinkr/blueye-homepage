'use client'

import ServicesIntegratedSection from '@/components/services-integrated-section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '서비스 - Blueye',
  description: '해외 부동산 투자, 현지 생활 지원, 글로벌 라이프스타일 컨설팅 서비스를 제공합니다.',
  openGraph: {
    title: '서비스 - Blueye',
    description: '해외 부동산 투자, 현지 생활 지원, 글로벌 라이프스타일 컨설팅 서비스를 제공합니다.',
    url: 'https://blueye.com/services',
    images: ['/api/og'],
  },
  twitter: {
    title: '서비스 - Blueye',
    description: '해외 부동산 투자, 현지 생활 지원, 글로벌 라이프스타일 컨설팅 서비스를 제공합니다.',
    images: ['/api/og'],
  },
  other: {
    'kakao:title': '서비스 - Blueye',
    'kakao:description': '해외 부동산 투자, 현지 생활 지원, 글로벌 라이프스타일 컨설팅 서비스를 제공합니다.',
    'kakao:image': 'https://blueye.com/api/og',
  },
}

export default function ServicesPage() {
  return <ServicesIntegratedSection />
}
