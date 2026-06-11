import React from 'react'
import { useSite } from '../context/site'
import { useTranslation } from 'react-i18next'
import { Whatsapp } from './icons'

export default function WhatsappFab() {
  const { settings } = useSite()
  const { t } = useTranslation()
  const num = (settings.whatsapp || '').replace(/[^\d]/g, '')
  if (!num) return null
  const text = encodeURIComponent(
    t('tagline') === 'نهندس · نبني · نرتقي' ? 'مرحباً UP Work، حابب أستفسر عن خدماتكم.' : 'Hi UP Work, I’d like to ask about your services.'
  )
  return (
    <a
      className="wa-fab"
      href={`https://wa.me/${num}?text=${text}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
    >
      <Whatsapp />
    </a>
  )
}
