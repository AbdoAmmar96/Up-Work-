import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import client from '../api/client'
import { useToast } from '../lib/toast'
import Field from '../components/Field'
import Spinner from '../components/Spinner'
import { Plus, Trash } from '../components/icons'

const KEY_LABELS = {
  eyebrow: 'النص العلوي',
  title: 'العنوان',
  subtitle: 'الوصف',
  body: 'النص',
  text: 'النص',
  description: 'الوصف',
  primary_cta: 'الزر الأساسي',
  secondary_cta: 'الزر الثانوي',
  cta: 'الزر',
  icon: 'الأيقونة (key)',
  value: 'القيمة',
  label: 'التسمية',
}
const TEXTAREA_KEYS = ['subtitle', 'body', 'text', 'description']
const isML = (v) => v && typeof v === 'object' && !Array.isArray(v) && ('ar' in v || 'en' in v)
const labelFor = (k) => KEY_LABELS[k] || k

function blankLike(item) {
  if (!item) return { title: { ar: '', en: '' }, text: { ar: '', en: '' } }
  const out = {}
  Object.entries(item).forEach(([k, v]) => {
    out[k] = isML(v) ? { ar: '', en: '' } : ''
  })
  return out
}

export default function PageSectionEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const [section, setSection] = useState(null)
  const [payload, setPayload] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    client
      .get(`/admin/page-sections/${id}`)
      .then((res) => {
        const data = res.data?.data ?? res.data
        setSection(data)
        setPayload(JSON.parse(JSON.stringify(data?.payload || {})))
      })
      .catch(() => toast.push('تعذّر التحميل', 'err'))
      .finally(() => setLoading(false))
  }, [id, toast])

  if (loading || !payload) return <Spinner />
  if (!section) return <Navigate to="/page-sections" replace />

  const setTop = (key, val) => setPayload((p) => ({ ...p, [key]: val }))
  const setItem = (arrKey, index, subKey, val) =>
    setPayload((p) => {
      const arr = [...p[arrKey]]
      arr[index] = { ...arr[index], [subKey]: val }
      return { ...p, [arrKey]: arr }
    })
  const addItem = (arrKey) => setPayload((p) => ({ ...p, [arrKey]: [...p[arrKey], blankLike(p[arrKey][0])] }))
  const removeItem = (arrKey, index) => setPayload((p) => ({ ...p, [arrKey]: p[arrKey].filter((_, i) => i !== index) }))

  const save = async () => {
    setSaving(true)
    try {
      await client.put(`/admin/page-sections/${id}`, { payload })
      toast.push('تم حفظ القسم')
      navigate('/page-sections')
    } catch (e) {
      toast.push('فشل الحفظ', 'err')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="page-head">
        <h2>تعديل القسم</h2>
      </div>

      <div className="card card--pad" style={{ maxWidth: 760 }}>
        <div className="form-grid">
          {Object.entries(payload).map(([key, val]) => {
            if (isML(val)) {
              return (
                <Field
                  key={key}
                  field={{ type: TEXTAREA_KEYS.includes(key) ? 'ml_textarea' : 'ml_text', label: labelFor(key) }}
                  value={val}
                  onChange={(v) => setTop(key, v)}
                />
              )
            }
            if (Array.isArray(val)) {
              return (
                <div key={key}>
                  <label style={{ fontWeight: 600, fontSize: '0.88rem', display: 'block', marginBottom: '0.7rem' }}>
                    {labelFor(key)}
                  </label>
                  {val.map((item, i) => (
                    <div className="item-block" key={i}>
                      <div className="item-block__head">
                        <strong>عنصر {i + 1}</strong>
                        <button className="btn btn--danger btn--sm" onClick={() => removeItem(key, i)}>
                          <Trash /> حذف
                        </button>
                      </div>
                      <div className="form-grid">
                        {Object.entries(item).map(([subKey, subVal]) =>
                          isML(subVal) ? (
                            <Field
                              key={subKey}
                              field={{ type: TEXTAREA_KEYS.includes(subKey) ? 'ml_textarea' : 'ml_text', label: labelFor(subKey) }}
                              value={subVal}
                              onChange={(v) => setItem(key, i, subKey, v)}
                            />
                          ) : (
                            <Field
                              key={subKey}
                              field={{ type: 'text', label: labelFor(subKey) }}
                              value={subVal}
                              onChange={(v) => setItem(key, i, subKey, v)}
                            />
                          )
                        )}
                      </div>
                    </div>
                  ))}
                  <button className="btn btn--ghost btn--sm" onClick={() => addItem(key)}>
                    <Plus /> إضافة عنصر
                  </button>
                </div>
              )
            }
            if (typeof val === 'string') {
              return (
                <Field key={key} field={{ type: 'text', label: labelFor(key) }} value={val} onChange={(v) => setTop(key, v)} />
              )
            }
            return null
          })}
        </div>
        <div className="form-actions">
          <button className="btn btn--primary" onClick={save} disabled={saving}>
            {saving ? 'جاري الحفظ...' : 'حفظ القسم'}
          </button>
          <button className="btn btn--ghost" onClick={() => navigate('/page-sections')} disabled={saving}>
            إلغاء
          </button>
        </div>
      </div>
    </>
  )
}
