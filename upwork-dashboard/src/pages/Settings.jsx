import React, { useEffect, useState } from 'react'
import client from '../api/client'
import { useToast } from '../lib/toast'
import { toML } from '../lib/ml'
import Field from '../components/Field'
import Spinner from '../components/Spinner'
import { Plus, Trash } from '../components/icons'

const SOCIALS = [
  ['facebook', 'فيسبوك'],
  ['instagram', 'إنستجرام'],
  ['linkedin', 'لينكدإن'],
  ['youtube', 'يوتيوب'],
]
const COLORS = [
  ['primary', 'اللون الأساسي'],
  ['accent', 'اللون المميّز'],
  ['dark', 'الداكن'],
  ['light', 'الفاتح'],
]

function Card({ title, children }) {
  return (
    <div className="card card--pad" style={{ marginBottom: '1.2rem', maxWidth: 760 }}>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '1.2rem' }}>{title}</h3>
      <div className="form-grid">{children}</div>
    </div>
  )
}

export default function Settings() {
  const toast = useToast()
  const [form, setForm] = useState(null)
  const [logo, setLogo] = useState({ current: null, file: null })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    client
      .get('/admin/settings')
      .then((res) => {
        const s = res.data?.data ?? res.data ?? {}
        setForm({
          site_title: toML(s.site_title),
          tagline: toML(s.tagline),
          slogan: toML(s.slogan),
          phone: s.phone || '',
          whatsapp: s.whatsapp || '',
          email: s.email || '',
          address: toML(s.address),
          working_hours: toML(s.working_hours),
          seo_title: toML(s.seo_title),
          seo_description: toML(s.seo_description),
          social: { facebook: '', instagram: '', linkedin: '', youtube: '', ...(s.social || {}) },
          colors: { primary: '#1e40af', accent: '#f97316', dark: '#1f2937', light: '#e5e7eb', ...(s.colors || {}) },
          capabilities: (s.capabilities || []).map(toML),
        })
        setLogo({ current: s.logo || null, file: null })
      })
      .catch(() => toast.push('تعذّر تحميل الإعدادات', 'err'))
      .finally(() => setLoading(false))
  }, [toast])

  if (loading || !form) return <Spinner />

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))
  const setSocial = (k, v) => setForm((f) => ({ ...f, social: { ...f.social, [k]: v } }))
  const setColor = (k, v) => setForm((f) => ({ ...f, colors: { ...f.colors, [k]: v } }))
  const setCap = (i, v) => setForm((f) => ({ ...f, capabilities: f.capabilities.map((c, idx) => (idx === i ? v : c)) }))
  const addCap = () => setForm((f) => ({ ...f, capabilities: [...f.capabilities, { ar: '', en: '' }] }))
  const removeCap = (i) => setForm((f) => ({ ...f, capabilities: f.capabilities.filter((_, idx) => idx !== i) }))

  const save = async () => {
    setSaving(true)
    try {
      if (logo.file) {
        const fd = new FormData()
        fd.append('logo', logo.file)
        await client.post('/admin/settings/logo', fd)
      }
      const settings = {
        site_title: form.site_title,
        tagline: form.tagline,
        slogan: form.slogan,
        phone: form.phone,
        whatsapp: form.whatsapp,
        email: form.email,
        address: form.address,
        working_hours: form.working_hours,
        seo_title: form.seo_title,
        seo_description: form.seo_description,
        social: form.social,
        colors: form.colors,
        capabilities: form.capabilities,
      }
      await client.put('/admin/settings', { settings })
      toast.push('تم حفظ الإعدادات')
    } catch (e) {
      toast.push('فشل حفظ الإعدادات', 'err')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h2>الإعدادات العامة</h2>
          <div className="muted">بيانات الموقع والتواصل والهوية.</div>
        </div>
        <button className="btn btn--primary" onClick={save} disabled={saving}>
          {saving ? 'جاري الحفظ...' : 'حفظ كل التغييرات'}
        </button>
      </div>

      <Card title="الهوية والشعارات">
        <Field field={{ type: 'image', label: 'شعار الموقع' }} value={logo} onChange={setLogo} />
        <Field field={{ type: 'ml_text', label: 'اسم الموقع' }} value={form.site_title} onChange={(v) => set('site_title', v)} />
        <Field field={{ type: 'ml_text', label: 'الشعار النصّي (Tagline)' }} value={form.tagline} onChange={(v) => set('tagline', v)} />
        <Field field={{ type: 'ml_textarea', label: 'الجملة التعريفية (Slogan)' }} value={form.slogan} onChange={(v) => set('slogan', v)} />
      </Card>

      <Card title="بيانات التواصل">
        <div className="two-col">
          <Field field={{ type: 'text', label: 'الهاتف' }} value={form.phone} onChange={(v) => set('phone', v)} />
          <Field field={{ type: 'text', label: 'واتساب (أرقام فقط)' }} value={form.whatsapp} onChange={(v) => set('whatsapp', v)} />
        </div>
        <Field field={{ type: 'text', label: 'البريد الإلكتروني' }} value={form.email} onChange={(v) => set('email', v)} />
        <Field field={{ type: 'ml_text', label: 'العنوان' }} value={form.address} onChange={(v) => set('address', v)} />
        <Field field={{ type: 'ml_text', label: 'مواعيد العمل' }} value={form.working_hours} onChange={(v) => set('working_hours', v)} />
      </Card>

      <Card title="روابط التواصل الاجتماعي">
        <div className="two-col">
          {SOCIALS.map(([k, label]) => (
            <Field key={k} field={{ type: 'text', label }} value={form.social[k]} onChange={(v) => setSocial(k, v)} />
          ))}
        </div>
      </Card>

      <Card title="ألوان الهوية">
        <div className="two-col">
          {COLORS.map(([k, label]) => (
            <div className="field" key={k}>
              <label>{label}</label>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <input type="color" value={form.colors[k]} onChange={(e) => setColor(k, e.target.value)} style={{ width: 46, height: 42, border: '1px solid var(--line)', borderRadius: 8, background: '#fff', cursor: 'pointer' }} />
                <input className="input" dir="ltr" value={form.colors[k]} onChange={(e) => setColor(k, e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="الإمكانيات (Capabilities)">
        {form.capabilities.map((c, i) => (
          <div className="item-block" key={i}>
            <div className="item-block__head">
              <strong>إمكانية {i + 1}</strong>
              <button className="btn btn--danger btn--sm" onClick={() => removeCap(i)}><Trash /></button>
            </div>
            <Field field={{ type: 'ml_text', label: 'النص' }} value={c} onChange={(v) => setCap(i, v)} />
          </div>
        ))}
        <button className="btn btn--ghost btn--sm" onClick={addCap}><Plus /> إضافة إمكانية</button>
      </Card>

      <Card title="تحسين محركات البحث (SEO)">
        <Field field={{ type: 'ml_text', label: 'عنوان SEO' }} value={form.seo_title} onChange={(v) => set('seo_title', v)} />
        <Field field={{ type: 'ml_textarea', label: 'وصف SEO' }} value={form.seo_description} onChange={(v) => set('seo_description', v)} />
      </Card>

      <button className="btn btn--primary" onClick={save} disabled={saving} style={{ marginBottom: '2rem' }}>
        {saving ? 'جاري الحفظ...' : 'حفظ كل التغييرات'}
      </button>
    </>
  )
}
