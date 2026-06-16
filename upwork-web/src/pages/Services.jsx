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

      {(services || []).map((svc, i) => (
        <section className={`section${i % 2 === 1 ? ' section--gray' : ''}`} key={svc.id}>
          <div className="container">
            {/* رأس الخدمة الرئيسية */}
            <div className="svc-group__head">
              <span className="svc-group__icon">
                <KeyIcon name={svc.icon} />
              </span>
              <div>
                <span className="svc-group__index">0{i + 1}</span>
                <h2 className="svc-group__title">{tt(svc.title)}</h2>
              </div>
            </div>
            {tt(svc.body) || tt(svc.excerpt) ? (
              <p className="svc-group__text">{tt(svc.body) || tt(svc.excerpt)}</p>
            ) : null}

            {/* الخدمات الفرعية كـ كروت */}
            {svc.items?.length > 0 && (
              <div className="subservice-grid">
                {svc.items.map((it, j) => {
                  const label = it.title ? tt(it.title) : tt(it)
                  const desc = it.body ? tt(it.body) : ''
                  const inner = (
                    <>
                      <span className="subservice-card__num">{String(j + 1).padStart(2, '0')}</span>
                      <h3 className="subservice-card__title">{label}</h3>
                      {desc && <p className="subservice-card__text">{desc}</p>}
                      <span className="subservice-card__more">
                        {t('cta.explore')}
                        <ArrowRight />
                      </span>
                    </>
                  )
                  return it.slug ? (
                    <Reveal key={it.slug} delay={(j % 4) * 0.06}>
                      <Link to={`/services/${svc.slug}/${it.slug}`} className="subservice-card">
                        {inner}
                      </Link>
                    </Reveal>
                  ) : (
                    <Reveal className="subservice-card subservice-card--static" key={j} delay={(j % 4) * 0.06}>
                      {inner}
                    </Reveal>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      ))}

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
