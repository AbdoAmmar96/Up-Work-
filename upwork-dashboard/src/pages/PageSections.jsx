import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import client from '../api/client'
import { useToast } from '../lib/toast'
import Spinner from '../components/Spinner'
import { Pencil, FileText } from '../components/icons'

const SECTION_LABELS = {
  home_hero: 'القسم الرئيسي (Hero)',
  home_pillars: 'الركائز الثلاث',
  home_stats: 'الإحصائيات',
  about_intro: 'نبذة «من نحن»',
  about_values: 'القيم',
  about_cta: 'دعوة لاتخاذ إجراء',
}
const PAGE_LABELS = { home: 'الصفحة الرئيسية', about: 'صفحة من نحن' }

export default function PageSections() {
  const navigate = useNavigate()
  const toast = useToast()
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .get('/admin/page-sections')
      .then((res) => setSections(res.data?.data ?? res.data ?? []))
      .catch(() => toast.push('تعذّر التحميل', 'err'))
      .finally(() => setLoading(false))
  }, [toast])

  if (loading) return <Spinner />

  const groups = {}
  sections.forEach((s) => {
    const p = s.page || 'other'
    groups[p] = groups[p] || []
    groups[p].push(s)
  })

  return (
    <>
      <div className="page-head">
        <div>
          <h2>أقسام الصفحات</h2>
          <div className="muted">عدّل نصوص الصفحة الرئيسية وصفحة «من نحن».</div>
        </div>
      </div>

      {Object.keys(groups).map((page) => (
        <div className="card" key={page} style={{ marginBottom: '1.2rem' }}>
          <div style={{ padding: '1rem 1.3rem', borderBottom: '1px solid var(--line)', fontWeight: 700 }}>
            {PAGE_LABELS[page] || page}
          </div>
          <table>
            <tbody>
              {groups[page].map((s) => (
                <tr key={s.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <span style={{ color: 'var(--blue)' }}><FileText style={{ width: 20 }} /></span>
                      <span className="cell-title">{SECTION_LABELS[s.key] || s.key}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--muted)', fontSize: '0.85rem' }} dir="ltr">{s.key}</td>
                  <td style={{ textAlign: 'end' }}>
                    <button className="btn btn--ghost btn--sm" onClick={() => navigate(`/page-sections/${s.id}`)}>
                      <Pencil /> تعديل
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  )
}
