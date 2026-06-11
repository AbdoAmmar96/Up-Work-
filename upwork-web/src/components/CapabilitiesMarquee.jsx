import React from 'react'
import { useLocalized } from '../lib/i18nText'

export default function CapabilitiesMarquee({ items }) {
  const { tt } = useLocalized()
  if (!items?.length) return null
  const loop = [...items, ...items]
  return (
    <div className="marquee">
      <div className="marquee__track">
        {loop.map((c, i) => (
          <span className="marquee__item" key={i}>
            <span className="dot" />
            {tt(c)}
          </span>
        ))}
      </div>
    </div>
  )
}
