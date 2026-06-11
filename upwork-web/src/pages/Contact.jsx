import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo'
import { useSite } from '../context/site'
import { useLocalized } from '../lib/i18nText'
import { sendContact } from '../api/content'
import Reveal from '../components/Reveal'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Youtube, ArrowRight } from '../components/icons'

const empty = { name: '', email: '', phone: '', subject: '', message: '' }

export default function Contact() {
  const { t, i18n } = useTranslation()
  const { tt } = useLocalized()
  const { settings } = useSite()
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState(null) // 'ok' | 'err' | null
  const [sending, setSending] = useState(false)

  const social = settings.social || {}
  const addressText = tt(settings.address) || 'Cairo, Egypt'
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(addressText)}&output=embed`

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (sending) return
    setStatus(null)
    setSending(true)
    try {
      await sendContact({ ...form, locale: i18n.language })
      setStatus('ok')
      setForm(empty)
    } catch (err) {
      setStatus('err')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <Seo title={tt({ ar: 'تواصل معنا', en: 'Contact' })} description={tt({ ar: 'تواصل مع UP Work لمناقشة مشروعك الهندسي.', en: 'Get in touch with UP Work to discuss your engineering project.' })} />
      <section className="page-hero">
        <div className="page-hero__grid" />
        <img src="/logo-mark-white.png" alt="" className="page-hero__mark" aria-hidden="true" />
        <div className="container page-hero__inner">
          <span className="eyebrow hero__eyebrow">{t('contact_eyebrow')}</span>
          <h1 className="page-hero__title">{t('contact_title')}</h1>
          <p className="page-hero__lead">
            {tt({
              ar: 'املأ النموذج وسنعود إليك في أقرب وقت، أو تواصل معنا مباشرةً.',
              en: 'Fill in the form and we’ll get back to you shortly — or reach us directly.',
            })}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-layout">
          <Reveal>
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">{t('form.name')}</label>
                  <input id="name" name="name" value={form.name} onChange={onChange} required />
                </div>
                <div className="field">
                  <label htmlFor="email">{t('form.email')}</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={onChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="phone">{t('form.phone')}</label>
                  <input id="phone" name="phone" value={form.phone} onChange={onChange} dir="ltr" />
                </div>
                <div className="field">
                  <label htmlFor="subject">{t('form.subject')}</label>
                  <input id="subject" name="subject" value={form.subject} onChange={onChange} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="message">{t('form.message')}</label>
                <textarea id="message" name="message" value={form.message} onChange={onChange} required />
              </div>
              <button type="submit" className="btn btn--primary btn--lg" disabled={sending}>
                {sending ? t('form.sending') : t('cta.send')}
                {!sending && <ArrowRight className="arrow" />}
              </button>
              {status === 'ok' && <div className="form-note form-note--ok">{t('form.success')}</div>}
              {status === 'err' && <div className="form-note form-note--err">{t('form.error')}</div>}
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="contact-info">
              {settings.phone && (
                <div className="info-item">
                  <span className="info-item__icon"><Phone /></span>
                  <div>
                    <div className="info-item__label">{t('contact_info.phone')}</div>
                    <a className="info-item__value" href={`tel:${String(settings.phone).replace(/\s/g, '')}`} dir="ltr">
                      {settings.phone}
                    </a>
                  </div>
                </div>
              )}
              {settings.email && (
                <div className="info-item">
                  <span className="info-item__icon"><Mail /></span>
                  <div>
                    <div className="info-item__label">{t('contact_info.email')}</div>
                    <a className="info-item__value" href={`mailto:${settings.email}`}>{settings.email}</a>
                  </div>
                </div>
              )}
              <div className="info-item">
                <span className="info-item__icon"><MapPin /></span>
                <div>
                  <div className="info-item__label">{t('contact_info.address')}</div>
                  <div className="info-item__value">{addressText}</div>
                </div>
              </div>
              {settings.working_hours && (
                <div className="info-item">
                  <span className="info-item__icon"><Clock /></span>
                  <div>
                    <div className="info-item__label">{t('contact_info.hours')}</div>
                    <div className="info-item__value">{tt(settings.working_hours)}</div>
                  </div>
                </div>
              )}
              <div>
                <div className="info-item__label" style={{ marginBottom: '0.5rem' }}>{t('contact_info.follow')}</div>
                <div className="contact-social">
                  {social.facebook && <a className="social-link" href={social.facebook} aria-label="Facebook" target="_blank" rel="noreferrer"><Facebook /></a>}
                  {social.instagram && <a className="social-link" href={social.instagram} aria-label="Instagram" target="_blank" rel="noreferrer"><Instagram /></a>}
                  {social.linkedin && <a className="social-link" href={social.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin /></a>}
                  {social.youtube && <a className="social-link" href={social.youtube} aria-label="YouTube" target="_blank" rel="noreferrer"><Youtube /></a>}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="container">
          <div className="map">
            <iframe src={mapSrc} title="map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>
    </>
  )
}
