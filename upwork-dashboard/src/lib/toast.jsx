import React, { createContext, useContext, useState, useCallback } from 'react'
import { Check, X } from '../components/icons'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [items, setItems] = useState([])

  const push = useCallback((message, type = 'ok') => {
    const id = Date.now() + Math.random()
    setItems((s) => [...s, { id, message, type }])
    setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), 3200)
  }, [])

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="toast-stack">
        {items.map((t) => (
          <div key={t.id} className={`toast toast--${t.type}`}>
            {t.type === 'err' ? <X style={{ width: 18, color: 'var(--err)' }} /> : <Check style={{ width: 18, color: 'var(--ok)' }} />}
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
