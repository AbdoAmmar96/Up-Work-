import { useTranslation } from 'react-i18next'

// Picks the right language out of a { ar, en } object (or returns a plain string).
export function pick(value, lang) {
  if (value == null) return ''
  if (typeof value === 'string') return value
  return value[lang] ?? value.en ?? value.ar ?? ''
}

// Hook: returns tt(obj) bound to the current language + the active lang code.
export function useLocalized() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'ar' ? 'ar' : 'en'
  return { tt: (v) => pick(v, lang), lang }
}
