import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo'
import { useContent } from '../hooks/useContent'
import { getServices } from '../api/content'
import { useLocalized } from '../lib/i18nText'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import Loader from '../components/Loader'
import { KeyIcon, ArrowRight } from '../components/icons'

export default function Services() {
  const { t } = useTranslation()
  const { tt } = useLocalized()
  const { data: services, loading } = useContent(getServices, [])

  if (loading) return <Loader />

  return (
    <>
      <Seo title={tt({ ar: 'الخدمات', en: 'Services' })} description={tt({ ar: 'مقاولات وإنشاءات، إدارة مشاريع هندسية، وتطوير بنية تحتية.', en: 'Contracting & construction, engineering project management, and infrastructure development.' })} />
      <section className="page-hero">
        <div className="page-hero__grid" />
        <img src="/logo-mark-white.png" alt="" className="page-hero__mark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <span className="eyebrow hero__eyebrow">{t('services_eyebrow')}</span>
          <h1 className="page-hero__title">{t('services_title')}</h1>
          <p className="page-hero__lead">
            {tt({
              ar: 'من المقاولات والإنشاءات لإدارة المشاريع وتطوير البنية التحتية — حلول متكاملة بدقّة هندسية.',
              en: 'From contracting and construction to project management and infrastructure — integrated solutions with engineering precision.',
            })}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-list">
            {(services || []).map((svc, i) => (
              <Reveal className="service-row" key={svc.id} delay={i * 0.06}>
                <div className="service__index">0{i + 1}</div>
                <div>
                  <div className="service__head">
                    <span className="service__icon">
                      <KeyIcon name={svc.icon} />
                    </span>
                    <h2 className="service__title">{tt(svc.title)}</h2>
                  </div>
                  <p className="service__text">{tt(svc.body) || tt(svc.excerpt)}</p>
                  {svc.items?.length > 0 && (
                    <ul className="service__items">
                      {svc.items.map((it, j) => (
                        <li className="service__item" key={j}>{tt(it)}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <Link to="/contact" className="service__cta">
                  {t('cta.contact')}
                  <ArrowRight />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        data={{
          title: { ar: 'هل تحتاج خدمة معينة؟', en: 'Need a specific service?' },
          text: { ar: 'حدثنا عن مشروعك ونعود إليك بخطة واضحة.', en: 'Tell us about your project and we’ll get back with a clear plan.' },
          cta: { ar: 'تواصل معنا', en: 'Contact us' },
        }}
      />
    </>
  )
}
