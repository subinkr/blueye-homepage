'use client'

import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  GraduationCap, 
  Briefcase, 
  Palette, 
  Activity, 
  Users,
  ArrowLeft,
  Trophy,
  Star,
  Phone,
  Mail,
  MessageCircle,
  TrendingUp,
  Crown
} from 'lucide-react'
import { useRouter } from 'next/navigation'

const lifestyleCategories = [
  {
    key: 'retirement',
    icon: Heart,
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    title: '자유로운 은퇴',
    description: '스트레스 없는 환경에서 여유롭고 풍요로운 은퇴 생활',
    features: ['안전한 환경', '저렴한 생활비', '친절한 커뮤니티', '의료 서비스']
  },
  {
    key: 'education',
    icon: GraduationCap,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    title: '글로벌 교육',
    description: '자녀를 글로벌 인재로 키우는 최고의 교육 환경',
    features: ['세계적 교육 시스템', '다문화 환경', '영어 교육', '국제 학교']
  },
  {
    key: 'business',
    icon: Briefcase,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    title: '글로벌 비즈니스',
    description: '새로운 시장에서 비즈니스 기회를 찾는 도전적인 삶',
    features: ['성장하는 시장', '정부 지원', '세무 혜택', '네트워킹']
  },
  {
    key: 'culture',
    icon: Palette,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    title: '문화 체험',
    description: '다양한 문화를 경험하며 풍요로운 삶을 살아가는 여유',
    features: ['다양한 문화', '자연 환경', '레저 활동', '예술 문화']
  },
  {
    key: 'health',
    icon: Activity,
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    title: '건강한 삶',
    description: '깨끗한 환경과 건강한 식습관으로 건강한 삶을 누리는 선택',
    features: ['깨끗한 환경', '신선한 식재료', '의료 시스템', '웰빙 문화']
  },
  {
    key: 'community',
    icon: Users,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    title: '커뮤니티',
    description: '현지 한국인 커뮤니티와 함께하는 따뜻한 이웃 관계',
    features: ['한국인 커뮤니티', '정기 모임', '정보 공유', '상호 지원']
  },
  {
    key: 'investment',
    icon: TrendingUp,
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    title: '투자 성장',
    description: '부동산 투자를 통한 자산 증식과 안정적인 수익 창출',
    features: ['부동산 투자', '자산 증식', '수익 창출', '포트폴리오']
  },
  {
    key: 'luxury',
    icon: Crown,
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    title: '럭셔리 라이프',
    description: '최고급 시설과 서비스로 프리미엄한 삶을 누리는 선택',
    features: ['프리미엄 시설', '고급 서비스', '럭셔리 환경', 'VIP 혜택']
  }
]

// 라이프스타일별 추천 국가
const recommendedCountries = {
  retirement: [
    { name: '말레이시아', score: 95, reason: '저렴한 생활비와 안전한 환경', image: '/images/countries/malaysia.jpg' },
    { name: '캄보디아', score: 88, reason: '따뜻한 기후와 친절한 커뮤니티', image: '/images/countries/cambodia.jpg' },
    { name: '베트남', score: 82, reason: '다양한 문화와 편리한 의료 서비스', image: '/images/countries/vietnam.jpg' }
  ],
  education: [
    { name: '중국', score: 96, reason: '강력한 교육 시스템과 글로벌 기회', image: '/images/countries/china.jpg' },
    { name: '말레이시아', score: 90, reason: '국제학교와 영어 교육 환경', image: '/images/countries/malaysia.jpg' },
    { name: '베트남', score: 85, reason: '성장하는 교육 환경과 다문화 체험', image: '/images/countries/vietnam.jpg' }
  ],
  business: [
    { name: '베트남', score: 96, reason: '높은 경제 성장률과 정부 지원', image: '/images/countries/vietnam.jpg' },
    { name: '캄보디아', score: 92, reason: '새로운 시장 기회와 세무 혜택', image: '/images/countries/cambodia.jpg' },
    { name: '말레이시아', score: 85, reason: '안정적인 비즈니스 환경', image: '/images/countries/malaysia.jpg' }
  ],
  culture: [
    { name: '캄보디아', score: 98, reason: '풍부한 문화 유산과 자연 환경', image: '/images/countries/cambodia.jpg' },
    { name: '베트남', score: 94, reason: '다양한 문화와 예술 활동', image: '/images/countries/vietnam.jpg' },
    { name: '말레이시아', score: 87, reason: '다문화 사회와 레저 활동', image: '/images/countries/malaysia.jpg' }
  ],
  health: [
    { name: '말레이시아', score: 94, reason: '깨끗한 환경과 현대적 의료 시스템', image: '/images/countries/malaysia.jpg' },
    { name: '베트남', score: 88, reason: '자연 치유 환경과 웰빙 문화', image: '/images/countries/vietnam.jpg' },
    { name: '캄보디아', score: 84, reason: '평화로운 환경과 전통 의료', image: '/images/countries/cambodia.jpg' }
  ],
  community: [
    { name: '말레이시아', score: 96, reason: '활발한 한국인 커뮤니티', image: '/images/countries/malaysia.jpg' },
    { name: '베트남', score: 90, reason: '성장하는 한국인 네트워크', image: '/images/countries/vietnam.jpg' },
    { name: '캄보디아', score: 88, reason: '친밀한 한국인 커뮤니티', image: '/images/countries/cambodia.jpg' }
  ],
  investment: [
    { name: '두바이', score: 98, reason: '세계적 부동산 투자 환경과 높은 수익률', image: '/images/countries/dubai.jpg' },
    { name: '베트남', score: 92, reason: '높은 성장률과 투자 기회', image: '/images/countries/vietnam.jpg' },
    { name: '말레이시아', score: 88, reason: '안정적인 부동산 시장과 정부 지원', image: '/images/countries/malaysia.jpg' }
  ],
  luxury: [
    { name: '두바이', score: 98, reason: '세계 최고급 럭셔리 환경과 서비스', image: '/images/countries/dubai.jpg' },
    { name: '중국', score: 94, reason: '럭셔리 브랜드와 고급 문화', image: '/images/countries/china.jpg' },
    { name: '말레이시아', score: 88, reason: '프리미엄 시설과 고급 서비스', image: '/images/countries/malaysia.jpg' }
  ]
}

export default function LifestyleQuizPage() {
  const locale = useLocale()
  const router = useRouter()
  
  const [currentRound, setCurrentRound] = useState(1)
  const [participants, setParticipants] = useState<string[]>(lifestyleCategories.map(cat => cat.key))
  const [winners, setWinners] = useState<string[]>([])
  const [currentMatch, setCurrentMatch] = useState<[string, string] | null>(null)
  const [finalWinner, setFinalWinner] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectionHistory, setSelectionHistory] = useState<string[]>([])

  // 라운드별 매치 설정
  const getMatches = (participants: string[]) => {
    const matches: [string, string][] = []
    
    // 짝수 개일 때는 정상적으로 매치 생성
    for (let i = 0; i < participants.length; i += 2) {
      if (i + 1 < participants.length) {
        matches.push([participants[i], participants[i + 1]])
      }
    }
    
    return matches
  }

  // 선택 처리
  const handleSelection = (selected: string) => {
    if (isProcessing) return
    
    console.log('Selection:', selected, 'Round:', currentRound)
    setIsProcessing(true)
    
    // 선택 기록에 추가
    setSelectionHistory(prev => [...prev, selected])
    
    const newWinners = [...winners, selected]
    setWinners(newWinners)
    
    // 현재 라운드의 매치들을 가져옴
    const matches = getMatches(participants)
    const currentMatchIndex = matches.findIndex(match => 
      (match[0] === currentMatch?.[0] && match[1] === currentMatch?.[1]) ||
      (match[0] === currentMatch?.[1] && match[1] === currentMatch?.[0])
    )
    
    console.log('Current participants:', participants)
    console.log('Matches:', matches)
    console.log('Current match:', currentMatch)
    console.log('Current match index:', currentMatchIndex)
    console.log('New winners:', newWinners)
    
    if (currentMatchIndex < matches.length - 1) {
      // 다음 매치로
      console.log('Moving to next match')
      setCurrentMatch(matches[currentMatchIndex + 1])
      setIsProcessing(false)
    } else {
      // 라운드 완료
      console.log('Round completed')
      
      // 홀수 개가 남았을 때 부전승 처리
      let finalWinners = newWinners
      if (participants.length % 2 === 1) {
        // 마지막 하나는 부전승으로 자동 진출
        const autoAdvance = participants[participants.length - 1]
        finalWinners = [...newWinners, autoAdvance]
      }
      
      if (finalWinners.length === 1) {
        // 최종 우승자
        console.log('Final winner:', finalWinners[0])
        setFinalWinner(finalWinners[0])
        setIsComplete(true)
      } else {
        // 다음 라운드로
        console.log('Moving to next round')
        setTimeout(() => {
          setCurrentRound(currentRound + 1)
          setParticipants(finalWinners)
          setWinners([])
          const nextMatches = getMatches(finalWinners)
          if (nextMatches.length > 0) {
            setCurrentMatch(nextMatches[0])
          }
          setIsProcessing(false)
        }, 1000)
      }
    }
  }

  // 페이지 초기화
  useEffect(() => {
    const initialMatches = getMatches(participants)
    setCurrentMatch(initialMatches[0])
  }, [])

  // CTA 섹션으로 스크롤
  const scrollToCTA = () => {
    const ctaSection = document.getElementById('cta')
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // 선택 기록을 기반으로 국가 점수 계산
  const calculateCountryScores = (lifestyleType: string) => {
    const baseRecommendations = recommendedCountries[lifestyleType as keyof typeof recommendedCountries] || []
    const scores: { [key: string]: number } = {}
    
    // 기본 점수 설정
    baseRecommendations.forEach(country => {
      scores[country.name] = country.score
    })
    
    // 선택 기록에 따른 점수 조정
    selectionHistory.forEach((selectedLifestyle, index) => {
      const round = Math.floor(index / 2) + 1
      const roundWeight = 1 + (round * 0.1) // 라운드가 진행될수록 가중치 증가
      
      const selectedRecommendations = recommendedCountries[selectedLifestyle as keyof typeof recommendedCountries] || []
      selectedRecommendations.forEach(country => {
        const bonusScore = Math.round(country.score * 0.1 * roundWeight) // 보너스 점수
        if (scores[country.name]) {
          scores[country.name] += bonusScore
        } else {
          scores[country.name] = bonusScore
        }
      })
    })
    
    // 점수 순으로 정렬
    const sortedCountries = Object.entries(scores)
      .map(([name, score]) => ({ name, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
    
    // 최고 점수를 100점으로 하고 나머지를 비례적으로 조정
    const maxScore = sortedCountries[0]?.score || 100
    const normalizedCountries = sortedCountries.map(country => {
      const normalizedScore = Math.round((country.score / maxScore) * 100)
      const baseCountry = baseRecommendations.find(c => c.name === country.name)
      return {
        name: country.name,
        score: normalizedScore,
        reason: baseCountry?.reason || '선택 과정에서 높은 점수를 받은 국가',
        image: baseCountry?.image || `/images/countries/${country.name.toLowerCase()}.jpg`
      }
    })
    
    return normalizedCountries
  }

  // 홈으로 돌아가기
  const goHome = () => {
    router.push(`/${locale}`)
  }

  if (isComplete && finalWinner) {
    const winnerCategory = lifestyleCategories.find(cat => cat.key === finalWinner)
    const recommendations = calculateCountryScores(finalWinner)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative">
        {/* Global Background Animation */}
        <div className="fixed inset-0 pointer-events-none">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 80%, rgba(5, 150, 105, 0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)"
              ]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0"
          />
        </div>

        <Navigation />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-6 sm:mb-8">
              <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-500 mx-auto mb-3 sm:mb-4" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-3 sm:mb-4">
                축하합니다! 🎉
              </h1>
              <p className="text-lg sm:text-xl font-korean text-gray-300 mb-6 sm:mb-8">
                당신의 이상적인 라이프스타일을 찾았습니다
              </p>
            </div>

            {/* 라이프스타일 결과 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl border-2 border-gray-100 mb-12 sm:mb-16"
            >
              <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br ${winnerCategory?.color} flex items-center justify-center mx-auto mb-4 sm:mb-6`}>
                {winnerCategory && <winnerCategory.icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />}
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-3 sm:mb-4">
                {winnerCategory?.title}
              </h2>
              
              <p className="text-sm sm:text-base md:text-lg font-korean text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                {winnerCategory?.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {winnerCategory?.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-xs sm:text-sm text-gray-600 bg-gray-50 rounded-lg p-2 sm:p-3">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mr-2 flex-shrink-0" />
                    <span className="font-korean">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 추천 국가 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6 sm:mb-8 text-center">
                추천 국가
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {recommendations.map((country, index) => (
                  <motion.div
                    key={country.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <h3 className="text-lg sm:text-xl font-display font-bold text-gray-900">
                        {country.name}
                      </h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-1" />
                        <span className="font-bold text-gray-900 text-sm sm:text-base">{country.score}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 font-korean mb-3 sm:mb-4 text-sm sm:text-base">
                      {country.reason}
                    </p>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${country.score}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 상담 신청하기 버튼 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-16"
            >
              <Button 
                onClick={() => window.open('https://pf.kakao.com/_qpRxjxb/chat', '_blank')}
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium px-6 sm:px-8 md:px-12 py-3 sm:py-4 text-base sm:text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[200px]"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                <span className="whitespace-nowrap">상담 신청하기</span>
              </Button>
            </motion.div>

            {/* 네비게이션 */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                onClick={() => {
                  setCurrentRound(1)
                  setParticipants(lifestyleCategories.map(cat => cat.key))
                  setWinners([])
                  setFinalWinner(null)
                  setIsComplete(false)
                  setIsProcessing(false)
                  setSelectionHistory([])
                  const initialMatches = getMatches(lifestyleCategories.map(cat => cat.key))
                  setCurrentMatch(initialMatches[0])
                }}
                size="lg" 
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 font-medium px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                퀴즈 다시하기
              </Button>
              <Button 
                onClick={goHome}
                size="lg" 
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 font-medium px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
              >
                홈으로 돌아가기
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative">
      {/* Global Background Animation */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(5, 150, 105, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
        />
      </div>

      <Navigation />
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            라이프스타일 월드컵
          </h1>
          <p className="text-lg sm:text-xl font-korean text-gray-300 mb-6">
            당신에게 가장 적합한 라이프스타일을 찾아보세요
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <span>라운드 {currentRound}</span>
            <span>•</span>
            <span>{winners.length} / {participants.length % 2 === 1 ? Math.floor(participants.length / 2) : Math.ceil(participants.length / 2)} 완료</span>
          </div>
        </motion.div>

        {/* Match */}
        {currentMatch && (
          <motion.div
            key={`${currentMatch[0]}-${currentMatch[1]}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto"
          >
            {currentMatch.map((categoryKey, index) => {
              const category = lifestyleCategories.find(cat => cat.key === categoryKey)
              if (!category) return null

              return (
                <motion.div
                  key={`${categoryKey}-${index}-${currentRound}`}
                  initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group ${isProcessing ? 'pointer-events-none' : 'cursor-pointer'}`}
                  onClick={() => handleSelection(categoryKey)}
                >
                  <div className={`
                    relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl hover-lift border-2 
                    transition-all duration-300 h-full
                    ${category.borderColor} hover:shadow-2xl hover:scale-105
                    ${isProcessing ? 'opacity-50' : ''}
                  `}>
                    {/* Icon */}
                    <div className={`
                      w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br ${category.color} 
                      flex items-center justify-center mb-4 sm:mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300
                    `}>
                      <category.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-gray-900 mb-3 sm:mb-4">
                      {category.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg font-korean text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 sm:space-y-3">
                      {category.features.slice(0, 2).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-xs sm:text-sm text-gray-600">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mr-2 flex-shrink-0" />
                          <span className="font-korean">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Selection Indicator */}
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs sm:text-sm font-bold">VS</span>
                    </div>

                    {/* Background Pattern */}
                    <div className={`
                      absolute inset-0 rounded-3xl ${category.bgColor} opacity-0 
                      group-hover:opacity-10 transition-opacity duration-300 -z-10
                    `} />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button 
            onClick={goHome}
            size="lg"
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 font-medium px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            홈으로 돌아가기
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
