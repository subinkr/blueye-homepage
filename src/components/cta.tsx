'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

export function CTA() {

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
            문의하기
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 break-words">
            상담 문의
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto break-words">
            해외 부동산 투자에 관한 궁금한 점이 있으시면 언제든지 문의해 주세요. 전문가가 친절하게 상담해 드립니다.
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
                연락처 정보
              </h3>
              
              <div className="space-y-6">
                {/* 전화번호 */}
                <div className="flex items-start">
                  <div className="hidden md:block bg-yellow-400 p-3 rounded-full mr-4">
                    <Phone className="text-gray-900 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 break-words">
                      전화번호
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 break-words">
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
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 break-words">
                      카카오톡
                    </h4>
                    <a 
                      href="https://pf.kakao.com/_qpRxjxb/chat" 
                      className="text-blue-600 dark:text-blue-400 hover:underline transition-all duration-300 break-words"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      카카오톡 상담 시작하기
                    </a>
                  </div>
                </div>
                
                {/* 이메일 */}
                <div className="flex items-start">
                  <div className="hidden md:block bg-yellow-400 p-3 rounded-full mr-4">
                    <Mail className="text-gray-900 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 break-words">
                      이메일
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 break-words">
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
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 break-words">
                      회사주소
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 break-words">
                      서울특별시 영등포구 국회대로 62길 5, 5층 502호<br />
                      (여의도동, 신태진빌딩)
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
