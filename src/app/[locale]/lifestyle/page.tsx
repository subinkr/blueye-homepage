'use client'

import { useState, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
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

export default function LifestyleQuizPage() {
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations('lifestyleQuiz')
  
  const [currentRound, setCurrentRound] = useState(1)
  const [participants, setParticipants] = useState<string[]>(['retirement', 'education', 'business', 'culture', 'health', 'community', 'investment', 'luxury'])
  const [winners, setWinners] = useState<string[]>([])
  const [currentMatch, setCurrentMatch] = useState<[string, string] | null>(null)
  const [finalWinner, setFinalWinner] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectionHistory, setSelectionHistory] = useState<string[]>([])

  // 라이프스타일별 추천 국가 (모든 국가 점수 포함)
  const getRecommendedCountries = () => ({
    retirement: [
      { name: t('countries.malaysia'), score: 95, reason: t('reasons.retirement.malaysia'), image: '/images/countries/malaysia.jpg' },
      { name: t('countries.cambodia'), score: 92, reason: t('reasons.retirement.cambodia'), image: '/images/countries/cambodia.jpg' },
      { name: t('countries.vietnam'), score: 88, reason: t('reasons.retirement.vietnam'), image: '/images/countries/vietnam.jpg' },
      { name: t('countries.korea'), score: 82, reason: t('reasons.retirement.korea'), image: '/images/countries/korea.jpg' },
      { name: t('countries.china'), score: 78, reason: t('reasons.retirement.china'), image: '/images/countries/china.jpg' },
      { name: t('countries.dubai'), score: 75, reason: t('reasons.retirement.dubai'), image: '/images/countries/dubai.jpg' }
    ],
    education: [
      { name: t('countries.korea'), score: 96, reason: t('reasons.education.korea'), image: '/images/countries/korea.jpg' },
      { name: t('countries.china'), score: 94, reason: t('reasons.education.china'), image: '/images/countries/china.jpg' },
      { name: t('countries.malaysia'), score: 88, reason: t('reasons.education.malaysia'), image: '/images/countries/malaysia.jpg' },
      { name: t('countries.dubai'), score: 85, reason: t('reasons.education.dubai'), image: '/images/countries/dubai.jpg' },
      { name: t('countries.vietnam'), score: 82, reason: t('reasons.education.vietnam'), image: '/images/countries/vietnam.jpg' },
      { name: t('countries.cambodia'), score: 75, reason: t('reasons.education.cambodia'), image: '/images/countries/cambodia.jpg' }
    ],
    business: [
      { name: t('countries.dubai'), score: 98, reason: t('reasons.business.dubai'), image: '/images/countries/dubai.jpg' },
      { name: t('countries.vietnam'), score: 96, reason: t('reasons.business.vietnam'), image: '/images/countries/vietnam.jpg' },
      { name: t('countries.china'), score: 92, reason: t('reasons.business.china'), image: '/images/countries/china.jpg' },
      { name: t('countries.cambodia'), score: 88, reason: t('reasons.business.cambodia'), image: '/images/countries/cambodia.jpg' },
      { name: t('countries.malaysia'), score: 82, reason: t('reasons.business.malaysia'), image: '/images/countries/malaysia.jpg' },
      { name: t('countries.korea'), score: 78, reason: t('reasons.business.korea'), image: '/images/countries/korea.jpg' }
    ],
    culture: [
      { name: t('countries.china'), score: 98, reason: t('reasons.culture.china'), image: '/images/countries/china.jpg' },
      { name: t('countries.cambodia'), score: 95, reason: t('reasons.culture.cambodia'), image: '/images/countries/cambodia.jpg' },
      { name: t('countries.korea'), score: 92, reason: t('reasons.culture.korea'), image: '/images/countries/korea.jpg' },
      { name: t('countries.vietnam'), score: 88, reason: t('reasons.culture.vietnam'), image: '/images/countries/vietnam.jpg' },
      { name: t('countries.malaysia'), score: 82, reason: t('reasons.culture.malaysia'), image: '/images/countries/malaysia.jpg' },
      { name: t('countries.dubai'), score: 78, reason: t('reasons.culture.dubai'), image: '/images/countries/dubai.jpg' }
    ],
    health: [
      { name: t('countries.korea'), score: 96, reason: t('reasons.health.korea'), image: '/images/countries/korea.jpg' },
      { name: t('countries.malaysia'), score: 92, reason: t('reasons.health.malaysia'), image: '/images/countries/malaysia.jpg' },
      { name: t('countries.dubai'), score: 88, reason: t('reasons.health.dubai'), image: '/images/countries/dubai.jpg' },
      { name: t('countries.vietnam'), score: 85, reason: t('reasons.health.vietnam'), image: '/images/countries/vietnam.jpg' },
      { name: t('countries.china'), score: 82, reason: t('reasons.health.china'), image: '/images/countries/china.jpg' },
      { name: t('countries.cambodia'), score: 78, reason: t('reasons.health.cambodia'), image: '/images/countries/cambodia.jpg' }
    ],
    community: [
      { name: t('countries.korea'), score: 98, reason: t('reasons.community.korea'), image: '/images/countries/korea.jpg' },
      { name: t('countries.malaysia'), score: 94, reason: t('reasons.community.malaysia'), image: '/images/countries/malaysia.jpg' },
      { name: t('countries.vietnam'), score: 90, reason: t('reasons.community.vietnam'), image: '/images/countries/vietnam.jpg' },
      { name: t('countries.cambodia'), score: 86, reason: t('reasons.community.cambodia'), image: '/images/countries/cambodia.jpg' },
      { name: t('countries.china'), score: 82, reason: t('reasons.community.china'), image: '/images/countries/china.jpg' },
      { name: t('countries.dubai'), score: 78, reason: t('reasons.community.dubai'), image: '/images/countries/dubai.jpg' }
    ],
    investment: [
      { name: t('countries.dubai'), score: 98, reason: t('reasons.investment.dubai'), image: '/images/countries/dubai.jpg' },
      { name: t('countries.china'), score: 94, reason: t('reasons.investment.china'), image: '/images/countries/china.jpg' },
      { name: t('countries.vietnam'), score: 90, reason: t('reasons.investment.vietnam'), image: '/images/countries/vietnam.jpg' },
      { name: t('countries.korea'), score: 86, reason: t('reasons.investment.korea'), image: '/images/countries/korea.jpg' },
      { name: t('countries.malaysia'), score: 82, reason: t('reasons.investment.malaysia'), image: '/images/countries/malaysia.jpg' },
      { name: t('countries.cambodia'), score: 78, reason: t('reasons.investment.cambodia'), image: '/images/countries/cambodia.jpg' }
    ],
    luxury: [
      { name: t('countries.dubai'), score: 98, reason: t('reasons.luxury.dubai'), image: '/images/countries/dubai.jpg' },
      { name: t('countries.china'), score: 94, reason: t('reasons.luxury.china'), image: '/images/countries/china.jpg' },
      { name: t('countries.korea'), score: 90, reason: t('reasons.luxury.korea'), image: '/images/countries/korea.jpg' },
      { name: t('countries.malaysia'), score: 84, reason: t('reasons.luxury.malaysia'), image: '/images/countries/malaysia.jpg' },
      { name: t('countries.vietnam'), score: 78, reason: t('reasons.luxury.vietnam'), image: '/images/countries/vietnam.jpg' },
      { name: t('countries.cambodia'), score: 72, reason: t('reasons.luxury.cambodia'), image: '/images/countries/cambodia.jpg' }
    ]
  })

  const recommendedCountries = getRecommendedCountries()

  // 라이프스타일 카테고리 데이터
  const getLifestyleCategories = () => [
    {
      key: 'retirement',
      icon: Heart,
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      title: t('categories.retirement.title'),
      description: t('categories.retirement.description'),
      features: [t('categories.retirement.feature1'), t('categories.retirement.feature2'), t('categories.retirement.feature3'), t('categories.retirement.feature4')]
    },
    {
      key: 'education',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      title: t('categories.education.title'),
      description: t('categories.education.description'),
      features: [t('categories.education.feature1'), t('categories.education.feature2'), t('categories.education.feature3'), t('categories.education.feature4')]
    },
    {
      key: 'business',
      icon: Briefcase,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      title: t('categories.business.title'),
      description: t('categories.business.description'),
      features: [t('categories.business.feature1'), t('categories.business.feature2'), t('categories.business.feature3'), t('categories.business.feature4')]
    },
    {
      key: 'culture',
      icon: Palette,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      title: t('categories.culture.title'),
      description: t('categories.culture.description'),
      features: [t('categories.culture.feature1'), t('categories.culture.feature2'), t('categories.culture.feature3'), t('categories.culture.feature4')]
    },
    {
      key: 'health',
      icon: Activity,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      title: t('categories.health.title'),
      description: t('categories.health.description'),
      features: [t('categories.health.feature1'), t('categories.health.feature2'), t('categories.health.feature3'), t('categories.health.feature4')]
    },
    {
      key: 'community',
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      title: t('categories.community.title'),
      description: t('categories.community.description'),
      features: [t('categories.community.feature1'), t('categories.community.feature2'), t('categories.community.feature3'), t('categories.community.feature4')]
    },
    {
      key: 'investment',
      icon: TrendingUp,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      title: t('categories.investment.title'),
      description: t('categories.investment.description'),
      features: [t('categories.investment.feature1'), t('categories.investment.feature2'), t('categories.investment.feature3'), t('categories.investment.feature4')]
    },
    {
      key: 'luxury',
      icon: Crown,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      title: t('categories.luxury.title'),
      description: t('categories.luxury.description'),
      features: [t('categories.luxury.feature1'), t('categories.luxury.feature2'), t('categories.luxury.feature3'), t('categories.luxury.feature4')]
    }
  ]

  const lifestyleCategories = getLifestyleCategories()

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
  }, [participants])

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
          reason: baseCountry?.reason || t('highScoreCountry'),
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
        <div className="relative z-10 max-w-6xl mx-auto px-4 min-h-screen flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-4 sm:mb-6">
              <Trophy className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-yellow-500 mx-auto mb-2 sm:mb-3" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2 sm:mb-3">
                {t('congratulations')}
              </h1>
              <p className="text-base sm:text-lg md:text-xl font-korean text-gray-300 mb-4 sm:mb-6">
                {t('foundLifestyle')}
              </p>
            </div>

            {/* 라이프스타일 결과 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-2xl border-2 border-gray-100 mb-6 sm:mb-8 md:mb-12"
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
              className="mb-6 sm:mb-8 md:mb-12"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-4 sm:mb-6 text-center">
                {t('recommendedCountries')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
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
              className="text-center mb-6 sm:mb-8"
            >
              <Button 
                onClick={() => window.open('https://pf.kakao.com/_qpRxjxb/chat', '_blank')}
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[180px]"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 flex-shrink-0" />
                <span className="whitespace-nowrap">{t('consultationRequest')}</span>
              </Button>
            </motion.div>

            {/* 네비게이션 */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center">
              <Button 
                onClick={() => {
                  setCurrentRound(1)
                  setParticipants(['retirement', 'education', 'business', 'culture', 'health', 'community', 'investment', 'luxury'])
                  setWinners([])
                  setFinalWinner(null)
                  setIsComplete(false)
                  setIsProcessing(false)
                  setSelectionHistory([])
                  const initialMatches = getMatches(['retirement', 'education', 'business', 'culture', 'health', 'community', 'investment', 'luxury'])
                  setCurrentMatch(initialMatches[0])
                }}
                size="lg" 
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 font-medium px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base rounded-2xl transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {t('quizAgain')}
              </Button>
              <Button 
                onClick={goHome}
                size="lg" 
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 font-medium px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base rounded-2xl transition-all duration-300 hover:scale-105"
              >
                {t('backToHome')}
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
      <div className="relative z-10 max-w-6xl mx-auto px-4 min-h-screen flex flex-col justify-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 sm:mb-4">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-korean text-gray-300 mb-4 sm:mb-6">
            {t('subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <span>{t('round')} {currentRound}</span>
            <span>•</span>
            <span>{winners.length} / {participants.length % 2 === 1 ? Math.floor(participants.length / 2) : Math.ceil(participants.length / 2)} {t('completed')}</span>
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
            className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto"
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
                    relative bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-xl hover-lift border-2 
                    transition-all duration-300 h-full
                    ${category.borderColor} hover:shadow-2xl hover:scale-105
                    ${isProcessing ? 'opacity-50' : ''}
                  `}>
                    {/* Icon */}
                    <div className={`
                      w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br ${category.color} 
                      flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300
                    `}>
                      <category.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-bold text-gray-900 mb-2 sm:mb-3">
                      {category.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-korean text-gray-600 mb-3 sm:mb-4 leading-relaxed">
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
          className="text-center mt-8 sm:mt-12 md:mt-16"
        >
          <Button 
            onClick={goHome}
            size="lg"
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 font-medium px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            {t('backToHome')}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
