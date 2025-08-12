# Blueye - 글로벌 프리미엄 라이프 솔루션

Blueye는 해외 부동산 투자부터 현지 생활 지원까지, 글로벌 라이프스타일을 위한 종합 솔루션을 제공하는 프리미엄 브랜드입니다.

## 🚀 주요 기능

- **다국어 지원**: 한국어, 영어, 중국어
- **프리미엄 디자인**: 럭셔리하고 신뢰감 있는 UI/UX
- **반응형 웹사이트**: 모든 디바이스에서 최적화된 경험
- **최신 기술 스택**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Supabase 백엔드**: 실시간 데이터베이스 및 인증
- **Framer Motion**: 부드러운 애니메이션과 인터랙션

## 🎯 타겟 고객

- **은퇴 이민**: 안전하고 풍요로운 은퇴 생활을 위한 해외 이민 지원
- **해외 투자**: 글로벌 자산 분산을 통한 안정적인 투자 포트폴리오
- **한달살기**: 계절별 현지 생활을 통한 새로운 라이프스타일 경험
- **자산 분배**: 효율적인 글로벌 자산 분배 및 세무 최적화

## 🛠 기술 스택

### Frontend
- **Next.js 15** - React 프레임워크
- **React 19** - 사용자 인터페이스 라이브러리
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **Framer Motion** - 애니메이션 라이브러리
- **Lucide React** - 아이콘 라이브러리
- **Radix UI** - 접근성 우선 UI 컴포넌트

### Backend & Database
- **Supabase** - 실시간 데이터베이스 및 인증
- **PostgreSQL** - 관계형 데이터베이스

### Internationalization
- **next-intl** - 다국어 지원

### Deployment
- **Vercel** - 클라우드 플랫폼

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone <repository-url>
cd blueye-homepage
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
```bash
cp env.example .env.local
```

`.env.local` 파일에 Supabase 설정을 추가하세요:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 🌐 다국어 지원

- **한국어**: `/ko`
- **영어**: `/en`
- **중국어**: `/zh`

기본 언어는 한국어로 설정되어 있습니다.

## 📁 프로젝트 구조

```
src/
├── app/
│   └── [locale]/
│       ├── layout.tsx      # 다국어 레이아웃
│       ├── page.tsx        # 메인 페이지
│       └── globals.css     # 글로벌 스타일
├── components/
│   ├── ui/                 # 재사용 가능한 UI 컴포넌트
│   ├── navigation.tsx      # 네비게이션
│   ├── hero.tsx           # 히어로 섹션
│   ├── services.tsx       # 서비스 섹션
│   ├── target-audience.tsx # 타겟 고객 섹션
│   ├── cta.tsx            # CTA 섹션
│   └── footer.tsx         # 푸터
├── lib/
│   ├── utils.ts           # 유틸리티 함수
│   └── supabase.ts        # Supabase 설정
└── i18n.ts               # 다국어 설정

messages/
├── ko.json               # 한국어 메시지
├── en.json               # 영어 메시지
└── zh.json               # 중국어 메시지
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: Blue gradient (#6366f1 to #4f46e5)
- **Secondary**: Gray scale (#f8fafc to #0f172a)
- **Accent**: Gold (#eab308)

### 타이포그래피
- **Sans**: Inter (UI 텍스트)
- **Serif**: Playfair Display (제목)

### 애니메이션
- **Framer Motion**: 부드러운 페이지 전환 및 인터랙션
- **Tailwind CSS**: 호버 효과 및 마이크로 애니메이션

## 🚀 배포

### Vercel 배포
1. Vercel 계정 생성
2. GitHub 저장소 연결
3. 환경 변수 설정
4. 자동 배포

### 환경 변수 설정 (Vercel)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 📝 스크립트

```bash
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 실행
npm run lint         # ESLint 실행
npm run type-check   # TypeScript 타입 체크
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 연락처

- **이메일**: info@blueye.com
- **전화**: 02-1234-5678
- **주소**: 서울특별시 강남구 테헤란로 123

---

© 2024 Blueye. All rights reserved.
