'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Check, Clock, Users2, Award, Sparkles, Zap, Target, Shield, Globe, Settings, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLocale } from 'next-intl'
import { Navigation } from '@/components/navigation'

export default function ServicesIntegratedSection() {
  const t = useTranslations('services')
  const locale = useLocale()
  const [isLoading, setIsLoading] = useState(true)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    // 페이지 로딩 애니메이션
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // 해시 확인 및 스크롤 처리
  useEffect(() => {
    if (!isLoading) {
      const hash = window.location.hash
      if (hash === '#pricing') {
        setTimeout(() => {
          const pricingSection = document.getElementById('pricing')
          if (pricingSection) {
            pricingSection.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }
        }, 500)
      }
    }
  }, [isLoading])

  // URL 해시 변경 감지
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#pricing') {
        setTimeout(() => {
          const pricingSection = document.getElementById('pricing')
          if (pricingSection) {
            pricingSection.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }
        }, 100)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const services = [
    {
      id: 'life-design',
      title: t('step1.title'),
      subtitle: t('step1.subtitle'),
      price: t('step1.price'),
      description: t('step1.description'),
      features: [
        {
          title: t('step1.feature1.title'),
          description: t('step1.feature1.description')
        },
        {
          title: t('step1.feature2.title'),
          description: t('step1.feature2.description')
        },
        {
          title: t('step1.feature3.title'),
          description: t('step1.feature3.description')
        }
      ],
      icon: Target,
      color: 'from-gray-800 to-gray-900',
      borderColor: 'border-gray-600',
      bgColor: 'bg-gray-800/80',
      accentColor: 'bg-gray-700',
      popular: false
    },
    {
      id: 'city-curation',
      title: t('step2.title'),
      subtitle: t('step2.subtitle'),
      price: t('step2.price'),
      description: t('step2.description'),
      features: [
        {
          title: t('step2.feature1.title'),
          description: t('step2.feature2.description')
        },
        {
          title: t('step2.feature2.title'),
          description: t('step2.feature2.description')
        },
        {
          title: t('step2.feature3.title'),
          description: t('step2.feature3.description')
        }
      ],
      icon: Globe,
      color: 'from-black to-gray-900',
      borderColor: 'border-gray-600',
      bgColor: 'bg-black/80',
      accentColor: 'bg-gray-800',
      popular: true
    },
    {
      id: 'journey-companion',
      title: t('step3.title'),
      subtitle: t('step3.subtitle'),
      price: t('step3.price'),
      description: t('step3.description'),
      features: [
        {
          title: t('step3.feature1.title'),
          description: t('step3.feature1.description')
        },
        {
          title: t('step3.feature2.title'),
          description: t('step3.feature2.description')
        },
        {
          title: t('step3.feature3.title'),
          description: t('step3.feature3.description')
        }
      ],
      icon: Users2,
      color: 'from-gray-900 to-black',
      borderColor: 'border-gray-600',
      bgColor: 'bg-gray-900/80',
      accentColor: 'bg-gray-800',
      popular: false
    }
  ]

  const additionalInfo = [
    {
      icon: Clock,
      title: t('additionalInfo.timeline.title'),
      description: t('additionalInfo.timeline.description'),
      color: 'from-gray-800 to-gray-900'
    },
    {
      icon: Users2,
      title: t('additionalInfo.expertise.title'),
      description: t('additionalInfo.expertise.description'),
      color: 'from-black to-gray-900'
    },
    {
      icon: Award,
      title: t('additionalInfo.guarantee.title'),
      description: t('additionalInfo.guarantee.description'),
      color: 'from-gray-900 to-black'
    }
  ]

  return (
    <div className="relative bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Global Background Animation */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(75, 85, 99, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(55, 65, 81, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(31, 41, 55, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(75, 85, 99, 0.2) 0%, transparent 50%)"
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

      {/* 세련된 배경 패턴 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.02)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,255,255,0.02)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      </div>

      <AnimatePresence>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-16 h-16 border-4 border-gray-400 border-t-transparent rounded-full"
            />
          </motion.div>
        ) : (
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
              <Navigation />
              
              {/* Floating Elements */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, 15, 0],
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 10 + i * 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3
                  }}
                  className="absolute w-3 h-3 bg-gray-400 rounded-full opacity-60"
                  style={{
                    left: `${15 + i * 12}%`,
                    top: `${25 + i * 8}%`
                  }}
                />
              ))}

              <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div className="mb-8">
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full mb-6 relative"
                    >
                      <Settings className="w-12 h-12 text-white" />
                      <motion.div
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                        className="absolute inset-0 bg-gray-500 rounded-full"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-6"
                  >
                    <span className="bg-gradient-to-r from-gray-400 via-gray-300 to-white bg-clip-text text-transparent">
                      {t('hero.title')}
                    </span>
                  </motion.h1>

                  <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                  >
                    {t('hero.subtitle')}
                  </motion.p>
                </motion.div>
              </div>

              {/* Scroll Indicator */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              >
                <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                  />
                </div>
              </motion.div>
            </section>
            
            {/* 가격 정책 섹션 */}
            <section id="pricing" className="relative py-32">
              {/* 투명한 앵커 포인트 추가 */}
              <div id="pricing-anchor" className="absolute -top-20"></div>
              
              {/* 추가 앵커 포인트 */}
              <div className="absolute -top-32 w-full h-1"></div>
              
              <div className="container mx-auto px-4 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-24"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full mb-8"
                  >
                    <Sparkles className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    가격 정책
                  </h2>
                  <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                    {t('overview.description')}
                  </p>
                  <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4">
                    각 서비스를 클릭하면 상세 내용으로 이동합니다
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-32">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="text-center group cursor-pointer transition-all duration-300 hover:scale-105"
                      onClick={() => {
                        setActiveStep(index)
                        // 해당 상세 서비스 내용으로 스크롤 이동
                        setTimeout(() => {
                          const detailedSection = document.getElementById(`detailed-${service.id}`)
                          if (detailedSection) {
                            const offset = 120 // 헤더 높이와 여백 고려
                            const elementPosition = detailedSection.offsetTop - offset
                            window.scrollTo({
                              top: elementPosition,
                              behavior: 'smooth'
                            })
                          }
                        }, 100)
                      }}
                    >
                      <motion.div
                        id={`pricing-${service.id}`}
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-10 rounded-3xl border transition-all duration-500 ${
                          activeStep === index 
                            ? 'border-gray-400 shadow-2xl shadow-gray-400/20 bg-gray-800/90' 
                            : 'border-gray-700 hover:border-gray-500 bg-gray-800/60 hover:bg-gray-800/80'
                        } backdrop-blur-sm group-hover:shadow-xl`}
                      >
                        {service.popular && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                          >
                            <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 text-black px-6 py-2 rounded-full text-sm font-bold shadow-2xl">
                              <Sparkles className="w-4 h-4 inline mr-2" />
                              {t('popular')}
                            </span>
                          </motion.div>
                        )}
                        
                        <motion.div
                          animate={{ 
                            rotate: activeStep === index ? [0, 5, -5, 0] : 0,
                            scale: activeStep === index ? 1.1 : 1
                          }}
                          transition={{ duration: 0.5 }}
                          className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${service.color} text-white rounded-3xl mb-8 group-hover:scale-110 transition-transform duration-300 shadow-2xl`}
                        >
                          <service.icon className="w-12 h-12" />
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {service.title.includes(' ') ? (
                            <>
                              {service.title.split(' ').map((word, index) => (
                                <span key={index}>
                                  {word}
                                  {index < service.title.split(' ').length - 1 && <br />}
                                </span>
                              ))}
                            </>
                          ) : (
                            service.title
                          )}
                        </h3>
                        <p className="text-gray-300 mb-6 text-lg">
                          {service.subtitle}
                        </p>
                        <div className="text-3xl font-bold text-white mb-3">
                          {service.price}
                        </div>
                        <p className="text-gray-400 mb-6">
                          {service.description}
                        </p>
                        
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ 
                            opacity: activeStep === index ? 1 : 0,
                            height: activeStep === index ? 'auto' : 0
                          }}
                          transition={{ duration: 0.4 }}
                          className="mt-8 overflow-hidden"
                        >
                          <div className="space-y-4 text-left">
                            {service.features.map((feature, featureIndex) => (
                              <motion.div
                                key={featureIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                                className="flex items-start space-x-3"
                              >
                                <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300">
                                  {feature.title}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* 상세 서비스 섹션 */}
            <section className="relative py-32">
              <div className="container mx-auto px-4 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-24"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full mb-8"
                  >
                    <Zap className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    {t('detailed.title')}
                  </h2>
                  <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                    {t('detailed.description')}
                  </p>
                </motion.div>

                <div className="space-y-32 max-w-7xl mx-auto mb-32">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.id}
                      id={`detailed-${service.id}`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className={`relative ${
                        index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                      } flex flex-col lg:flex-row items-center gap-20 ${
                        activeStep === index ? 'ring-2 ring-gray-400 ring-opacity-50 rounded-3xl p-8' : ''
                      }`}
                    >
                      {/* Content */}
                      <div className="flex-1 lg:pr-12">
                        <div className="mb-8">
                          {/* 중복되는 제목, 부제목, 가격, 설명 제거 */}
                        </div>

                        <div className="space-y-8">
                          {service.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                              viewport={{ once: true }}
                              className="flex items-start space-x-5 group"
                            >
                              <div className="flex-1">
                                <h4 className="text-xl font-semibold text-white mb-3">
                                  {feature.title}
                                </h4>
                                <p className="text-gray-300 leading-relaxed text-lg">
                                  {feature.description}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Visual */}
                      <div className="flex-1">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className={`relative bg-gradient-to-br ${service.color} rounded-3xl p-10 text-white text-center shadow-2xl overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                          
                          <div className="relative z-10">
                            <motion.div
                              animate={{ 
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.05, 1]
                              }}
                              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                              className="inline-flex items-center justify-center w-28 h-28 bg-white/10 rounded-3xl mb-8 backdrop-blur-sm border border-white/20"
                            >
                              <service.icon className="w-14 h-14" />
                            </motion.div>
                            <h4 className="text-3xl font-bold mb-4">{service.title}</h4>
                            <p className="text-xl opacity-95 mb-8">{service.subtitle}</p>
                            
                            <div className="space-y-4 text-left">
                              {service.features.map((feature, featureIndex) => (
                                <motion.div
                                  key={featureIndex}
                                  initial={{ opacity: 0, x: 20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                                  viewport={{ once: true }}
                                  className="flex items-center space-x-4"
                                >
                                  <Check className="w-6 h-6 text-gray-300 flex-shrink-0" />
                                  <span className="text-base opacity-90">{feature.title}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* 왜 Blueye를 선택해야 할까요? 섹션 */}
            <section className="relative py-32">
              <div className="container mx-auto px-4 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="mb-24"
                >
                  <div className="text-center mb-20">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full mb-8"
                    >
                      <Shield className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                      {t('additionalInfo.title')}
                    </h3>
                    <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                      {t('additionalInfo.subtitle')}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
                    {additionalInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-center group"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${info.color} text-white rounded-3xl mb-8 transition-transform duration-300 shadow-2xl`}
                        >
                          <info.icon className="w-10 h-10" />
                        </motion.div>
                        <h4 className="text-2xl font-bold text-white mb-6">
                          {info.title}
                        </h4>
                        <p className="text-gray-300 leading-relaxed text-lg">
                          {info.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>

            {/* CTA Section */}
            <section id="cta" className="py-24 relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
              
              <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="max-w-4xl mx-auto">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="inline-block mb-6"
                    >
                      <Target className="w-16 h-16 text-gray-400 mx-auto" />
                    </motion.div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      {t('bottomCta.title')}
                    </h3>
                    <p className="text-xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
                      {t('bottomCta.description')}
                    </p>
                    <Button
                      onClick={() => window.location.href = `/${locale}#cta`}
                      size="lg"
                      className="bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold px-10 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      {t('bottomCta.button')}
                    </Button>
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
