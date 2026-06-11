import React from 'react'
import { useLocalized } from '../lib/i18nText'
import Reveal from './Reveal'
import { KeyIcon } from './icons'

export default function Pillars({ items }) {
  const { tt } = useLocalized()
  if (!items?.length) return null
  return (
    <div className="pillars">
      {items.map((p, i) => (
        <Reveal className="pillar" key={i} delay={i * 0.1}>
          <div className="pillar__icon">
            <KeyIcon name={p.icon} />
          </div>
          <h3 className="pillar__title">{tt(p.title)}</h3>
          <p className="pillar__text">{tt(p.text)}</p>
        </Reveal>
      ))}
    </div>
  )
}
