import React from 'react'
import Reveal from './Reveal'

// شعارات العملاء — تتقرأ من settings.clients (كل عنصر { name, logo })
export default function ClientsStrip({ items }) {
  if (!items?.length) return null
  return (
    <div className="clients-grid">
      {items.map((c, i) => (
        <Reveal className="client-card" key={c.name || i} delay={(i % 5) * 0.06}>
          <img src={c.logo} alt={c.name} loading="lazy" className="client-card__logo" />
        </Reveal>
      ))}
    </div>
  )
}
