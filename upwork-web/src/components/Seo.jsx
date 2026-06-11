import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const SITE_NAME = 'UP Work'
const siteUrl = (import.meta.env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '')).replace(/\/$/, '')

function setTag(selector, attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Lightweight, dependency-free per-page SEO (title + meta + Open Graph + Twitter).
export default function Seo({ title, description, image = '/og-image.png', type = 'website' }) {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'ar' ? 'ar' : 'en'

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — نهندس · نبني · نرتقي`
    document.title = fullTitle
    const url = typeof window !== 'undefined' ? window.location.href : siteUrl
    const absImage = image.startsWith('http') ? image : `${siteUrl}${image}`

    setTag('meta[name="description"]', 'name', 'description', description)
    setTag('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setTag('meta[property="og:description"]', 'property', 'og:description', description)
    setTag('meta[property="og:type"]', 'property', 'og:type', type)
    setTag('meta[property="og:url"]', 'property', 'og:url', url)
    setTag('meta[property="og:image"]', 'property', 'og:image', absImage)
    setTag('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME)
    setTag('meta[property="og:locale"]', 'property', 'og:locale', lang === 'ar' ? 'ar_AR' : 'en_US')
    setTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
    setTag('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setTag('meta[name="twitter:image"]', 'name', 'twitter:image', absImage)
  }, [title, description, image, type, lang])

  return null
}
