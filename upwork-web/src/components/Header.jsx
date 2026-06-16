import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const links = [
  ['/', 'nav.home'],
  ['/about', 'nav.about'],
  ['/services', 'nav.services'],
  ['/projects', 'nav.projects'],
  ['/media', 'nav.media'],
  ['/gallery', 'nav.gallery'],
  ['/contact', 'nav.contact'],
]

export default function Header() {
  const { t, i18n } = useTranslation()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
  const logo = '/logo-color.png'

  return (
    <header className={`header${solid ? ' header--solid' : ''}`}>
      <div className="container header__inner">
        <NavLink to="/" className="brand" aria-label="UP Work">
          <img src={logo} alt="UP Work" className="brand__logo" />
        </NavLink>

        <nav className="nav">
          {links.map(([to, key]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`}
            >
              {t(key)}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <button className="lang-btn" onClick={toggleLang} aria-label="Switch language">
            {t('lang_switch')}
          </button>
          <NavLink to="/contact" className="btn btn--orange header__cta">
            {t('cta.start')}
          </NavLink>
          <button
            className="menu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-nav${open ? ' open' : ''}`}>
        <button
          className="mobile-nav__close"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          ×
        </button>
        {links.map(([to, key]) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`}
          >
            {t(key)}
          </NavLink>
        ))}
        <NavLink to="/contact" className="btn btn--orange mobile-nav__cta">
          {t('cta.start')}
        </NavLink>
      </div>
    </header>
  )
}
