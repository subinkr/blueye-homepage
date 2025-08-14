'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

export function CTA() {
  const t = useTranslations('cta')

  return (
    <section className="w-full py-24 bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 lg:px-8">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium tracking-widest uppercase mb-3">
            {t('inquiry')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('consultation')}
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>
        
        <div className="flex flex-wrap w-full max-w-6xl mx-auto">
          {/* 연락처 정보 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 lg:pr-6 mb-8 lg:mb-0"
          >
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-sm shadow-md h-full">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                {t('contactInfo')}
              </h3>
              
              <div className="space-y-6">
                {/* 전화번호 */}
                <div className="flex items-start">
                  <div className="hidden md:block bg-yellow-400 p-3 rounded-full mr-4">
                    <Phone className="text-gray-900 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {t('phone')}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      010 5763 0617
                    </p>
                  </div>
                </div>
                
                {/* 카카오톡 */}
                <div className="flex items-start">
                  <div className="hidden md:block bg-yellow-400 p-3 rounded-full mr-4">
                    <MessageCircle className="text-gray-900 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {t('kakao')}
                    </h4>
                    <a 
                      href="https://pf.kakao.com/_qpRxjxb/chat" 
                      className="text-blue-600 dark:text-blue-400 hover:underline transition-all duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('kakaoLink')}
                    </a>
                  </div>
                </div>
                
                {/* 이메일 */}
                <div className="flex items-start">
                  <div className="hidden md:block bg-yellow-400 p-3 rounded-full mr-4">
                    <Mail className="text-gray-900 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {t('email')}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      support@blueye.asia
                    </p>
                  </div>
                </div>
                
                {/* 회사주소 */}
                <div className="flex items-start">
                  <div className="hidden md:block bg-yellow-400 p-3 rounded-full mr-4">
                    <MapPin className="text-gray-900 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {t('address')}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t('addressDetail')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* 지도 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 lg:pl-6"
          >
            <div className="rounded-sm shadow-md overflow-hidden h-full min-h-[500px]">
              <iframe 
                className="w-full h-full" 
                id="blue-asia" 
                title="Blue asia position" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.156366564428!2d126.91368262596914!3d37.52781112634754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9f215e10f7ef%3A0x7552f6599a041aa!2z7Iug7YOc7KeE67mM65Sp!5e0!3m2!1sko!2skr!4v1735799955650!5m2!1sko!2skr" 
                width="600" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
              />
            </div>
          </motion.div>
        </div>


      </div>
    </section>
  )
}
