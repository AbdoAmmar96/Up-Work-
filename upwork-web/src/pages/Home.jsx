import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo'
import { useContent } from '../hooks/useContent'
import { getPages, getServices, getProjects, sectionsToMap } from '../api/content'
import { useSite } from '../context/site'
import { useLocalized } from '../lib/i18nText'
import Hero from '../components/Hero'
import Pillars from '../components/Pillars'
import Stats from '../components/Stats'
import ProjectCard from '../components/ProjectCard'
import CapabilitiesMarquee from '../components/CapabilitiesMarquee'
import ClientsStrip from '../components/ClientsStrip'
import CTASection from '../components/CTASection'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Loader from '../components/Loader'
import { KeyIcon, ArrowUpRight } from '../components/icons'

export default function Home() {
  const { t } = useTranslation()
  const { tt } = useLocalized()
  const { settings } = useSite()
  const { data: pages, loading } = useContent(() => getPages('home'), [])
  const { data: services } = useContent(getServices, [])
  const { data: projects } = useContent(() => getProjects({ featured: 1 }), [])

  if (loading) return <Loader />

  const s = sectionsToMap(pages)
  const featured = (projects || []).slice(0, 3)

  return (
    <>
      <Seo description={tt({ ar: 'شركة هندسة ومقاولات حديثة في مصر: مقاولات وإنشاءات، إدارة مشاريع هندسية، وتطوير بنية تحتية.', en: 'A modern engineering & construction company in Egypt: contracting, project management, and infrastructure development.' })} />
      <Hero data={s.home_hero} />

      {/* Pillars */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow={t('pillars_eyebrow')}
            title={tt({ ar: 'نبني على أساس من الخبرة والدقة', en: 'Built on expertise and precision' })}
            lead={tt({
              ar: 'ثلاث ركائز نعتمد عليها في كل مشروع، من أول فكرة حتى التسليم.',
              en: 'Three principles we bring to every project — from the first idea to final handover.',
            })}
          />
          <Pillars items={s.home_pillars?.items} />
        </div>
      </section>

      {/* Services preview */}
      <section className="section section--gray">
        <div className="container">
          <SectionHeading
            eyebrow={t('services_eyebrow')}
            title={t('services_title')}
            lead={tt({
              ar: 'خدمات هندسية متكاملة تغطّي دورة حياة المشروع بالكامل.',
              en: 'Integrated engineering services that cover the full project lifecycle.',
            })}
          />
          <div className="cards-3">
            {(services || []).slice(0, 3).map((svc, i) => (
              <Reveal className="scard" key={svc.id} delay={i * 0.1}>
                <div className="scard__icon">
                  <KeyIcon name={svc.icon} />
                </div>
                <div className="scard__index">0{i + 1}</div>
                <h3 className="scard__title">{tt(svc.title)}</h3>
                <p className="scard__text">{tt(svc.excerpt)}</p>
                <Link to="/services" className="scard__link">
                  {t('cta.explore')}
                  <ArrowUpRight />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section section--dark">
        <div className="container">
          <SectionHeading eyebrow={t('stats_title')} title={tt({ ar: 'سجلّ نفخر بيه', en: 'A record we are proud of' })} />
          <Stats items={s.home_stats?.items} />
        </div>
      </section>

      {/* Featured projects */}
      {featured.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeading eyebrow={t('featured_eyebrow')} title={t('featured_title')} />
            <div className="projects-grid">
              {featured.map((p) => (
                <ProjectCard project={p} key={p.id} />
              ))}
            </div>
            <Reveal className="btn-row" style={{ marginTop: '2.4rem' }} delay={0.1}>
              <Link to="/projects" className="btn btn--primary">
                {t('cta.view_all')}
                <ArrowUpRight />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Capabilities */}
      <section className="section section--dark section--tight">
        <div className="container" style={{ marginBottom: '1.6rem' }}>
          <span className="eyebrow">{t('capabilities_title')}</span>
        </div>
        <CapabilitiesMarquee items={settings.capabilities} />
      </section>

      {/* Clients / brands */}
      {settings.clients?.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeading
              center
              eyebrow={t('clients_eyebrow')}
              title={t('clients_title')}
              lead={tt({
                ar: 'فخورون بثقة نخبة من كبرى الشركات والعلامات التجارية في السوق.',
                en: 'Proud to be trusted by leading companies and brands across the market.',
              })}
            />
            <ClientsStrip items={settings.clients} />
          </div>
        </section>
      )}

      <CTASection
        data={{
          title: { ar: 'جاهزون لبناء مشروعك القادم', en: 'Ready to build your next project' },
          text: {
            ar: 'تواصل معنا، ونحوّل فكرتك إلى خطة تنفيذ واضحة بجدول زمني وميزانية.',
            en: 'Talk to us — we’ll turn your idea into a clear plan with a timeline and a budget.',
          },
          cta: { ar: 'ابدأ الآن', en: 'Start now' },
        }}
      />
    </>
  )
}
