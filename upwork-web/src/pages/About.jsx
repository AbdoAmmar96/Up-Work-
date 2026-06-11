import React from 'react'
import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo'
import { useContent } from '../hooks/useContent'
import { getPages, sectionsToMap } from '../api/content'
import { useSite } from '../context/site'
import { useLocalized } from '../lib/i18nText'
import Stats from '../components/Stats'
import CapabilitiesMarquee from '../components/CapabilitiesMarquee'
import CTASection from '../components/CTASection'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Loader from '../components/Loader'

export default function About() {
  const { t } = useTranslation()
  const { tt } = useLocalized()
  const { settings } = useSite()
  const { data: aboutPages, loading } = useContent(() => getPages('about'), [])
  const { data: homePages } = useContent(() => getPages('home'), [])

  if (loading) return <Loader />

  const a = sectionsToMap(aboutPages)
  const h = sectionsToMap(homePages)
  const intro = a.about_intro || {}
  const values = a.about_values?.items || []
  const vms = a.about_vms?.items || []

  return (
    <>
      <Seo title={tt({ ar: 'من نحن', en: 'About' })} description={tt({ ar: 'تعرّف على UP Work: خبرة هندسية ودقّة في التنفيذ والتزام بالجودة والمواعيد.', en: 'Learn about UP Work: engineering expertise, precise execution, and commitment to quality.' })} />
      <section className="page-hero">
        <div className="page-hero__grid" />
        <img src="/logo-mark-white.png" alt="" className="page-hero__mark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <span className="eyebrow hero__eyebrow">{t('nav.about')}</span>
          <h1 className="page-hero__title">{tt(intro.title) || t('nav.about')}</h1>
          <p className="page-hero__lead">{tt(settings.slogan)}</p>
        </div>
      </section>

      <section className="section">
        <div className="container about-intro">
          <Reveal className="about-lockup">
            <div className="about-lockup__grid" />
            <img src="/logo-white.png" alt="UP Work" />
          </Reveal>
          <div className="about-intro__body">
            <Reveal as="p" className="lead">
              {tt(intro.body)}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--gray">
        <div className="container">
          <SectionHeading
            eyebrow={tt({ ar: 'قيمنا', en: 'Our values' })}
            title={tt({ ar: 'المبادئ التي تحركنا', en: 'The principles that drive us' })}
          />
          <div className="values-grid">
            {values.map((v, i) => (
              <Reveal className="value-card" key={i} delay={i * 0.08}>
                <div className="value__index">0{i + 1}</div>
                <h3 className="value__title">{tt(v.title)}</h3>
                <p className="value__text">{tt(v.text)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {vms.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeading
              center
              eyebrow={tt({ ar: 'هويتنا', en: 'Who we are' })}
              title={tt({ ar: 'رؤيتنا ومهمتنا وإستراتيجيتنا', en: 'Vision, Mission & Strategy' })}
            />
            <div className="cards-3">
              {vms.map((v, i) => (
                <Reveal className="vms-card" key={i} delay={i * 0.1}>
                  <div className="vms-card__index">0{i + 1}</div>
                  <h3 className="vms-card__title">{tt(v.title)}</h3>
                  <p className="vms-card__text">{tt(v.text)}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {h.home_stats?.items && (
        <section className="section section--dark">
          <div className="container">
            <SectionHeading eyebrow={t('stats_title')} title={tt({ ar: 'سجلّ نفخر بيه', en: 'A record we are proud of' })} />
            <Stats items={h.home_stats.items} />
          </div>
        </section>
      )}

      <section className="section section--dark section--tight">
        <div className="container" style={{ marginBottom: '1.6rem' }}>
          <span className="eyebrow">{t('capabilities_title')}</span>
        </div>
        <CapabilitiesMarquee items={settings.capabilities} />
      </section>

      <CTASection data={a.about_cta} />
    </>
  )
}
