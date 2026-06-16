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

// يميّز الكلمة الأخيرة من عنوان الهيرو بتدرّج برتقالي،
// ويكسر العنوان لسطرين عند الفاصلة لو وُجدت (عشان يتعرض مرتّب).
function renderTitle(text) {
  if (!text) return null
  const clean = String(text).trim()
  const words = clean.split(/\s+/)
  if (words.length < 2) return <span className="grad">{clean}</span>
  const last = words.pop()
  const head = words.join(' ')
  // اكسر عند أول فاصلة عربية/لاتينية لو موجودة
  const commaIdx = head.search(/[،,]/)
  if (commaIdx !== -1) {
    const line1 = head.slice(0, commaIdx + 1)
    const line2 = head.slice(commaIdx + 1).trim()
    // آخر كلمتين (الكلمة قبل المتدرّجة + المتدرّجة) نخليهم وحدة واحدة ما تتكسرش
    const l2words = line2.split(/\s+/)
    const beforeLast = l2words.pop()
    return (
      <>
        <span className="line">{line1}</span>
        <span className="line">
          {l2words.length ? l2words.join(' ') + ' ' : ''}
          <span className="hero__nowrap">
            {beforeLast} <span className="grad">{last}</span>
          </span>
        </span>
      </>
    )
  }
  const hwords = head.split(/\s+/)
  const hBeforeLast = hwords.pop()
  return (
    <>
      {hwords.length ? hwords.join(' ') + ' ' : ''}
      <span className="hero__nowrap">
        {hBeforeLast} <span className="grad">{last}</span>
      </span>
    </>
  )
}

export default function Hero({ data, stats }) {
  const { t } = useTranslation()
  const { tt } = useLocalized()
  const d = data || {}
  const strip = (stats || []).slice(0, 4)

  return (
    <section className="hero">
      <div className="hero__grid" />
      <div className="hero__glow hero__glow--a" />
      <div className="hero__glow hero__glow--b" />
      <img src="/logo-mark-white.png" alt="" className="hero__mark" aria-hidden="true" />
      <svg className="hero__diagonals" viewBox="0 0 400 400" preserveAspectRatio="none" aria-hidden="true">
        <line x1="120" y1="400" x2="320" y2="40" stroke="#f97316" strokeWidth="2" opacity="0.8" />
        <line x1="180" y1="400" x2="360" y2="80" stroke="#3b6fe0" strokeWidth="2" opacity="0.6" />
        <line x1="240" y1="400" x2="400" y2="120" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
      </svg>

      <div className="container">
        <motion.div className="hero__inner" variants={container} initial="hidden" animate="show">
          <motion.span className="hero__badge" variants={item}>
            <span className="hero__badge-dot" />
            {tt(d.eyebrow) || t('tagline')}
          </motion.span>
          <motion.h1 className="hero__title" variants={item}>
            {renderTitle(tt(d.title))}
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
              <ArrowRight className="arrow" />
            </Link>
          </motion.div>

          {strip.length > 0 && (
            <motion.div className="hero__strip" variants={item}>
              {strip.map((s, i) => (
                <div className="hero__strip-item" key={i}>
                  <span className="hero__strip-num">{s.value}</span>
                  <span className="hero__strip-lbl">{tt(s.label)}</span>
                </div>
              ))}
            </motion.div>
          )}
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
        <span className="hero__mouse" aria-hidden="true" />
        <span className="hero__scroll-label">{tt({ ar: 'اسكرول', en: 'Scroll' })}</span>
      </button>
    </section>
  )
}
