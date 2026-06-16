import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo'
import { useContent } from '../hooks/useContent'
import { getServices } from '../api/content'
import { useLocalized } from '../lib/i18nText'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import Loader from '../components/Loader'
import Lightbox from '../components/Lightbox'
import { KeyIcon, ArrowRight } from '../components/icons'

export default function ServiceDetail() {
  const { serviceSlug, subSlug } = useParams()
  const { t } = useTranslation()
  const { tt } = useLocalized()
  const { data: services, loading } = useContent(getServices, [])
  const [lbIndex, setLbIndex] = useState(null)

  if (loading) return <Loader />

  const service = (services || []).find((s) => s.slug === serviceSlug)
  const sub = service?.items?.find((it) => it.slug === subSlug)

  if (!service || !sub) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h1 className="section-head__title">{tt({ ar: 'الخدمة غير موجودة', en: 'Service not found' })}</h1>
          <Link to="/services" className="btn btn--primary" style={{ marginTop: '1.5rem' }}>
            {tt({ ar: 'كل الخدمات', en: 'All services' })}
          </Link>
        </div>
      </section>
    )
  }

  const images = sub.images || []
  const siblings = (service.items || []).filter((it) => it.slug !== sub.slug)

  return (
    <>
      <Seo title={`${tt(sub.title)} — ${tt(service.title)}`} description={tt(sub.body)} />

      <section className="page-hero page-hero--compact">
        <div className="page-hero__grid" />
        <img src="/logo-mark-white.png" alt="" className="page-hero__mark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <nav className="breadcrumb">
            <Link to="/services">{t('services_eyebrow')}</Link>
            <span>/</span>
            <Link to={`/services#${service.slug}`}>{tt(service.title)}</Link>
          </nav>
          <span className="eyebrow hero__eyebrow">
            <span className="service__icon service__icon--sm"><KeyIcon name={service.icon} /></span>
            {tt(service.title)}
          </span>
          <h1 className="page-hero__title">{tt(sub.title)}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container sub-detail">
          <div className="sub-detail__body">
            <Reveal as="p" className="lead">{tt(sub.body)}</Reveal>
          </div>

          {images.length > 0 && (
            <div className="sub-gallery">
              {images.map((src, i) => (
                <Reveal
                  as="button"
                  className="sub-gallery__item"
                  key={i}
                  delay={i * 0.08}
                  onClick={() => setLbIndex(i)}
                >
                  <img src={src} alt={`${tt(sub.title)} ${i + 1}`} loading="lazy" />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="section section--gray">
          <div className="container">
            <h2 className="section-head__title" style={{ marginBottom: '1.6rem' }}>
              {tt({ ar: 'خدمات أخرى في', en: 'More in' })} {tt(service.title)}
            </h2>
            <div className="sub-chips">
              {siblings.map((it) => (
                <Link key={it.slug} to={`/services/${service.slug}/${it.slug}`} className="sub-chip">
                  {tt(it.title)}
                  <ArrowRight />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        data={{
          title: { ar: 'محتاج الخدمة دي في مشروعك؟', en: 'Need this service in your project?' },
          text: { ar: 'تواصل معنا ونرجعلك بخطة واضحة وتكلفة محددة.', en: 'Talk to us and we’ll get back with a clear plan and a defined cost.' },
          cta: { ar: 'تواصل معنا', en: 'Contact us' },
        }}
      />

      {lbIndex !== null && (
        <Lightbox images={images} index={lbIndex} setIndex={setLbIndex} onClose={() => setLbIndex(null)} />
      )}
    </>
  )
}
