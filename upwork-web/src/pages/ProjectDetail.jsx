import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo'
import { useContent } from '../hooks/useContent'
import { getProject } from '../api/content'
import { useLocalized } from '../lib/i18nText'
import CTASection from '../components/CTASection'
import Lightbox from '../components/Lightbox'
import Reveal from '../components/Reveal'
import Loader from '../components/Loader'
import { ArrowRight, MapPin } from '../components/icons'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const { tt } = useLocalized()
  const { data: project, loading } = useContent(() => getProject(slug), [slug])
  const [lightbox, setLightbox] = useState(null)

  if (loading) return <Loader />

  if (!project) {
    return (
      <section className="section" style={{ paddingTop: '12rem', textAlign: 'center' }}>
        <div className="container">
          <h1 className="section-head__title">404</h1>
          <p className="section-head__lead" style={{ marginInline: 'auto' }}>
            {tt({ ar: 'المشروع غير موجود.', en: 'Project not found.' })}
          </p>
          <Link to="/projects" className="btn btn--primary" style={{ marginTop: '1.5rem' }}>
            {t('cta.view_all')}
          </Link>
        </div>
      </section>
    )
  }

  const gallery = (project.gallery || []).map((g) => g.url || g.original || g.large || g)
  const cover = project.cover || project.cover_thumb

  return (
    <>
      <Seo title={tt(project.title)} description={tt(project.summary) || tt(project.body)} image={project.cover || project.cover_thumb || '/og-image.png'} type="article" />
      <section className="page-hero">
        <div className="page-hero__grid" />
        <img src="/logo-mark-white.png" alt="" className="page-hero__mark" aria-hidden="true" />
        <div className="container page-hero__inner">
          {project.category && <span className="eyebrow hero__eyebrow">{tt(project.category.title)}</span>}
          <h1 className="page-hero__title">{tt(project.title)}</h1>
          {tt(project.location) && (
            <div className="breadcrumb">
              <MapPin style={{ width: 16, height: 16, color: '#f97316' }} />
              {tt(project.location)}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal
            style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              aspectRatio: '16 / 8',
              marginBottom: '2.5rem',
              background: 'linear-gradient(135deg, var(--navy), var(--blue-900))',
              position: 'relative',
            }}
          >
            {cover ? (
              <img src={cover} alt={tt(project.title)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div className="project-card__placeholder">
                <img src="/logo-mark-white.png" alt="" aria-hidden="true" />
              </div>
            )}
          </Reveal>

          <div style={{ maxWidth: '760px' }}>
            <div className="detail-prose">
              <Reveal as="p">{tt(project.body) || tt(project.summary)}</Reveal>
            </div>

            <div className="detail-meta">
              {project.category && (
                <div className="detail-meta__item">
                  <div className="info-item__label">{tt({ ar: 'التصنيف', en: 'Category' })}</div>
                  <div className="info-item__value">{tt(project.category.title)}</div>
                </div>
              )}
              {project.year && (
                <div className="detail-meta__item">
                  <div className="info-item__label">{tt({ ar: 'السنة', en: 'Year' })}</div>
                  <div className="info-item__value">{project.year}</div>
                </div>
              )}
              {tt(project.location) && (
                <div className="detail-meta__item">
                  <div className="info-item__label">{tt({ ar: 'الموقع', en: 'Location' })}</div>
                  <div className="info-item__value">{tt(project.location)}</div>
                </div>
              )}
              {tt(project.client) && (
                <div className="detail-meta__item">
                  <div className="info-item__label">{tt({ ar: 'العميل', en: 'Client' })}</div>
                  <div className="info-item__value">{tt(project.client)}</div>
                </div>
              )}
            </div>
          </div>

          {gallery.length > 0 && (
            <div className="gallery-grid" style={{ marginTop: '1rem' }}>
              {gallery.map((src, i) => (
                <div className="gallery-thumb" key={i} onClick={() => setLightbox({ images: gallery, index: i })}>
                  <img src={src} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          )}

          <Link to="/projects" className="btn btn--light" style={{ marginTop: '2.5rem' }}>
            <ArrowRight className="arrow" style={{ transform: 'scaleX(-1)' }} />
            {t('cta.view_all')}
          </Link>
        </div>
      </section>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          setIndex={(idx) => setLightbox((s) => ({ ...s, index: typeof idx === 'function' ? idx(s.index) : idx }))}
          onClose={() => setLightbox(null)}
        />
      )}

      <CTASection
        data={{
          title: { ar: 'هل لديك مشروع مشابه؟', en: 'Have a similar project?' },
          cta: { ar: 'تواصل معنا', en: 'Contact us' },
        }}
      />
    </>
  )
}
