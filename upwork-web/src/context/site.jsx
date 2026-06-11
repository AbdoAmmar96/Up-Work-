import React, { createContext, useContext } from 'react'
import { useContent } from '../hooks/useContent'
import { getSettings } from '../api/content'
import { fallback } from '../data/fallback'

const SiteContext = createContext({ settings: fallback.settings, loading: true })

export function SiteProvider({ children }) {
  const { data, loading } = useContent(getSettings, [])
  const settings = data || fallback.settings
  return <SiteContext.Provider value={{ settings, loading }}>{children}</SiteContext.Provider>
}

export const useSite = () => useContext(SiteContext)
