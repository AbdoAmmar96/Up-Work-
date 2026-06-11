import React from 'react'
import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, lead, center }) {
  return (
    <div className="section-head" style={center ? { marginInline: 'auto', textAlign: 'center' } : undefined}>
      {eyebrow && (
        <Reveal as="span" className="eyebrow" style={center ? { justifyContent: 'center' } : undefined}>
          {eyebrow}
        </Reveal>
      )}
      <Reveal as="h2" className="section-head__title" delay={0.05}>
        {title}
      </Reveal>
      {lead && (
        <Reveal as="p" className="section-head__lead" delay={0.1}>
          {lead}
        </Reveal>
      )}
    </div>
  )
}
