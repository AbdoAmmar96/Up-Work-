import React from 'react'

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}
const fillBase = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'currentColor' }

export const ArrowRight = (p) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const ArrowUpRight = (p) => (
  <svg {...base} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
)
export const ArrowUp = (p) => (
  <svg {...base} {...p}><path d="M12 19V5M6 11l6-6 6 6" /></svg>
)
export const ChevronLeft = (p) => (
  <svg {...base} {...p}><path d="M15 6l-6 6 6 6" /></svg>
)
export const ChevronRight = (p) => (
  <svg {...base} {...p}><path d="M9 6l6 6-6 6" /></svg>
)
export const Close = (p) => (
  <svg {...base} {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>
)
export const Play = (p) => (
  <svg {...fillBase} {...p}><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" /></svg>
)
export const Phone = (p) => (
  <svg {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
)
export const Mail = (p) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
)
export const MapPin = (p) => (
  <svg {...base} {...p}><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
)
export const Clock = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
)
export const BuildingSkyscraper = (p) => (
  <svg {...base} {...p}><path d="M4 21V8l5-3v16M9 21V3l6 3v15M15 21V9l5 3v9M3 21h18M7 9h0M7 12h0M12 8h0M12 11h0M12 14h0M18 14h0" /></svg>
)
export const Building = (p) => (
  <svg {...base} {...p}><rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3" /></svg>
)
export const ClipboardCheck = (p) => (
  <svg {...base} {...p}><rect x="6" y="4" width="12" height="17" rx="2" /><path d="M9 4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9.5 13.5l1.8 1.8 3.2-3.6" /></svg>
)
export const Road = (p) => (
  <svg {...base} {...p}><path d="M5 21 8 3M19 21 16 3M12 5v2M12 11v2M12 17v2" /></svg>
)
export const Helmet = (p) => (
  <svg {...base} {...p}><path d="M3 16a9 9 0 0 1 18 0M2 16h20v2H2zM9 7V4h6v3M9 8a3 3 0 0 1 6 0" /></svg>
)
export const TrendingUp = (p) => (
  <svg {...base} {...p}><path d="M3 17l6-6 4 4 8-8M15 7h6v6" /></svg>
)
export const Target = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.5" /></svg>
)
export const Layers = (p) => (
  <svg {...base} {...p}><path d="m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5M3 17l9 5 9-5" /></svg>
)
export const Spark = (p) => (
  <svg {...base} {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></svg>
)
export const Facebook = (p) => (
  <svg {...fillBase} {...p}><path d="M14 9h3V5h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1Z" /></svg>
)
export const Instagram = (p) => (
  <svg {...base} {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" /></svg>
)
export const Linkedin = (p) => (
  <svg {...fillBase} {...p}><path d="M6.94 7.5A1.94 1.94 0 1 1 7 3.62a1.94 1.94 0 0 1-.06 3.88ZM5.5 9h3v9.5h-3V9Zm5 0h2.86v1.3h.04a3.13 3.13 0 0 1 2.82-1.55c3 0 3.78 1.98 3.78 4.55v5.2h-3v-4.6c0-1.1-.02-2.52-1.53-2.52-1.54 0-1.77 1.2-1.77 2.44v4.68h-3V9Z" /></svg>
)
export const Youtube = (p) => (
  <svg {...fillBase} {...p}><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.5 12 5.5 12 5.5s-6 0-7.9.6A3 3 0 0 0 2 8.2 31 31 0 0 0 1.7 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.6 7.9.6 7.9.6s6 0 7.9-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22.3 12 31 31 0 0 0 22 8.2ZM10 15V9l5.2 3L10 15Z" /></svg>
)
export const Whatsapp = (p) => (
  <svg {...fillBase} {...p}><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.9-4.5-4.1-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9 .9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.5c-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.4 2.6 1.6.2.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.9.9c.3.1.4.2.5.3.1.3.1.6-.1 1.1Z" /></svg>
)

const map = {
  'building-skyscraper': BuildingSkyscraper,
  'clipboard-check': ClipboardCheck,
  road: Road,
  helmet: Helmet,
  building: Building,
  trending: TrendingUp,
  'trending-up': TrendingUp,
  target: Target,
  layers: Layers,
  spark: Spark,
}

// Render a service/pillar icon by its stored key, with a sensible fallback.
export function KeyIcon({ name, ...rest }) {
  const Cmp = map[name] || BuildingSkyscraper
  return <Cmp {...rest} />
}
