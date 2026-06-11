// Bilingual helpers for the dashboard (Arabic-first UI).
export function ml(value, lang = 'ar') {
  if (value == null) return ''
  if (typeof value === 'string') return value
  return value[lang] ?? value.ar ?? value.en ?? ''
}

export const emptyML = () => ({ ar: '', en: '' })

// Normalize an API value to a { ar, en } object for editing.
export function toML(value) {
  if (value == null) return emptyML()
  if (typeof value === 'string') return { ar: value, en: '' }
  return { ar: value.ar ?? '', en: value.en ?? '' }
}
