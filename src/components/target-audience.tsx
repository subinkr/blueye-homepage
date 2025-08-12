'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Heart, DollarSign, Calendar, PieChart } from 'lucide-react'

const audiences = [
  {
    icon: Heart,
    key: 'retirement',
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-50',
  },
  {
    icon: DollarSign,
    key: 'investment',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: Calendar,
    key: 'monthlyStay',
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    icon: PieChart,
    key: 'assetAllocation',
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
  },
]

export function TargetAudience() {
  const t = useTranslations('targetAudience')

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 break-keep-all">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto break-keep-all">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Audience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 text-center">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${audience.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <audience.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 break-keep-all">
                  {t(`${audience.key}.title`)}
                </h3>
                <p className="text-gray-600 leading-relaxed break-keep-all">
                  {t(`${audience.key}.description`)}
                </p>

                {/* Background Pattern */}
                <div className={`absolute inset-0 rounded-2xl ${audience.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold luxury-text-gradient mb-4">
              10년+
            </div>
            <div className="text-gray-600 text-lg">{t('globalExperience')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold luxury-text-gradient mb-4">
              1,000+
            </div>
            <div className="text-gray-600 text-lg">만족한 고객</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold luxury-text-gradient mb-4">
              50억+
            </div>
            <div className="text-gray-600 text-lg">총 거래 규모</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
