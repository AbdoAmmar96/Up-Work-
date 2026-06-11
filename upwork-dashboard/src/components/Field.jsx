import React, { useState, useMemo } from 'react'
import { ml } from '../lib/ml'
import { Upload, Trash, X } from './icons'

function MLField({ field, value, onChange, textarea }) {
  const [lang, setLang] = useState('ar')
  const v = value || { ar: '', en: '' }
  const set = (l, text) => onChange({ ...v, [l]: text })
  const InputTag = textarea ? 'textarea' : 'input'
  return (
    <div className="ml-field">
      <div className="ml-tabs">
        <button type="button" className={`ml-tab${lang === 'ar' ? ' ml-tab--active' : ''}`} onClick={() => setLang('ar')}>
          عربي
        </button>
        <button type="button" className={`ml-tab${lang === 'en' ? ' ml-tab--active' : ''}`} onClick={() => setLang('en')}>
          English
        </button>
      </div>
      <div className={`ml-pane${lang === 'ar' ? ' ml-pane--active' : ''}`}>
        <InputTag
          className={textarea ? 'textarea' : 'input'}
          dir="rtl"
          value={v.ar}
          onChange={(e) => set('ar', e.target.value)}
          placeholder="بالعربية"
        />
      </div>
      <div className={`ml-pane${lang === 'en' ? ' ml-pane--active' : ''}`}>
        <InputTag
          className={textarea ? 'textarea' : 'input'}
          dir="ltr"
          value={v.en}
          onChange={(e) => set('en', e.target.value)}
          placeholder="In English"
        />
      </div>
    </div>
  )
}

function ImageField({ value, onChange }) {
  const { current, file } = value || { current: null, file: null }
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file])
  const shown = preview || current
  return (
    <div className="uploader">
      {shown && (
        <div className="thumb-box">
          <img src={shown} alt="" />
          {file && (
            <button type="button" className="thumb-box__del" onClick={() => onChange({ current, file: null })} title="إلغاء">
              <X />
            </button>
          )}
        </div>
      )}
      <label className="dropzone">
        <Upload />
        {shown ? 'تغيير الصورة' : 'رفع صورة'}
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) onChange({ current, file: f })
          }}
        />
      </label>
    </div>
  )
}

function GalleryField({ value, existing, onChange, onDeleteExisting }) {
  const files = value || []
  const previews = useMemo(() => files.map((f) => ({ f, url: URL.createObjectURL(f) })), [files])
  return (
    <div className="uploader">
      {(existing || []).map((img) => (
        <div className="thumb-box" key={img.id}>
          <img src={img.url || img.thumb} alt="" />
          <button type="button" className="thumb-box__del" onClick={() => onDeleteExisting(img.id)} title="حذف">
            <Trash />
          </button>
        </div>
      ))}
      {previews.map(({ f, url }, i) => (
        <div className="thumb-box" key={i}>
          <img src={url} alt="" />
          <button
            type="button"
            className="thumb-box__del"
            onClick={() => onChange(files.filter((_, idx) => idx !== i))}
            title="إزالة"
          >
            <X />
          </button>
        </div>
      ))}
      <label className="dropzone">
        <Upload />
        إضافة صور
        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => {
            const list = Array.from(e.target.files || [])
            if (list.length) onChange([...files, ...list])
            e.target.value = ''
          }}
        />
      </label>
    </div>
  )
}

export default function Field({ field, value, onChange, options, existing, onDeleteExisting }) {
  const label = typeof field.label === 'string' ? field.label : field.label?.ar
  const hint = field.hint ? (typeof field.hint === 'string' ? field.hint : field.hint.ar) : null

  let control
  switch (field.type) {
    case 'ml_text':
      control = <MLField field={field} value={value} onChange={onChange} />
      break
    case 'ml_textarea':
      control = <MLField field={field} value={value} onChange={onChange} textarea />
      break
    case 'textarea':
      control = <textarea className="textarea" value={value || ''} onChange={(e) => onChange(e.target.value)} />
      break
    case 'number':
      control = <input className="input" type="number" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      break
    case 'bool':
      control = (
        <div className="switch-row">
          <button type="button" className={`switch${value ? ' switch--on' : ''}`} onClick={() => onChange(!value)} aria-pressed={!!value} />
          <span style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>{value ? 'نعم' : 'لا'}</span>
        </div>
      )
      break
    case 'select':
      control = (
        <select className="input" value={value || ''} onChange={(e) => onChange(e.target.value)}>
          {(field.options || []).map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      )
      break
    case 'relation':
      control = (
        <select className="input" value={value || ''} onChange={(e) => onChange(e.target.value)}>
          <option value="">— اختر —</option>
          {(options || []).map((o) => (
            <option key={o.id} value={o.id}>{ml(o.title)}</option>
          ))}
        </select>
      )
      break
    case 'image':
      control = <ImageField value={value} onChange={onChange} />
      break
    case 'gallery':
      control = <GalleryField value={value} existing={existing} onChange={onChange} onDeleteExisting={onDeleteExisting} />
      break
    default:
      control = <input className="input" value={value || ''} onChange={(e) => onChange(e.target.value)} />
  }

  return (
    <div className="field">
      <label>
        {label} {field.required && <span className="req">*</span>}
      </label>
      {control}
      {hint && <span className="hint">{hint}</span>}
    </div>
  )
}
