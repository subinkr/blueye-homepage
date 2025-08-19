'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { 
  Heart, 
  GraduationCap, 
  Briefcase, 
  Palette, 
  Activity, 
  Users, 
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const lifestyleCategories = [
  {
    key: 'retirement',
    icon: Heart,
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200'
  },
  {
    key: 'education',
    icon: GraduationCap,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    key: 'business',
    icon: Briefcase,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200'
  },
  {
    key: 'culture',
    icon: Palette,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    key: 'health',
    icon: Activity,
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200'
  },
  {
    key: 'community',
    icon: Users,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  }
]

export function LifestyleVision() {
  const t = useTranslations('lifestyleVision')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategoryClick = (categoryKey: string) => {
    setSelectedCategory(selectedCategory === categoryKey ? null : categoryKey)
  }

  const scrollToCTA = () => {
    const ctaSection = document.getElementById('cta')
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="lifestyle-vision" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-xl font-korean text-gray-600 max-w-3xl mx-auto mb-4">
            {t('subtitle')}
          </p>
          <p className="text-lg font-korean text-gray-500 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Lifestyle Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {lifestyleCategories.map((category, index) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => handleCategoryClick(category.key)}
            >
              <div className={`
                relative bg-white rounded-2xl p-8 shadow-lg hover-lift border-2 transition-all duration-300
                ${selectedCategory === category.key 
                  ? `${category.borderColor} shadow-xl scale-105` 
                  : 'border-gray-100 hover:border-gray-200'
                }
              `}>
                {/* Icon */}
                <div className={`
                  w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} 
                  flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300
                `}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                  {t(`${category.key}.title`)}
                </h3>
                <p className="text-gray-600 font-korean mb-6 leading-relaxed">
                  {t(`${category.key}.description`)}
                </p>

                {/* Features */}
                {selectedCategory === category.key && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {[1, 2, 3, 4].map((featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <category.icon className={`w-4 h-4 mr-2 flex-shrink-0 ${category.color.replace('from-', 'text-').replace(' to-', '')}`} />
                          <span className="font-korean">{t(`${category.key}.feature${featureIndex}`)}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Arrow */}
                <div className={`
                  flex items-center font-medium transition-all duration-300 mt-4
                  ${selectedCategory === category.key 
                    ? 'text-gray-700' 
                    : 'text-primary-600 group-hover:translate-x-2'
                  }
                `}>
                  <span className="mr-2">
                    {selectedCategory === category.key ? t('learnMore') : t('learnMore')}
                  </span>
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                    selectedCategory === category.key ? 'rotate-90' : ''
                  }`} />
                </div>

                {/* Background Pattern */}
                <div className={`
                  absolute inset-0 rounded-2xl ${category.bgColor} opacity-0 
                  group-hover:opacity-5 transition-opacity duration-300 -z-10
                  ${selectedCategory === category.key ? 'opacity-10' : ''}
                `} />
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
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
              {t('cta')}
            </h3>
            <p className="text-lg font-korean mb-8 opacity-90 max-w-2xl mx-auto">
              {t('ctaDescription')}
            </p>
            <Button 
              onClick={scrollToCTA}
              size="lg" 
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium px-8 py-3"
            >
              {t('cta')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
