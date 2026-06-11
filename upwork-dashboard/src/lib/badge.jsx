import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import client from '../api/client'

const BadgeContext = createContext({ unread: 0, refresh: () => {} })

export function BadgeProvider({ children }) {
  const [unread, setUnread] = useState(0)

  const refresh = useCallback(async () => {
    try {
      const res = await client.get('/admin/messages', { params: { unread: 1, per_page: 1 } })
      const total = res.data?.meta?.total
      if (typeof total === 'number') setUnread(total)
      else {
        const data = res.data?.data ?? res.data ?? []
        setUnread(data.filter((m) => !(m.read || m.is_read || m.read_at)).length)
      }
    } catch (e) {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return <BadgeContext.Provider value={{ unread, refresh }}>{children}</BadgeContext.Provider>
}

export const useBadge = () => useContext(BadgeContext)
