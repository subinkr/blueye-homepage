export interface Country {
  code: string
  lat: number
  lon: number
  color: string
  image: string
  cameraPosition: {
    x: number
    y: number
    z: number
  }
  cameraTarget: {
    x: number
    y: number
    z: number
  }
  earthRotation: {
    x: number // X축 회전각 (라디안)
    y: number // Y축 회전각 (라디안)
  }
  features: Array<{
    key: string
    title: string
    description: string
  }>
}

// 국가 이름을 가져오는 유틸리티 함수
export const getCountryName = (code: string, locale: string = 'ko'): string => {
  const countryNames: Record<string, Record<string, string>> = {
    ko: {
      dubai: '두바이',
      hochiminh: '호치민',
      johorbahru: '조호바루',
      phnompenh: '프놈펜',
      shanghai: '상하이',
      seoul: '서울',
      newyork: '뉴욕'
    },
    en: {
      dubai: 'Dubai',
      hochiminh: 'Ho Chi Minh',
      johorbahru: 'Johor Bahru',
      phnompenh: 'Phnom Penh',
      shanghai: 'Shanghai',
      seoul: 'Seoul',
      newyork: 'New York'
    },
    zh: {
      dubai: '迪拜',
      hochiminh: '胡志明市',
      johorbahru: '新山',
      phnompenh: '金边',
      shanghai: '上海',
      seoul: '首尔',
      newyork: '纽约'
    }
  }
  
  return countryNames[locale]?.[code] || code
}

export const countries: Country[] = [
  {
    code: 'dubai',
    lat: 25.2,
    lon: 55.3,
    color: '#ffd700',
    image: '/images/countries/dubai.jpg',
    cameraPosition: { x: 2.8, y: 0.3, z: 2.5 },
    cameraTarget: { x: 0.2, y: 0.1, z: 0.8 },
    earthRotation: { x: -5 * Math.PI / 180, y: 30 * Math.PI / 180 },
    features: [
      {
        key: 'gdpGrowth',
        title: 'GDP 성장률',
        description: '연평균 4.2%의 안정적인 경제 성장률을 기록하며 중동 지역의 경제 중심지로 자리잡고 있습니다.'
      },
      {
        key: 'foreignInvestment',
        title: '외국인 투자',
        description: '2023년 기준 외국인 직접투자(FDI) 1,850억 달러로 중동 최대 투자 유치 도시입니다.'
      },
      {
        key: 'tourism',
        title: '관광 산업',
        description: '연간 관광객 1,680만 명을 유치하며, 관광 수입이 GDP의 12%를 차지하는 주요 산업입니다.'
      }
    ]
  },
  {
    code: 'hochiminh',
    lat: 10.8,
    lon: 106.6,
    color: '#ff8c00',
    image: '/images/countries/vietnam.jpg',
    cameraPosition: { x: -1.2, y: 0.4, z: 2.8 },
    cameraTarget: { x: -0.3, y: 0.2, z: 0.9 },
    earthRotation: { x: 10 * Math.PI / 180, y: -20 * Math.PI / 180 },
    features: [
      {
        key: 'gdpGrowth',
        title: 'GDP 성장률',
        description: '2023년 GDP 성장률 8.2%로 동남아시아 최고 수준의 경제 성장을 달성했습니다.'
      },
      {
        key: 'population',
        title: '인구 구조',
        description: '평균 연령 31세의 젊은 인구로 구성되어 있으며, 경제활동인구 비율이 68%입니다.'
      },
      {
        key: 'startup',
        title: '스타트업 생태계',
        description: '2023년 기준 2,800개 이상의 스타트업이 활동하며, 벤처캐피탈 투자 규모가 15억 달러를 기록합니다.'
      }
    ]
  },
  {
    code: 'johorbahru',
    lat: 1.5,
    lon: 103.7,
    color: '#ff69b4',
    image: '/images/countries/malaysia.jpg',
    cameraPosition: { x: -0.5, y: 0.6, z: 2.2 },
    cameraTarget: { x: -0.1, y: 0.3, z: 0.7 },
    earthRotation: { x: 20 * Math.PI / 180, y: -15 * Math.PI / 180 },
    features: [
      {
        key: 'economicGrowth',
        title: '경제 성장률',
        description: '2023년 경제 성장률 6.8%로 말레이시아 내 최고 성장률을 기록하고 있습니다.'
      },
      {
        key: 'manufacturing',
        title: '제조업 중심',
        description: 'GDP의 45%를 제조업이 차지하며, 전자제품 수출이 전체 수출의 38%를 차지합니다.'
      },
      {
        key: 'education',
        title: '교육 인프라',
        description: '국제학교 45개, 대학교 12개가 운영되며, 싱가포르와 인접한 교육 허브로 자리잡고 있습니다.'
      }
    ]
  },
  {
    code: 'phnompenh',
    lat: 11.6,
    lon: 104.9,
    color: '#32cd32',
    image: '/images/countries/cambodia.jpg',
    cameraPosition: { x: -0.8, y: 0.5, z: 2.6 },
    cameraTarget: { x: -0.2, y: 0.25, z: 0.85 },
    earthRotation: { x: 10 * Math.PI / 180, y: -15 * Math.PI / 180 },
    features: [
      {
        key: 'gdpGrowth',
        title: 'GDP 성장률',
        description: '2023년 GDP 성장률 7.1%로 동남아시아에서 가장 빠른 경제 성장을 보여주고 있습니다.'
      },
      {
        key: 'population',
        title: '인구 구조',
        description: '평균 연령 25세의 매우 젊은 인구로 구성되어 있으며, 경제활동인구 비율이 72%입니다.'
      },
      {
        key: 'culture',
        title: '문화 유산',
        description: '유네스코 세계문화유산 3곳을 보유하며, 연간 문화 관광객 280만 명이 방문하는 문화 중심지입니다.'
      }
    ]
  },
  {
    code: 'shanghai',
    lat: 31.2,
    lon: 121.5,
    color: '#ff4500',
    image: '/images/countries/china.jpg',
    cameraPosition: { x: -1.5, y: 0.2, z: 2.0 },
    cameraTarget: { x: -0.4, y: 0.1, z: 0.6 },
    earthRotation: { x: -10 * Math.PI / 180, y: -30 * Math.PI / 180 },
    features: [
      {
        key: 'gdpSize',
        title: 'GDP 규모',
        description: '2023년 GDP 4,720억 달러로 중국 최대 경제 도시이며, 세계 3위 경제 도시입니다.'
      },
      {
        key: 'financialCenter',
        title: '금융 중심지',
        description: '상하이 증권거래소 시가총액 7.2조 달러로 아시아 최대 금융 시장을 보유하고 있습니다.'
      },
      {
        key: 'globalCompanies',
        title: '글로벌 기업',
        description: '포춘 500대 기업 480개가 진출해 있으며, 세계 최대 자유무역항을 운영하는 글로벌 비즈니스 허브입니다.'
      }
    ]
  },
  {
    code: 'seoul',
    lat: 37.5,
    lon: 127.0,
    color: '#ff6b6b',
    image: '/images/countries/korea.jpg',
    cameraPosition: { x: -1.8, y: 0.1, z: 1.8 },
    cameraTarget: { x: -0.45, y: 0.05, z: 0.55 },
    earthRotation: { x: -20 * Math.PI / 180, y: -32 * Math.PI / 180 },
    features: [
      {
        key: 'gdpSize',
        title: 'GDP 규모',
        description: '2023년 GDP 3,850억 달러로 한국 경제의 50%를 차지하며, 아시아 4위 경제 도시입니다.'
      },
      {
        key: 'techInnovation',
        title: '기술 혁신',
        description: 'R&D 투자 비율 4.2%로 OECD 최고 수준이며, 특허 출원 건수 연간 15만 건을 기록합니다.'
      },
      {
        key: 'digitalInfra',
        title: '디지털 인프라',
        description: '5G 네트워크 보급률 95%, 초고속 인터넷 속도 세계 1위로 디지털 혁신의 선두주자입니다.'
      }
    ]
  },
  {
    code: 'newyork',
    lat: 40.7,
    lon: -74.0,
    color: '#4169e1',
    image: '/images/countries/usa.jpg',
    cameraPosition: { x: 2.2, y: 0.3, z: 1.5 },
    cameraTarget: { x: 0.5, y: 0.15, z: 0.4 },
    earthRotation: { x: -50 * Math.PI / 180, y: 160 * Math.PI / 180 },
    features: [
      {
        key: 'gdpSize',
        title: 'GDP 규모',
        description: '2023년 GDP 1.8조 달러로 세계 최대 경제 도시이며, 미국 경제의 8%를 차지합니다.'
      },
      {
        key: 'financialCenter',
        title: '금융 중심지',
        description: '뉴욕증권거래소 시가총액 30조 달러로 세계 최대 금융 시장을 보유하고 있습니다.'
      },
      {
        key: 'globalCompanies',
        title: '글로벌 기업',
        description: '포춘 500대 기업 65개가 본사를 두고 있으며, 세계 최대 비즈니스 허브로 자리잡고 있습니다.'
      }
    ]
  },
]
