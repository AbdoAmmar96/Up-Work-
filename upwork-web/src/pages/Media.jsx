import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo'
import { useContent } from '../hooks/useContent'
import { getVideos, getVideoCategories } from '../api/content'
import { useLocalized } from '../lib/i18nText'
import VideoCard from '../components/VideoCard'
import Lightbox from '../components/Lightbox'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import Loader from '../components/Loader'

export default function Media() {
  const { t } = useTranslation()
  const { tt } = useLocalized()
  const { data: categories } = useContent(getVideoCategories, [])
  const { data: videos, loading } = useContent(getVideos, [])
  const [active, setActive] = useState('all')
  const [current, setCurrent] = useState(null)

  const list = useMemo(() => {
    const all = videos || []
    if (active === 'all') return all
    return all.filter((v) => v.category?.slug === active)
  }, [videos, active])

  return (
    <>
      <Seo title={tt({ ar: 'المركز الإعلامي', en: 'Media Center' })} description={tt({ ar: 'فيديوهات ولقطات من مشاريع UP Work.', en: 'Videos and footage from UP Work projects.' })} />
      <section className="page-hero">
        <div className="page-hero__grid" />
        <img src="/logo-mark-white.png" alt="" className="page-hero__mark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <span className="eyebrow hero__eyebrow">{t('media_eyebrow')}</span>
          <h1 className="page-hero__title">{t('media_title')}</h1>
          <p className="page-hero__lead">
            {tt({
              ar: 'فيديوهات تعريفية ولقطات من مشاريعنا على أرض الواقع.',
              en: 'Company videos and footage from our projects on the ground.',
            })}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <Loader />
          ) : (
            <>
              {(categories || []).length > 0 && (
                <div className="filters">
                  <button
                    className={`filter-chip${active === 'all' ? ' filter-chip--active' : ''}`}
                    onClick={() => setActive('all')}
                  >
                    {t('filter.all')}
                  </button>
                  {(categories || []).map((c) => (
                    <button
                      key={c.id}
                      className={`filter-chip${active === c.slug ? ' filter-chip--active' : ''}`}
                      onClick={() => setActive(c.slug)}
                    >
                      {tt(c.title)}
                    </button>
                  ))}
                </div>
              )}

              {list.length > 0 ? (
                <div className="video-grid">
                  {list.map((v, i) => (
                    <Reveal key={v.id} delay={(i % 3) * 0.08}>
                      <VideoCard video={v} onOpen={(vid) => setCurrent(vid)} />
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="empty-state">{t('no_videos')}</div>
              )}
            </>
          )}
        </div>
      </section>

      {current && <Lightbox video={current.embed_url} onClose={() => setCurrent(null)} />}

      <CTASection
        data={{
          title: { ar: 'هل ترغب في توثيق مشروعك بالفيديو؟', en: 'Want your project documented on video?' },
          cta: { ar: 'تواصل معنا', en: 'Contact us' },
        }}
      />
    </>
  )
}
