'use client'

import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import Earth3D from './earth-3d'
import { countries, getCountryName } from '@/lib/countries'
import { useRouter } from 'next/navigation'
import { CTA } from './cta'
import { Footer } from './footer'

// 7세그먼트 디스플레이 컴포넌트
function SevenSegmentDigit({ digit }: { digit: string }) {
  // 표준 7 세그먼트 디스플레이 순서: A, B, C, D, E, F, G
  const segments = {
    '0': [1, 1, 1, 1, 1, 1, 0], // A, B, C, D, E, F 켜짐, G 꺼짐
    '1': [0, 1, 1, 0, 0, 0, 0], // B, C 켜짐
    '2': [1, 1, 0, 1, 1, 0, 1], // A, B, D, E, G 켜짐
    '3': [1, 1, 1, 1, 0, 0, 1], // A, B, C, D, G 켜짐
    '4': [0, 1, 1, 0, 0, 1, 1], // B, C, F, G 켜짐
    '5': [1, 0, 1, 1, 0, 1, 1], // A, C, D, F, G 켜짐
    '6': [1, 0, 1, 1, 1, 1, 1], // A, C, D, E, F, G 켜짐
    '7': [1, 1, 1, 0, 0, 0, 0], // A, B, C 켜짐
    '8': [1, 1, 1, 1, 1, 1, 1], // 모든 세그먼트 켜짐
    '9': [1, 1, 1, 1, 0, 1, 1], // A, B, C, D, F, G 켜짐
  }
  
  const segmentStates = segments[digit as keyof typeof segments] || [0, 0, 0, 0, 0, 0, 0]
  
  return (
    <div className="relative inline-block w-6 h-9 xs:w-7 xs:h-10 sm:w-8 sm:h-12 md:w-10 md:h-14 lg:w-12 lg:h-18 xl:w-14 xl:h-20 mx-0.5 xs:mx-1 sm:mx-1.5 md:mx-2">
      {/* 세그먼트 A (상단 가로) */}
      <div className={`absolute top-0 left-0.5 xs:left-1 right-0.5 xs:right-1 h-0.5 xs:h-1 sm:h-1 md:h-1.5 lg:h-2 bg-white rounded-sm transition-all duration-200 ${
        segmentStates[0] ? 'opacity-100 drop-shadow-[0_0_4px_rgba(255,255,255,0.9)] xs:drop-shadow-[0_0_6px_rgba(255,255,255,0.9)] sm:drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] md:drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] lg:drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]' : 'opacity-15'
      }`} />
      
      {/* 세그먼트 B (우상단 세로) */}
      <div className={`absolute top-0.5 xs:top-1 sm:top-1 md:top-1.5 lg:top-2 right-0 w-0.5 xs:w-1 sm:w-1 md:w-1.5 lg:w-2 h-3.5 xs:h-4 sm:h-5 md:h-6 lg:h-7 bg-white rounded-sm transition-all duration-200 ${
        segmentStates[1] ? 'opacity-100 drop-shadow-[0_0_4px_rgba(255,255,255,0.9)] xs:drop-shadow-[0_0_6px_rgba(255,255,255,0.9)] sm:drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] md:drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] lg:drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]' : 'opacity-15'
      }`} />
      
      {/* 세그먼트 C (우하단 세로) */}
      <div className={`absolute bottom-0.5 xs:bottom-1 sm:bottom-1 md:bottom-1.5 lg:bottom-2 right-0 w-0.5 xs:w-1 sm:w-1 md:w-1.5 lg:w-2 h-3.5 xs:h-4 sm:h-5 md:h-6 lg:h-7 bg-white rounded-sm transition-all duration-200 ${
        segmentStates[2] ? 'opacity-100 drop-shadow-[0_0_4px_rgba(255,255,255,0.9)] xs:drop-shadow-[0_0_6px_rgba(255,255,255,0.9)] sm:drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] md:drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] lg:drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]' : 'opacity-15'
      }`} />
      
      {/* 세그먼트 D (하단 가로) */}
      <div className={`absolute bottom-0 left-0.5 xs:left-1 right-0.5 xs:right-1 h-0.5 xs:h-1 sm:h-1 md:h-1.5 lg:h-2 bg-white rounded-sm transition-all duration-200 ${
        segmentStates[3] ? 'opacity-100 drop-shadow-[0_0_4px_rgba(255,255,255,0.9)] xs:drop-shadow-[0_0_6px_rgba(255,255,255,0.9)] sm:drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] md:drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] lg:drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]' : 'opacity-15'
      }`} />
      
      {/* 세그먼트 E (좌하단 세로) */}
      <div className={`absolute bottom-0.5 xs:bottom-1 sm:bottom-1 md:bottom-1.5 lg:bottom-2 left-0 w-0.5 xs:w-1 sm:w-1 md:w-1.5 lg:w-2 h-3.5 xs:h-4 sm:h-5 md:h-6 lg:h-7 bg-white rounded-sm transition-all duration-200 ${
        segmentStates[4] ? 'opacity-100 drop-shadow-[0_0_4px_rgba(255,255,255,0.9)] xs:drop-shadow-[0_0_6px_rgba(255,255,255,0.9)] sm:drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] md:drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] lg:drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]' : 'opacity-15'
      }`} />
      
      {/* 세그먼트 F (좌상단 세로) */}
      <div className={`absolute top-0.5 xs:top-1 sm:top-1 md:top-1.5 lg:top-2 left-0 w-0.5 xs:w-1 sm:w-1 md:w-1.5 lg:w-2 h-3.5 xs:h-4 sm:h-5 md:h-6 lg:h-7 bg-white rounded-sm transition-all duration-200 ${
        segmentStates[5] ? 'opacity-100 drop-shadow-[0_0_4px_rgba(255,255,255,0.9)] xs:drop-shadow-[0_0_6px_rgba(255,255,255,0.9)] sm:drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] md:drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] lg:drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]' : 'opacity-15'
      }`} />
      
      {/* 세그먼트 G (중앙 가로) */}
      <div className={`absolute top-1/2 left-0.5 xs:left-1 right-0.5 xs:right-1 h-0.5 xs:h-1 sm:h-1 md:h-1.5 lg:h-2 bg-white rounded-sm transition-all duration-200 transform -translate-y-1/2 ${
        segmentStates[6] ? 'opacity-100 drop-shadow-[0_0_4px_rgba(255,255,255,0.9)] xs:drop-shadow-[0_0_6px_rgba(255,255,255,0.9)] sm:drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] md:drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] lg:drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]' : 'opacity-15'
      }`} />
    </div>
  )
}

// CountUp 컴포넌트
function CountUp({ end, duration = 2, delay = 0, suffix = '', prefix = '' }: { 
  end: number; 
  duration?: number; 
  delay?: number; 
  suffix?: string; 
  prefix?: string; 
}) {
  const [count, setCount] = useState(0)
  const [displayCount, setDisplayCount] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      let currentCount = 0
      const interval = setInterval(() => {
        currentCount++
        if (currentCount <= end) {
          setCount(currentCount)
          setDisplayCount(currentCount)
        } else {
          clearInterval(interval)
        }
      }, duration * 1000)
      
      return () => clearInterval(interval)
    }, delay * 1000)
    
    return () => clearTimeout(timer)
  }, [end, duration, delay])
  
  const paddedNumber = displayCount.toString().padStart(3, '0')
  
  return (
    <span className="relative inline-flex items-center justify-center">
      {paddedNumber.split('').map((digit, index) => (
        <SevenSegmentDigit key={index} digit={digit} />
      ))}
      {suffix}
      
      {/* 999에 도달했을 때 오른쪽에 하얀 + 표시 */}
      {displayCount >= 999 && (
        <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl drop-shadow-[0_0_4px_rgba(255,255,255,0.9)]">
          +
        </div>
      )}
    </span>
  )
}

export function Hero() {
  const t = useTranslations('hero')
  const tCountries = useTranslations('countries')
  const locale = useLocale()
  const router = useRouter()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentCountryIndex, setCurrentCountryIndex] = useState(-1)
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isNavigating, setIsNavigating] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)

  // CTA 섹션으로 이동하는 함수
  const navigateToCTA = () => {
    console.log('navigateToCTA called, isNavigating:', isNavigating)
    
    // CTA 섹션으로 스크롤
    const ctaSection = document.getElementById('cta')
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' })
      
      // URL 해시 업데이트
      window.history.replaceState(null, '', '#cta')
      
      // 섹션 상태 업데이트
      setCurrentSection(countries.length + 1)
      setCurrentCountryIndex(-1)
      setScrollProgress(Math.min((countries.length + 1) / (countries.length + 2), 1))
    }
  }

  // 전역 이벤트 리스너 등록
  useEffect(() => {
    const handleGoToHome = () => {
      setCurrentSection(0)
      setCurrentCountryIndex(-1)
      setScrollProgress(0)
    }

    window.addEventListener('goToHome', handleGoToHome)
    
    return () => {
      window.removeEventListener('goToHome', handleGoToHome)
    }
  }, [])

  // 페이지 로드 시 URL 해시에 따라 섹션 설정
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      
      if (hash === 'hero') {
        window.scrollTo(0, 0)
        setCurrentSection(0)
        setCurrentCountryIndex(-1)
        setScrollProgress(0)
      } else if (hash === 'cta') {
        setCurrentSection(countries.length + 1)
        setCurrentCountryIndex(-1)
        setScrollProgress(Math.min((countries.length + 1) / (countries.length + 2), 1))
        
        setTimeout(() => {
          const ctaSection = document.getElementById('cta')
          if (ctaSection) {
            ctaSection.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else if (hash === 'footer') {
        setCurrentSection(countries.length + 2)
        setCurrentCountryIndex(-1)
        setScrollProgress(1)
        
        setTimeout(() => {
          const footerSection = document.getElementById('footer')
          if (footerSection) {
            footerSection.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else if (hash.startsWith('country-')) {
        const countryIndex = parseInt(hash.replace('country-', ''))
        if (countryIndex >= 0 && countryIndex < countries.length) {
          setCurrentSection(countryIndex + 1)
          setCurrentCountryIndex(countryIndex)
          setScrollProgress(Math.min((countryIndex + 1) / (countries.length + 2), 1))
          
          setTimeout(() => {
            const countrySection = document.getElementById(`country-${countryIndex}`)
            if (countrySection) {
              countrySection.scrollIntoView({ behavior: 'smooth' })
            }
          }, 100)
        }
      } else {
        window.scrollTo(0, 0)
        setCurrentSection(0)
        setCurrentCountryIndex(-1)
        setScrollProgress(0)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  // 초기 로드 시 해시가 있으면 지구 로딩 완료 후 이동
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    
    if (hash) {
      const timer = setTimeout(() => {
        const handleInitialHash = () => {
          if (hash === 'hero') {
            window.scrollTo(0, 0)
            setCurrentSection(0)
            setCurrentCountryIndex(-1)
            setScrollProgress(0)
          } else if (hash === 'cta') {
            setCurrentSection(countries.length + 1)
            setCurrentCountryIndex(-1)
            setScrollProgress(Math.min((countries.length + 1) / (countries.length + 2), 1))
            
            setTimeout(() => {
              const ctaSection = document.getElementById('cta')
              if (ctaSection) {
                ctaSection.scrollIntoView({ behavior: 'smooth' })
              }
            }, 100)
          } else if (hash === 'footer') {
            setCurrentSection(countries.length + 2)
            setCurrentCountryIndex(-1)
            setScrollProgress(1)
            
            setTimeout(() => {
              const footerSection = document.getElementById('footer')
              if (footerSection) {
                footerSection.scrollIntoView({ behavior: 'smooth' })
              }
            }, 100)
          } else if (hash.startsWith('country-')) {
            const countryIndex = parseInt(hash.replace('country-', ''))
            if (countryIndex >= 0 && countryIndex < countries.length) {
              setCurrentSection(countryIndex + 1)
              setCurrentCountryIndex(countryIndex)
              setScrollProgress(Math.min((countryIndex + 1) / (countries.length + 2), 1))
              
              setTimeout(() => {
                const countrySection = document.getElementById(`country-${countryIndex}`)
                if (countrySection) {
                  countrySection.scrollIntoView({ behavior: 'smooth' })
                }
              }, 100)
            }
          }
        }
        
        handleInitialHash()
      }, 2000)
      
      return () => clearTimeout(timer)
    } else {
      window.scrollTo(0, 0)
      setCurrentSection(0)
      setCurrentCountryIndex(-1)
      setScrollProgress(0)
    }
  }, [])

  useEffect(() => {
    const totalSections = countries.length + 3

    const handleWheel = (e: WheelEvent) => {
      const heroSection = document.getElementById('hero')
      const lastCountrySection = document.getElementById(`country-${countries.length - 1}`)
      const ctaSection = document.getElementById('cta')
      
      if (heroSection && lastCountrySection && ctaSection) {
        const heroRect = heroSection.getBoundingClientRect()
        const lastCountryRect = lastCountrySection.getBoundingClientRect()
        const ctaRect = ctaSection.getBoundingClientRect()
        
        // 기존 범위: Hero → 국가 섹션들
        if (heroRect.top <= 0 && lastCountryRect.bottom >= window.innerHeight) {
          e.preventDefault()
          
          if (isScrolling) return
          
          let newSection = currentSection
          
          if (e.deltaY > 0 && currentSection < totalSections - 1) {
            newSection = currentSection + 1
          } else if (e.deltaY < 0 && currentSection > 0) {
            newSection = currentSection - 1
          } else {
            return
          }
          
          let newHash = ''
          if (newSection === 0) {
            newHash = ''
          } else if (newSection <= countries.length) {
            newHash = `country-${newSection - 1}`
          } else if (newSection === countries.length + 1) {
            newHash = 'cta'
          } else if (newSection === countries.length + 2) {
            newHash = 'footer'
          }
          
          if (newHash) {
            window.history.replaceState(null, '', `#${newHash}`)
          } else {
            window.history.replaceState(null, '', window.location.pathname)
          }
          
          setIsScrolling(true)
          setIsNavigating(true)
          setCurrentSection(newSection)
          
          let targetElement: HTMLElement | null = null
          if (newSection === 0) {
            targetElement = document.getElementById('hero')
          } else if (newSection <= countries.length) {
            targetElement = document.getElementById(`country-${newSection - 1}`)
          } else if (newSection === countries.length + 1) {
            targetElement = document.getElementById('cta')
          } else if (newSection === countries.length + 2) {
            targetElement = document.getElementById('footer')
          }
          
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' })
          }
          
          const countryIndex = newSection === 0 ? -1 : newSection - 1
          setCurrentCountryIndex(countryIndex)
          
          const totalProgress = Math.min(newSection / (totalSections - 1), 1)
          setScrollProgress(totalProgress)
          
          setTimeout(() => {
            setIsScrolling(false)
          }, 2000)
        } 
        // CTA 섹션에서 위로 스크롤할 때 마지막 국가 섹션으로 이동
        else if (ctaRect.top <= window.innerHeight && e.deltaY < 0) {
          e.preventDefault()
          
          if (isScrolling) return
          
          // 마지막 국가 섹션으로 이동
          const newSection = countries.length
          setCurrentSection(newSection)
          setCurrentCountryIndex(countries.length - 1)
          setScrollProgress(Math.min(newSection / (totalSections - 1), 1))
          
          lastCountrySection.scrollIntoView({ behavior: 'smooth' })
          window.history.replaceState(null, '', `#country-${countries.length - 1}`)
          
          setIsScrolling(true)
          setTimeout(() => setIsScrolling(false), 2000)
        }
      }
    }

    // 키보드 스크롤 방지
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
        e.preventDefault()
      }
    }

    let touchStartY = 0
    let touchEndY = 0
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    
    const handleTouchMove = (e: TouchEvent) => {
      const heroSection = document.getElementById('hero')
      const lastCountrySection = document.getElementById(`country-${countries.length - 1}`)
      const ctaSection = document.getElementById('cta')
      
      if (heroSection && lastCountrySection && ctaSection) {
        const heroRect = heroSection.getBoundingClientRect()
        const lastCountryRect = lastCountrySection.getBoundingClientRect()
        const ctaRect = ctaSection.getBoundingClientRect()
        
        if ((heroRect.top <= 0 && (lastCountryRect.bottom >= window.innerHeight || ctaRect.top <= window.innerHeight))) {
          e.preventDefault()
        }
      }
    }
    
    const handleTouchEnd = (e: TouchEvent) => {
      const heroSection = document.getElementById('hero')
      const lastCountrySection = document.getElementById(`country-${countries.length - 1}`)
      const ctaSection = document.getElementById('cta')
      
      if (heroSection && lastCountrySection && ctaSection) {
        const heroRect = heroSection.getBoundingClientRect()
        const lastCountryRect = lastCountrySection.getBoundingClientRect()
        const ctaRect = ctaSection.getBoundingClientRect()
        
        // 기존 범위: Hero → 국가 섹션들 → CTA
        if (heroRect.top <= 0 && (lastCountryRect.bottom >= window.innerHeight || ctaRect.top <= window.innerHeight)) {
          if (isScrolling) return
          
          touchEndY = e.changedTouches[0].clientY
          const touchDiff = touchStartY - touchEndY
          
          if (Math.abs(touchDiff) > 30) {
            let newSection = currentSection
            
            if (touchDiff > 0 && currentSection < totalSections - 1) {
              newSection = currentSection + 1
            } else if (touchDiff < 0 && currentSection > 0) {
              newSection = currentSection - 1
            } else {
              return
            }
            
            let newHash = ''
            if (newSection === 0) {
              newHash = ''
            } else if (newSection <= countries.length) {
              newHash = `country-${newSection - 1}`
            } else if (newSection === countries.length + 1) {
              newHash = 'cta'
            } else if (newSection === countries.length + 2) {
              newHash = 'footer'
            }
            
            if (newHash) {
              window.history.replaceState(null, '', `#${newHash}`)
            } else {
              window.history.replaceState(null, '', window.location.pathname)
            }
            
            setIsScrolling(true)
            setIsNavigating(true)
            setCurrentSection(newSection)
            
            let targetElement: HTMLElement | null = null
            if (newSection === 0) {
              targetElement = document.getElementById('hero')
            } else if (newSection <= countries.length) {
              targetElement = document.getElementById(`country-${newSection - 1}`)
            } else if (newSection === countries.length + 1) {
              targetElement = document.getElementById('cta')
            } else if (newSection === countries.length + 2) {
              targetElement = document.getElementById('footer')
            }
            
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' })
            }
            
            const countryIndex = newSection === 0 ? -1 : newSection - 1
            setCurrentCountryIndex(countryIndex)
            
            const totalProgress = Math.min(newSection / (totalSections - 1), 1)
            setScrollProgress(totalProgress)
            
            setTimeout(() => {
              setIsScrolling(false)
            }, 1000)
          }
        }
        // CTA 섹션에서 위로 스크롤할 때 마지막 국가 섹션으로 이동
        else if (ctaRect.top <= window.innerHeight && touchStartY - e.changedTouches[0].clientY < 0) {
          if (isScrolling) return
          
          // 마지막 국가 섹션으로 이동
          const newSection = countries.length
          setCurrentSection(newSection)
          setCurrentCountryIndex(countries.length - 1)
          setScrollProgress(Math.min(newSection / (totalSections - 1), 1))
          
          lastCountrySection.scrollIntoView({ behavior: 'smooth' })
          window.history.replaceState(null, '', `#country-${countries.length - 1}`)
          
          setIsScrolling(true)
          setTimeout(() => setIsScrolling(false), 1000)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKeyDown, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentSection, isScrolling])

  return (
    <>
      {/* Fixed Earth Background */}
      <div className="fixed inset-0 z-0">
        <Earth3D scrollProgress={scrollProgress} currentCountryIndex={currentCountryIndex} isNavigating={isNavigating} />
      </div>
      
      {/* Scrollable Content */}
      <div ref={contentRef} className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center overflow-hidden">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden hidden md:block">
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full backdrop-blur-sm"
            />
            <motion.div
              animate={{
                y: [0, -15, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 left-20 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm"
            />
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Logo */}
              <div className="w-32 h-20 flex items-center justify-center">
              </div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight drop-shadow-lg"
              >
                <span className="luxury-text-gradient">{t('title')}</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-korean text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-md px-4"
              >
                {t('description')}
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto pt-4 sm:pt-6 px-4"
              >
                <div className="text-center">
                  <motion.div 
                    className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.8 }}
                  >
                    <CountUp end={23} duration={0.5} delay={1.0} />
                  </motion.div>
                  <div className="text-xs sm:text-sm md:text-base text-white/80">{t('experienceYears')}</div>
                </div>
                <div className="text-center">
                  <motion.div 
                    className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  >
                    <CountUp end={6} duration={0.9} delay={1.2} />
                  </motion.div>
                  <div className="text-xs sm:text-sm md:text-base text-white/80">{t('countries')}</div>
                </div>
                <div className="text-center col-span-2 lg:col-span-1">
                  <motion.div 
                    className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                  >
                    <CountUp end={999} duration={0.1} delay={1.4} />
                  </motion.div>
                  <div className="text-xs sm:text-sm md:text-base text-white/80">{t('managedProperties')}</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 sm:pt-8 px-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group z-40"
                >

                  
                  <Button
                    type="button"
                    onClick={() => router.push(`/${locale}/lifestyle`)}
                    className="relative text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden rounded-xl z-50 cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center gap-2 sm:gap-3">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-lg sm:text-xl md:text-2xl"
                      >
                        🌟
                      </motion.div>
                      <span className="text-sm sm:text-base md:text-xl">{t('exploreLifestyle')}</span>
                      <motion.div
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-lg sm:text-xl md:text-2xl"
                      >
                        →
                      </motion.div>
                    </div>
                  </Button>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-300 animate-pulse" />
                  
                  {/* Sparkle effects */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-4 -right-4 w-8 h-8 opacity-60"
                  >
                    <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-sm" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-4 -left-4 w-6 h-6 opacity-60"
                  >
                    <div className="w-full h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-sm" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Country Description Sections */}
        {countries.map((country, index) => (
          <section 
            key={country.code} 
            id={`country-${index}`}
            className="min-h-screen flex items-center justify-center relative"
          >
            {/* Background Image with Fade Animation */}
            <motion.div 
              className="absolute inset-0 md:bg-fixed bg-scroll"
              style={{
                backgroundImage: `url(${country.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 2,
                ease: "easeOut",
                delay: 0.2
              }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
            >
              {/* Overlay with Fade Animation */}
              <motion.div 
                className="absolute inset-0 bg-black/30"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ 
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
                style={{
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.8))'
                }}
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-center"
                  style={{
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.8))'
                  }}
                >
                  <ChevronDown className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm">{t('scroll')}</div>
                </motion.div>
              </motion.div>
            </motion.div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1.5,
                  ease: "easeOut",
                  delay: 0.8
                }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                className="space-y-8"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 drop-shadow-lg" style={{ 
                  color: country.color,
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
                }}>
                  {getCountryName(country.code, locale)}
                </h2>
                <p className="text-base md:text-lg lg:text-xl font-korean text-white font-semibold leading-relaxed mb-8 md:mb-12 drop-shadow-lg" style={{
                  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.9)'
                }}>
                  {tCountries(`${country.code}.description`)}
                </p>
                
                <div className="md:grid hidden md:grid-cols-3 gap-6 md:gap-8">
                  {country.features.map((feature, featureIndex) => (
                    <motion.div 
                      key={feature.title}
                      initial={{ opacity: 0, y: 50, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 1,
                        ease: "easeOut",
                        delay: 1.2 + featureIndex * 0.3
                      }}
                      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                      className="bg-black/30 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/30 hover:bg-black/40 transition-all duration-300"
                      style={{ borderColor: `${country.color}40` }}
                    >
                      <h3 className="font-display font-semibold mb-4 text-lg md:text-xl" style={{ color: country.color }}>
                        {tCountries(`${country.code}.features.${feature.key}.title`)}
                      </h3>
                      <p className="font-korean text-gray-300 leading-relaxed text-sm md:text-base">
                        {tCountries(`${country.code}.features.${feature.key}.description`)}
                      </p>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 1.2,
                    ease: "easeOut",
                    delay: 2.0
                  }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  className="mt-12"
                >
                  <Button
                    onClick={() => window.open('https://pf.kakao.com/_qpRxjxb/chat', '_blank')}
                    className="text-lg px-8 py-4 backdrop-blur-md border-2 transition-all duration-300 group shadow-lg hover:shadow-xl"
                    style={{ 
                      backgroundColor: `${country.color}`,
                      color: 'white',
                      borderColor: `${country.color}80`,
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
                      boxShadow: `0 4px 20px rgba(0, 0, 0, 0.3), 0 0 20px ${country.color}40`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${country.color}dd`
                      e.currentTarget.style.borderColor = `${country.color}`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${country.color}`
                      e.currentTarget.style.borderColor = `${country.color}80`
                    }}
                  >
                    <span className="mr-2 font-semibold">{t('learnMore')}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <section id="cta" className="min-h-fit md:min-h-screen flex items-center justify-center relative">
          <div className="w-full">
            <CTA />
          </div>
        </section>

        {/* Footer Section */}
        <section id="footer" className="min-h-screen flex items-center justify-center relative">
          <div className="w-full">
            <Footer />
          </div>
        </section>
      </div>
    </>
  )
}
