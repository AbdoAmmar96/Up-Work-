import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLocalized } from '../lib/i18nText'
import Reveal from './Reveal'
import { ArrowRight } from './icons'

export default function CTASection({ data }) {
  const { t } = useTranslation()
  const { tt } = useLocalized()
  const d = data || {}
  return (
    <section className="section">
      <div className="container">
        <Reveal className="cta-band cta-band--photo">
          <div className="cta-band__grid" />
          <div className="cta-band__inner">
            <div>
              <h2 className="cta-band__title">{tt(d.title) || t('contact_title')}</h2>
              {tt(d.text) && <p className="cta-band__text">{tt(d.text)}</p>}
            </div>
            <Link to="/contact" className="btn btn--orange btn--lg">
              {tt(d.cta) || t('cta.contact')}
              <ArrowRight className="arrow" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
