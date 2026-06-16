import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSite } from '../context/site'
import { useLocalized } from '../lib/i18nText'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Youtube, ArrowUp } from './icons'

const navLinks = [
  ['/about', 'nav.about'],
  ['/services', 'nav.services'],
  ['/projects', 'nav.projects'],
  ['/media', 'nav.media'],
  ['/gallery', 'nav.gallery'],
  ['/contact', 'nav.contact'],
]

export default function Footer() {
  const { t } = useTranslation()
  const { tt } = useLocalized()
  const { settings } = useSite()
  const year = new Date().getFullYear()
  const social = settings.social || {}

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <img src="/logo-white.png" alt="UP Work" className="footer__logo" />
            <p className="footer__tagline">{tt(settings.slogan)}</p>
            <div className="footer__social">
              {social.facebook && (
                <a className="social-link" href={social.facebook} aria-label="Facebook" target="_blank" rel="noreferrer"><Facebook /></a>
              )}
              {social.instagram && (
                <a className="social-link" href={social.instagram} aria-label="Instagram" target="_blank" rel="noreferrer"><Instagram /></a>
              )}
              {social.linkedin && (
                <a className="social-link" href={social.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin /></a>
              )}
              {social.youtube && (
                <a className="social-link" href={social.youtube} aria-label="YouTube" target="_blank" rel="noreferrer"><Youtube /></a>
              )}
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">{t('footer.quick')}</h4>
            <div className="footer__links">
              {navLinks.map(([to, key]) => (
                <Link key={to} to={to}>{t(key)}</Link>
              ))}
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">{t('nav.contact')}</h4>
            <div className="footer__contact">
              {settings.phone && (
                <a href={`tel:${String(settings.phone).replace(/\s/g, '')}`}><Phone /><bdi dir="ltr">{settings.phone}</bdi></a>
              )}
              {settings.email && <a href={`mailto:${settings.email}`}><Mail />{settings.email}</a>}
              {settings.address && <span><MapPin />{tt(settings.address)}</span>}
              {settings.working_hours && <span><Clock />{tt(settings.working_hours)}</span>}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__credit">© {year} UP Work. {t('footer.rights')}.</span>
          <span className="footer__credit">
            {t('footer.designed')}{' '}
            <a href="https://bp-eg.com" target="_blank" rel="noreferrer">شريك الأعمال — Business Partner</a>
          </span>
          <button
            type="button"
            className="footer__top-link"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {tt({ ar: 'العودة للأعلى', en: 'Back to top' })}
            <ArrowUp />
          </button>
        </div>
      </div>
    </footer>
  )
}
