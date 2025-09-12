import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1e40af',
          backgroundImage: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            maxWidth: '1000px',
            margin: '0 40px',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#1e40af',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            Blueye
          </div>
          <div
            style={{
              fontSize: '32px',
              color: '#374151',
              textAlign: 'center',
              marginBottom: '20px',
              maxWidth: '800px',
              lineHeight: '1.2',
            }}
          >
            글로벌 프리미엄 라이프 솔루션
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#6b7280',
              textAlign: 'center',
              maxWidth: '700px',
              lineHeight: '1.4',
            }}
          >
            해외 부동산 투자부터 현지 생활 지원까지, Blueye와 함께하는 글로벌 라이프스타일
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
