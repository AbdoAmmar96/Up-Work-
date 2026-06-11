import React, { useEffect, useState, useCallback } from 'react'
import client from '../api/client'
import { useToast } from '../lib/toast'
import { useBadge } from '../lib/badge'
import { ml } from '../lib/ml'
import Spinner from '../components/Spinner'
import Modal from '../components/Modal'
import Pagination from '../components/Pagination'
import { Trash, X, Phone, Mail, Inbox } from '../components/icons'

const PER_PAGE = 15
const isRead = (m) => !!(m.read || m.is_read || m.read_at)
function fmtDate(s) {
  if (!s) return ''
  try {
    return new Date(s).toLocaleString('ar-EG', { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return s
  }
}

export default function Messages() {
  const toast = useToast()
  const { refresh } = useBadge()
  const [rows, setRows] = useState([])
  const [meta, setMeta] = useState(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [toDelete, setToDelete] = useState(null)

  const load = useCallback(
    (p) => {
      setLoading(true)
      client
        .get('/admin/messages', { params: { per_page: PER_PAGE, page: p } })
        .then((res) => {
          setRows(res.data?.data ?? res.data ?? [])
          setMeta(res.data?.meta ?? null)
        })
        .catch(() => toast.push('تعذّر التحميل', 'err'))
        .finally(() => setLoading(false))
    },
    [toast]
  )

  useEffect(() => {
    load(page)
  }, [load, page])

  const open = async (m) => {
    setSelected(m)
    if (!isRead(m)) {
      try {
        await client.put(`/admin/messages/${m.id}/read`)
        setRows((r) => r.map((x) => (x.id === m.id ? { ...x, is_read: true } : x)))
        refresh()
      } catch (e) {
        /* ignore */
      }
    }
  }

  const confirmDelete = async () => {
    const id = toDelete.id
    setToDelete(null)
    try {
      await client.delete(`/admin/messages/${id}`)
      if (selected?.id === id) setSelected(null)
      refresh()
      toast.push('تم حذف الرسالة')
      if (rows.length === 1 && page > 1) setPage((p) => p - 1)
      else load(page)
    } catch (e) {
      toast.push('تعذّر الحذف', 'err')
    }
  }

  const total = meta?.total ?? rows.length

  return (
    <>
      <div className="page-head">
        <div>
          <h2>الرسائل</h2>
          <div className="muted">{total} رسالة</div>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : rows.length === 0 ? (
        <div className="card card--pad">
          <div className="empty"><Inbox style={{ width: 44, margin: '0 auto 0.7rem', color: 'var(--muted)' }} />لا توجد رسائل بعد.</div>
        </div>
      ) : (
        <>
          <div className="card table-wrap">
            <table>
              <thead>
                <tr><th>الاسم</th><th>البريد</th><th>الموضوع</th><th>التاريخ</th><th>الحالة</th><th style={{ textAlign: 'end' }}>إجراءات</th></tr>
              </thead>
              <tbody>
                {rows.map((m) => (
                  <tr key={m.id} style={{ cursor: 'pointer', fontWeight: isRead(m) ? 400 : 600 }} onClick={() => open(m)}>
                    <td className="cell-title">{m.name}</td>
                    <td dir="ltr" style={{ color: 'var(--slate)' }}>{m.email}</td>
                    <td>{ml(m.subject) || '—'}</td>
                    <td style={{ color: 'var(--muted)', whiteSpace: 'nowrap' }}>{fmtDate(m.created_at)}</td>
                    <td>{isRead(m) ? <span className="badge badge--gray">مقروءة</span> : <span className="badge badge--orange">جديدة</span>}</td>
                    <td>
                      <div className="row-actions">
                        <button className="btn btn--danger btn--sm" onClick={(e) => { e.stopPropagation(); setToDelete(m) }}><Trash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination meta={meta} onPage={setPage} />
        </>
      )}

      {selected && (
        <>
          <div className="drawer-back" onClick={() => setSelected(null)} />
          <div className="drawer">
            <button className="drawer__close" onClick={() => setSelected(null)}><X /></button>
            <h2 style={{ marginTop: '0.5rem' }}>{ml(selected.subject) || 'رسالة'}</h2>
            <div className="msg-meta">
              <div className="row"><strong style={{ color: 'var(--ink)' }}>{selected.name}</strong></div>
              <div className="row"><Mail /><a href={`mailto:${selected.email}`} dir="ltr">{selected.email}</a></div>
              {selected.phone && <div className="row"><Phone /><a href={`tel:${selected.phone}`} dir="ltr">{selected.phone}</a></div>}
              <div className="row" style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{fmtDate(selected.created_at)}</div>
            </div>
            <div className="msg-body">{ml(selected.message)}</div>
            <div style={{ display: 'flex', gap: '0.7rem', marginTop: '1.4rem' }}>
              <a className="btn btn--primary" href={`mailto:${selected.email}`}>الرد بالبريد</a>
              <button className="btn btn--danger" onClick={() => setToDelete(selected)}><Trash /> حذف</button>
            </div>
          </div>
        </>
      )}

      {toDelete && (
        <Modal title="تأكيد الحذف" message="حذف هذه الرسالة نهائياً؟" confirmLabel="حذف" danger onConfirm={confirmDelete} onClose={() => setToDelete(null)} />
      )}
    </>
  )
}
