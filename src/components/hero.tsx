'use client'

import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import Earth3D from './earth-3d'
import { countries } from '@/lib/countries'
import { useRouter } from 'next/navigation'
import { CTA } from './cta'
import { Footer } from './footer'

export function Hero() {
  const router = useRouter()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentCountryIndex, setCurrentCountryIndex] = useState(-1)
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isNavigating, setIsNavigating] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)

  // 국가별 페이지로 이동하는 함수
  const navigateToCountry = (countryCode: string) => {
    if (isNavigating) return
    
    setIsNavigating(true)
    
    // 지구 로딩 완료를 기다린 후 페이지 이동 (2초 후)
    setTimeout(() => {
      router.push(`/${countryCode}`)
    }, 2000)
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
      
      if (hash === 'cta') {
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
          if (hash === 'cta') {
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
    
    const handleTouchEnd = (e: TouchEvent) => {
      const heroSection = document.getElementById('hero')
      const lastCountrySection = document.getElementById(`country-${countries.length - 1}`)
      
      if (heroSection && lastCountrySection) {
        const heroRect = heroSection.getBoundingClientRect()
        const lastCountryRect = lastCountrySection.getBoundingClientRect()
        
        if (heroRect.top <= 0 && lastCountryRect.bottom >= window.innerHeight) {
          if (isScrolling) return
          
          touchEndY = e.changedTouches[0].clientY
          const touchDiff = touchStartY - touchEndY
          
          if (Math.abs(touchDiff) > 50) {
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
            }, 2000)
          }
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKeyDown, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
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
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Logo */}
              <div className="w-32 h-20 flex items-center justify-center">
              </div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight drop-shadow-lg break-words"
              >
                <span className="luxury-text-gradient">글로벌 프리미엄 라이프 솔루션</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-lg md:text-xl lg:text-2xl font-korean text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-md"
              >
                수십 년의 전문성과 전세계 네트워크를 통해 글로벌 부동산의 새로운 기준을 제시합니다.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto pt-6"
              >
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1 drop-shadow-lg">
                    23
                  </div>
                  <div className="text-sm md:text-base text-white/80">경험 연수</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1 drop-shadow-lg">
                    6
                  </div>
                  <div className="text-sm md:text-base text-white/80">진출 국가</div>
                </div>
                <div className="text-center col-span-2 md:col-span-1">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1 drop-shadow-lg">
                    30,000+
                  </div>
                  <div className="text-sm md:text-base text-white/80">관리 부동산</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Country Description Sections */}
        {countries.map((country, index) => (
          <section 
            key={country.name} 
            id={`country-${index}`}
            className="min-h-screen flex items-center justify-center relative"
          >
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${country.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                transition: 'opacity 2s ease-in-out'
              }}
            >
              {index === countries.length - 1 && (
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
                    <div className="text-sm">다음 섹션</div>
                  </motion.div>
                </motion.div>
              )}
            </div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 drop-shadow-lg" style={{ 
                  color: country.color,
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
                }}>
                  {country.name}
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl font-korean text-white font-semibold leading-relaxed mb-12 drop-shadow-lg" style={{
                  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.9)'
                }}>
                  {country.description}
                </p>
                
                <div className="md:grid hidden md:grid-cols-3 gap-6 md:gap-8">
                  {country.features.map((feature, featureIndex) => (
                    <motion.div 
                      key={feature.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: featureIndex * 0.2 }}
                      viewport={{ once: true }}
                      className="bg-black/30 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/30 hover:bg-black/40 transition-all duration-300"
                      style={{ borderColor: `${country.color}40` }}
                    >
                      <h3 className="font-display font-semibold mb-4 text-lg md:text-xl" style={{ color: country.color }}>
                        {feature.title}
                      </h3>
                      <p className="font-korean text-gray-300 leading-relaxed text-sm md:text-base">
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="mt-12"
                >
                  <Button
                    onClick={() => navigateToCountry(country.code)}
                    className="text-lg px-8 py-4 bg-black/40 backdrop-blur-md border border-white/40 hover:bg-black/50 transition-all duration-300 group"
                    style={{ 
                      color: country.color,
                      borderColor: `${country.color}60`
                    }}
                  >
                    <span className="mr-2">자세히 알아보기</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <section id="cta" className="min-h-screen flex items-center justify-center relative">
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
