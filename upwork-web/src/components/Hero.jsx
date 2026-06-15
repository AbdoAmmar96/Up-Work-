import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useLocalized } from '../lib/i18nText'
import { ArrowRight } from './icons'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero({ data }) {
  const { t } = useTranslation()
  const { tt } = useLocalized()
  const d = data || {}

  return (
    <section className="hero">
      <div className="hero__grid" />
      <div className="hero__glow" />
      <img src="/logo-mark-white.png" alt="" className="hero__mark" aria-hidden="true" />
      <svg className="hero__diagonals" viewBox="0 0 400 400" preserveAspectRatio="none" aria-hidden="true">
        <line x1="120" y1="400" x2="320" y2="40" stroke="#f97316" strokeWidth="2" opacity="0.8" />
        <line x1="180" y1="400" x2="360" y2="80" stroke="#3b6fe0" strokeWidth="2" opacity="0.6" />
        <line x1="240" y1="400" x2="400" y2="120" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
      </svg>

      <div className="container">
        <motion.div className="hero__inner" variants={container} initial="hidden" animate="show">
          <motion.span className="eyebrow hero__eyebrow" variants={item}>
            {tt(d.eyebrow) || t('tagline')}
          </motion.span>
          <motion.h1 className="hero__title" variants={item}>
            {tt(d.title)}
          </motion.h1>
          <motion.p className="hero__lead" variants={item}>
            {tt(d.subtitle)}
          </motion.p>
          <motion.div className="hero__cta btn-row" variants={item}>
            <Link to="/contact" className="btn btn--orange btn--lg">
              {tt(d.primary_cta) || t('cta.start')}
              <ArrowRight className="arrow" />
            </Link>
            <Link to="/projects" className="btn btn--ghost btn--lg">
              {tt(d.secondary_cta) || t('cta.see_work')}
            </Link>
          </motion.div>
          <motion.div className="hero__meta" variants={item}>
            <span>ENGINEER</span>
            <span className="dot" />
            <span>BUILD</span>
            <span className="dot" />
            <span>ELEVATE</span>
          </motion.div>
        </motion.div>
      </div>

      <button
        type="button"
        className="hero__scroll"
        onClick={() => {
          const hero = document.querySelector('.hero')
          const next = hero?.nextElementSibling
          if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' })
          else window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
        }}
        aria-label={tt({ ar: 'انزل لأسفل', en: 'Scroll down' })}
      >
        <span>SCROLL</span>
        <svg className="hero__scroll-arrow" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  )
}
