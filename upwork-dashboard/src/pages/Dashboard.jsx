import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import client from '../api/client'
import { ml } from '../lib/ml'
import Spinner from '../components/Spinner'
import { Building, Tools, Film, Photo, Mail, Inbox } from '../components/icons'

const unwrap = (res) => res.data?.data ?? res.data ?? []
const totalOf = (res) => res?.data?.meta?.total ?? (Array.isArray(res?.data?.data) ? res.data.data.length : 0)

function fmtDate(s) {
  if (!s) return ''
  try {
    return new Date(s).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return s
  }
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [counts, setCounts] = useState({})
  const [messages, setMessages] = useState([])

  useEffect(() => {
    let active = true
    Promise.allSettled([
      client.get('/admin/projects', { params: { per_page: 1 } }),
      client.get('/admin/services', { params: { per_page: 1 } }),
      client.get('/admin/videos', { params: { per_page: 1 } }),
      client.get('/admin/albums', { params: { per_page: 1 } }),
      client.get('/admin/messages', { params: { per_page: 5 } }),
      client.get('/admin/messages', { params: { unread: 1, per_page: 1 } }),
    ])
      .then(([p, s, v, a, mRecent, mUnread]) => {
        if (!active) return
        const val = (r) => (r.status === 'fulfilled' ? totalOf(r.value) : 0)
        setCounts({
          projects: val(p),
          services: val(s),
          videos: val(v),
          albums: val(a),
          messages: val(mRecent),
          unread: val(mUnread),
        })
        setMessages(mRecent.status === 'fulfilled' ? unwrap(mRecent.value).slice(0, 5) : [])
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  if (loading) return <Spinner />

  const cards = [
    { icon: Building, value: counts.projects, label: 'مشروع', to: '/projects' },
    { icon: Tools, value: counts.services, label: 'خدمة', to: '/services' },
    { icon: Film, value: counts.videos, label: 'فيديو', to: '/videos' },
    { icon: Photo, value: counts.albums, label: 'ألبوم', to: '/albums' },
    { icon: Mail, value: counts.messages, label: 'رسالة', to: '/messages' },
  ]

  return (
    <>
      <div className="page-head">
        <div>
          <h2>أهلاً بيك 👋</h2>
          <div className="muted">نظرة سريعة على محتوى الموقع.</div>
        </div>
      </div>

      <div className="stat-grid">
        {cards.map((c, i) => (
          <Link to={c.to} className="stat-card" key={i}>
            <div className="stat-card__icon"><c.icon /></div>
            <div>
              <div className="stat-card__value">{c.value ?? 0}</div>
              <div className="stat-card__label">{c.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="card card--pad">
        <div className="page-head" style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.15rem' }}>أحدث الرسائل {counts.unread > 0 && <span className="badge badge--orange">{counts.unread} غير مقروءة</span>}</h3>
          <Link to="/messages" className="btn btn--ghost btn--sm">عرض الكل</Link>
        </div>
        {messages.length === 0 ? (
          <div className="empty"><Inbox style={{ width: 40, margin: '0 auto 0.6rem', color: 'var(--muted)' }} />لا توجد رسائل بعد.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>الاسم</th><th>الموضوع</th><th>التاريخ</th><th>الحالة</th></tr>
              </thead>
              <tbody>
                {messages.map((m) => (
                  <tr key={m.id}>
                    <td className="cell-title">{m.name}</td>
                    <td>{ml(m.subject) || '—'}</td>
                    <td style={{ color: 'var(--muted)' }}>{fmtDate(m.created_at)}</td>
                    <td>{!(m.read || m.is_read || m.read_at) ? <span className="badge badge--orange">جديدة</span> : <span className="badge badge--gray">مقروءة</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
