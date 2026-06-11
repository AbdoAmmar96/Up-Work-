import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo'
import { useContent } from '../hooks/useContent'
import { getAlbums, getAlbum } from '../api/content'
import { useLocalized } from '../lib/i18nText'
import Lightbox from '../components/Lightbox'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import Loader from '../components/Loader'

export default function Gallery() {
  const { t } = useTranslation()
  const { tt } = useLocalized()
  const { data: albums, loading } = useContent(getAlbums, [])
  const [lightbox, setLightbox] = useState(null)
  const [busy, setBusy] = useState(false)

  const openAlbum = async (album) => {
    if (busy) return
    setBusy(true)
    try {
      const full = (await getAlbum(album.slug)) || album
      const imgs = (full.images || []).map((g) => g.url || g.original || g.large || g)
      if (imgs.length) setLightbox({ images: imgs, index: 0 })
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <Seo title={tt({ ar: 'معرض الصور', en: 'Gallery' })} description={tt({ ar: 'صور من مواقع التنفيذ والمشاريع المُسلَّمة.', en: 'Photos from our project sites and delivered work.' })} />
      <section className="page-hero">
        <div className="page-hero__grid" />
        <img src="/logo-mark-white.png" alt="" className="page-hero__mark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <span className="eyebrow hero__eyebrow">{t('gallery_eyebrow')}</span>
          <h1 className="page-hero__title">{t('gallery_title')}</h1>
          <p className="page-hero__lead">
            {tt({
              ar: 'صور من مواقع التنفيذ والمشاريع المُسلَّمة.',
              en: 'Photos from our project sites and delivered work.',
            })}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <Loader />
          ) : (albums || []).length > 0 ? (
            <div className="album-grid">
              {(albums || []).map((album, i) => {
                const cover = album.cover
                return (
                  <Reveal key={album.id} delay={(i % 3) * 0.08}>
                    <button className="album-card" onClick={() => openAlbum(album)} style={{ width: '100%' }}>
                      {cover ? <img src={cover} alt={tt(album.title)} loading="lazy" /> : <div className="album-card__grid" />}
                      <div className="album-card__overlay">
                        <h3 className="album-card__title">{tt(album.title)}</h3>
                        {typeof album.images_count === 'number' && album.images_count > 0 && (
                          <span className="album-card__count">
                            {album.images_count} {t('photos_count')}
                          </span>
                        )}
                      </div>
                    </button>
                  </Reveal>
                )
              })}
            </div>
          ) : (
            <div className="empty-state">{t('no_images')}</div>
          )}
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
          title: { ar: 'هل ترغب في رؤية أعمالنا عن قرب؟', en: 'Want to see our work up close?' },
          cta: { ar: 'تواصل معنا', en: 'Contact us' },
        }}
      />
    </>
  )
}
