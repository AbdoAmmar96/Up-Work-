import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.message || 'بيانات الدخول غير صحيحة')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <img className="login-logo" src="/logo-mark.png" alt="UP Work" />
        <h1>لوحة تحكم UP Work</h1>
        <p className="sub">سجّل دخولك لإدارة محتوى الموقع</p>
        <form onSubmit={onSubmit}>
          {error && <div className="note note--err">{error}</div>}
          <div className="field" style={{ marginBottom: '1rem' }}>
            <label>البريد الإلكتروني</label>
            <input className="input" type="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
          </div>
          <div className="field" style={{ marginBottom: '1.4rem' }}>
            <label>كلمة المرور</label>
            <input className="input" type="password" dir="ltr" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="btn btn--primary btn--block" type="submit" disabled={busy}>
            {busy ? 'جاري الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>
      </div>
    </div>
  )
}
