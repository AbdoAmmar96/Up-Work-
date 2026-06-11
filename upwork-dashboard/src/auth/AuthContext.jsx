import React, { createContext, useContext, useEffect, useState } from 'react'
import client, { TOKEN_KEY } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    if (!token) {
      setLoading(false)
      return
    }
    client
      .get('/me')
      .then((res) => {
        if (active) setUser(res.data?.data ?? res.data)
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY)
        if (active) setToken(null)
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [token])

  const login = async (email, password) => {
    const res = await client.post('/login', { email, password, device_name: 'dashboard' })
    const tk = res.data?.token
    const usr = res.data?.user?.data ?? res.data?.user
    localStorage.setItem(TOKEN_KEY, tk)
    setToken(tk)
    setUser(usr)
    return usr
  }

  const logout = async () => {
    try {
      await client.post('/logout')
    } catch (e) {
      /* ignore */
    }
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthed: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
