export interface Country {
  name: string
  nameEn: string
  code: string
  lat: number
  lon: number
  color: string
  image: string
  description: string
  features: Array<{
    title: string
    description: string
  }>
}

export const countries: Country[] = [
  {
    name: '두바이',
    nameEn: 'Dubai',
    code: 'dubai',
    lat: 25.2,
    lon: 55.3,
    color: '#ffd700',
    image: '/images/countries/dubai.jpg',
    description: '미래를 선도하는 중동의 허브, 두바이에서 Blueye와 함께 혁신적인 비즈니스 기회를 발견하세요.',
    features: [
      {
        title: 'GDP 성장률',
        description: '연평균 4.2%의 안정적인 경제 성장률을 기록하며 중동 지역의 경제 중심지로 자리잡고 있습니다.'
      },
      {
        title: '외국인 투자',
        description: '2023년 기준 외국인 직접투자(FDI) 1,850억 달러로 중동 최대 투자 유치 도시입니다.'
      },
      {
        title: '관광 산업',
        description: '연간 관광객 1,680만 명을 유치하며, 관광 수입이 GDP의 12%를 차지하는 주요 산업입니다.'
      }
    ]
  },
  {
    name: '호치민',
    nameEn: 'Ho Chi Minh',
    code: 'hochiminh',
    lat: 10.8,
    lon: 106.6,
    color: '#ff8c00',
    image: '/images/countries/vietnam.jpg',
    description: '동남아시아의 떠오르는 경제 중심지, 호치민에서 Blueye와 함께 역동적인 성장을 경험하세요.',
    features: [
      {
        title: 'GDP 성장률',
        description: '2023년 GDP 성장률 8.2%로 동남아시아 최고 수준의 경제 성장을 달성했습니다.'
      },
      {
        title: '인구 구조',
        description: '평균 연령 31세의 젊은 인구로 구성되어 있으며, 경제활동인구 비율이 68%입니다.'
      },
      {
        title: '스타트업 생태계',
        description: '2023년 기준 2,800개 이상의 스타트업이 활동하며, 벤처캐피탈 투자 규모가 15억 달러를 기록합니다.'
      }
    ]
  },
  {
    name: '조호바루',
    nameEn: 'Johor Bahru',
    code: 'johorbahru',
    lat: 1.5,
    lon: 103.7,
    color: '#ff69b4',
    image: '/images/countries/malaysia.jpg',
    description: '말레이시아의 남부 관문, 조호바루에서 Blueye와 함께 동남아시아의 새로운 기회를 발견하세요.',
    features: [
      {
        title: '경제 성장률',
        description: '2023년 경제 성장률 6.8%로 말레이시아 내 최고 성장률을 기록하고 있습니다.'
      },
      {
        title: '제조업 중심',
        description: 'GDP의 45%를 제조업이 차지하며, 전자제품 수출이 전체 수출의 38%를 차지합니다.'
      },
      {
        title: '교육 인프라',
        description: '국제학교 45개, 대학교 12개가 운영되며, 싱가포르와 인접한 교육 허브로 자리잡고 있습니다.'
      }
    ]
  },
  {
    name: '프놈펜',
    nameEn: 'Phnom Penh',
    code: 'phnompenh',
    lat: 11.6,
    lon: 104.9,
    color: '#32cd32',
    image: '/images/countries/cambodia.jpg',
    description: '캄보디아의 수도, 프놈펜에서 Blueye와 함께 새로운 시장의 무한한 가능성을 경험하세요.',
    features: [
      {
        title: 'GDP 성장률',
        description: '2023년 GDP 성장률 7.1%로 동남아시아에서 가장 빠른 경제 성장을 보여주고 있습니다.'
      },
      {
        title: '인구 구조',
        description: '평균 연령 25세의 매우 젊은 인구로 구성되어 있으며, 경제활동인구 비율이 72%입니다.'
      },
      {
        title: '문화 유산',
        description: '유네스코 세계문화유산 3곳을 보유하며, 연간 문화 관광객 280만 명이 방문하는 문화 중심지입니다.'
      }
    ]
  },
  {
    name: '상하이',
    nameEn: 'Shanghai',
    code: 'shanghai',
    lat: 31.2,
    lon: 121.5,
    color: '#ff4500',
    image: '/images/countries/china.jpg',
    description: '중국의 경제 수도, 상하이에서 Blueye와 함께 세계 최대 시장의 중심에서 비즈니스를 확장하세요.',
    features: [
      {
        title: 'GDP 규모',
        description: '2023년 GDP 4,720억 달러로 중국 최대 경제 도시이며, 세계 3위 경제 도시입니다.'
      },
      {
        title: '금융 중심지',
        description: '상하이 증권거래소 시가총액 7.2조 달러로 아시아 최대 금융 시장을 보유하고 있습니다.'
      },
      {
        title: '글로벌 기업',
        description: '포춘 500대 기업 480개가 진출해 있으며, 세계 최대 자유무역항을 운영하는 글로벌 비즈니스 허브입니다.'
      }
    ]
  },
  {
    name: '서울',
    nameEn: 'Seoul',
    code: 'seoul',
    lat: 37.5,
    lon: 127.0,
    color: '#ff6b6b',
    image: '/images/countries/korea.jpg',
    description: '혁신과 전통이 공존하는 아시아의 중심, 서울에서 Blueye와 함께 글로벌 라이프 솔루션의 새로운 경험을 시작하세요.',
    features: [
      {
        title: 'GDP 규모',
        description: '2023년 GDP 3,850억 달러로 한국 경제의 50%를 차지하며, 아시아 4위 경제 도시입니다.'
      },
      {
        title: '기술 혁신',
        description: 'R&D 투자 비율 4.2%로 OECD 최고 수준이며, 특허 출원 건수 연간 15만 건을 기록합니다.'
      },
      {
        title: '디지털 인프라',
        description: '5G 네트워크 보급률 95%, 초고속 인터넷 속도 세계 1위로 디지털 혁신의 선두주자입니다.'
      }
    ]
  },
]
