import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo'
import { useContent } from '../hooks/useContent'
import { getProjects, getProjectCategories } from '../api/content'
import { useLocalized } from '../lib/i18nText'
import ProjectCard from '../components/ProjectCard'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import Loader from '../components/Loader'

export default function Projects() {
  const { t } = useTranslation()
  const { tt } = useLocalized()
  const { data: categories } = useContent(getProjectCategories, [])
  const { data: projects, loading } = useContent(() => getProjects({ per_page: 60 }), [])
  const [active, setActive] = useState('all')

  const list = useMemo(() => {
    const all = projects || []
    if (active === 'all') return all
    return all.filter((p) => p.category?.slug === active)
  }, [projects, active])

  return (
    <>
      <Seo title={tt({ ar: 'المشاريع', en: 'Projects' })} description={tt({ ar: 'مشاريع UP Work عبر القطاعات السكنية والتجارية والصناعية والبنية التحتية.', en: 'UP Work projects across residential, commercial, industrial, and infrastructure sectors.' })} />
      <section className="page-hero">
        <div className="page-hero__grid" />
        <img src="/logo-mark-white.png" alt="" className="page-hero__mark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <span className="eyebrow hero__eyebrow">{t('nav.projects')}</span>
          <h1 className="page-hero__title">{t('featured_title')}</h1>
          <p className="page-hero__lead">
            {tt({
              ar: 'مجموعة من المشاريع اللي نفّذناها عبر القطاعات السكنية والتجارية والصناعية والبنية التحتية.',
              en: 'A selection of projects we’ve delivered across residential, commercial, industrial, and infrastructure sectors.',
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

              {list.length > 0 ? (
                <div className="projects-grid">
                  {list.map((p, i) => (
                    <Reveal key={p.id} delay={(i % 3) * 0.08}>
                      <ProjectCard project={p} />
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="empty-state">{t('no_projects')}</div>
              )}
            </>
          )}
        </div>
      </section>

      <CTASection
        data={{
          title: { ar: 'مشروعك ممكن يكون التالي', en: 'Your project could be next' },
          text: { ar: 'خلّينا نساعدك تنفّذه بالجودة والسرعة المطلوبة.', en: 'Let us help you deliver it with the quality and speed you need.' },
          cta: { ar: 'ابدأ مشروعك', en: 'Start your project' },
        }}
      />
    </>
  )
}
