import React from 'react'
import { ChevronRight, ChevronLeft } from './icons'

// RTL-aware pager driven by Laravel pagination `meta`.
export default function Pagination({ meta, onPage }) {
  if (!meta || (meta.last_page || 1) <= 1) return null
  const current = meta.current_page || 1
  const last = meta.last_page || 1

  const pages = []
  const from = Math.max(1, current - 2)
  const to = Math.min(last, current + 2)
  for (let i = from; i <= to; i++) pages.push(i)

  const btn = (label, page, disabled, active) => (
    <button
      key={label + page}
      className="page-btn"
      disabled={disabled}
      aria-current={active ? 'page' : undefined}
      style={
        active
          ? { background: 'var(--blue)', color: '#fff', borderColor: 'var(--blue)' }
          : undefined
      }
      onClick={() => onPage(page)}
    >
      {label}
    </button>
  )

  return (
    <div className="pagination">
      {/* In RTL, "previous" points right */}
      <button className="page-btn" disabled={current <= 1} onClick={() => onPage(current - 1)} aria-label="السابق">
        <ChevronRight />
      </button>
      {from > 1 && (
        <>
          {btn('1', 1, false, current === 1)}
          {from > 2 && <span className="page-dots">…</span>}
        </>
      )}
      {pages.map((p) => btn(String(p), p, false, p === current))}
      {to < last && (
        <>
          {to < last - 1 && <span className="page-dots">…</span>}
          {btn(String(last), last, false, current === last)}
        </>
      )}
      <button className="page-btn" disabled={current >= last} onClick={() => onPage(current + 1)} aria-label="التالي">
        <ChevronLeft />
      </button>
    </div>
  )
}
