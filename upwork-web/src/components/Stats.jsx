import React from 'react'
import { useLocalized } from '../lib/i18nText'
import Reveal from './Reveal'

export default function Stats({ items }) {
  const { tt } = useLocalized()
  if (!items?.length) return null
  return (
    <div className="stats">
      {items.map((s, i) => (
        <Reveal className="stat" key={i} delay={i * 0.08}>
          <div className="stat__value">{s.value}</div>
          <div className="stat__label">{tt(s.label)}</div>
        </Reveal>
      ))}
    </div>
  )
}
