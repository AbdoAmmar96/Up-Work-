import React, { useState } from 'react'
import { useToast } from '../lib/toast'
import client from '../api/client'

export default function Account() {
  const toast = useToast()
  const [form, setForm] = useState({ current_password: '', password: '', password_confirmation: '' })
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    if (form.password !== form.password_confirmation) {
      setError('كلمة المرور الجديدة وتأكيدها غير متطابقين.')
      return
    }
    if (form.password.length < 8) {
      setError('كلمة المرور الجديدة يجب ألا تقل عن 8 أحرف.')
      return
    }
    setSaving(true)
    try {
      await client.put('/me/password', form)
      toast.push('تم تغيير كلمة المرور')
      setForm({ current_password: '', password: '', password_confirmation: '' })
    } catch (err) {
      const errs = err?.response?.data?.errors
      setError((errs && Object.values(errs)[0]?.[0]) || err?.response?.data?.message || 'تعذّر تغيير كلمة المرور.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h2>تغيير كلمة المرور</h2>
          <div className="muted">حدّث كلمة مرور حسابك. هيتم تسجيل خروج الأجهزة الأخرى.</div>
        </div>
      </div>

      <div className="card card--pad" style={{ maxWidth: 480 }}>
        <form onSubmit={submit} className="form-grid">
          {error && <div className="note note--err">{error}</div>}
          <div className="field">
            <label>كلمة المرور الحالية <span className="req">*</span></label>
            <input className="input" type="password" dir="ltr" value={form.current_password} onChange={(e) => set('current_password', e.target.value)} required />
          </div>
          <div className="field">
            <label>كلمة المرور الجديدة <span className="req">*</span></label>
            <input className="input" type="password" dir="ltr" value={form.password} onChange={(e) => set('password', e.target.value)} required />
            <span className="hint">8 أحرف على الأقل.</span>
          </div>
          <div className="field">
            <label>تأكيد كلمة المرور الجديدة <span className="req">*</span></label>
            <input className="input" type="password" dir="ltr" value={form.password_confirmation} onChange={(e) => set('password_confirmation', e.target.value)} required />
          </div>
          <div className="form-actions">
            <button className="btn btn--primary" type="submit" disabled={saving}>
              {saving ? 'جاري الحفظ...' : 'تحديث كلمة المرور'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
