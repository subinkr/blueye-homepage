'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Building2, Home, Users, TrendingUp, ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const services = [
  {
    icon: Building2,
    key: 'realEstate',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Home,
    key: 'management',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Users,
    key: 'lifestyle',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: TrendingUp,
    key: 'consulting',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
  },
]

export function Services() {
  const t = useTranslations('services')

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 break-words">
            {t('title')}
          </h2>
          <p className="text-xl font-korean text-gray-600 max-w-3xl mx-auto break-words">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold text-gray-900 mb-4 break-words">
                  {t(`${service.key}.title`)}
                </h3>
                <p className="text-gray-600 font-korean mb-6 leading-relaxed break-words">
                  {t(`${service.key}.description`)}
                </p>

                {/* Arrow */}
                <div className="flex items-center text-primary-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span className="mr-2">자세히 보기</span>
                  <ArrowRight className="w-4 h-4" />
                </div>

                {/* Background Pattern */}
                <div className={`absolute inset-0 rounded-2xl ${service.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button variant="luxury" size="lg" className="text-lg px-8 py-4">
            모든 서비스 보기
          </Button>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-500"
          >
            <ChevronDown className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm">다음 섹션</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
