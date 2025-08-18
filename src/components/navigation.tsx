'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { Logo } from '@/components/ui/logo'
import { countries, getCountryName } from '@/lib/countries'

const locales = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
]

export function Navigation() {
  const t = useTranslations('navigation')
  const [isOpen, setIsOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isCountriesOpen, setIsCountriesOpen] = useState(false)
  const locale = useLocale()

  const currentLocale = locales.find(l => l.code === locale)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link 
            href={`/${locale}`}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Logo size="sm" className="h-8 text-white" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href={`/${locale}#hero`}
              onClick={(e) => {
                e.preventDefault()
                window.location.href = `/${locale}#hero`
              }}
              className="text-white hover:text-blue-200 transition-colors font-medium"
            >
              {t('home')}
            </Link>

            <Link
              href="/notices"
              className="text-white hover:text-blue-200 transition-colors font-medium"
            >
              {t('notices')}
            </Link>

            <Link
              href="/magazine"
              className="text-white hover:text-blue-200 transition-colors font-medium"
            >
              {t('magazine')}
            </Link>

            
            {/* Countries Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCountriesOpen(!isCountriesOpen)}
                className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors font-medium"
              >
                <span>{t('properties')}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {isCountriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2"
                  >
                    {countries.map((country, index) => (
                      <Link
                        key={country.code}
                        href={`/${locale}#country-${index}`}
                        onClick={(e) => {
                          e.preventDefault()
                          setIsCountriesOpen(false)
                          window.location.href = `/${locale}#country-${index}`
                        }}
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div 
                          className="w-3 h-3 rounded-full mr-3" 
                          style={{ backgroundColor: country.color }}
                        />
                        <span>{getCountryName(country.code, locale)}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            

            <Link
              href={`/${locale}#cta`}
              className="text-white hover:text-blue-200 transition-colors font-medium"
            >
              {t('contact')}
            </Link>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors font-medium"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLocale?.flag}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2"
                  >
                    {locales.map((loc) => (
                      <Link
                        key={loc.code}
                        href={`/${loc.code}`}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsLanguageOpen(false)}
                      >
                        <span>{loc.flag}</span>
                        <span>{loc.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>


          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-white hover:text-blue-200 hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href={`/${locale}#hero`}
                  onClick={(e) => {
                    e.preventDefault()
                    setIsOpen(false)
                    window.location.href = `/${locale}#hero`
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  {t('home')}
                </Link>

                <Link
                  href="/notices"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  {t('notices')}
                </Link>

                <Link
                  href="/magazine"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  {t('magazine')}
                </Link>

                
                {/* Mobile Countries Dropdown */}
                <button
                  onClick={() => setIsCountriesOpen(!isCountriesOpen)}
                  className="flex items-center justify-between w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <span>{t('properties')}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isCountriesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isCountriesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-1"
                    >
                      {countries.map((country, index) => (
                        <Link
                          key={country.code}
                          href={`/${locale}#country-${index}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setIsOpen(false)
                            setIsCountriesOpen(false)
                            window.location.href = `/${locale}#country-${index}`
                          }}
                          className="flex items-center w-full px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors text-left"
                        >
                          <div 
                            className="w-3 h-3 rounded-full mr-3" 
                            style={{ backgroundColor: country.color }}
                          />
                          <span>{getCountryName(country.code, locale)}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link
                  href={`/${locale}#cta`}
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  {t('contact')}
                </Link>

                {/* Mobile Language Selector */}
                <div className="px-3 py-2">
                  <div className="text-sm font-medium text-gray-500 mb-2">
                    {t('language')}
                  </div>
                  <div className="space-y-1">
                    {locales.map((loc) => (
                      <Link
                        key={loc.code}
                        href={`/${loc.code}`}
                        className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <span>{loc.flag}</span>
                        <span>{loc.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>


              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
