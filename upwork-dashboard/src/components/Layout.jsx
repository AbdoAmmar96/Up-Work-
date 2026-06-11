import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import { BadgeProvider } from '../lib/badge'
import { navGroups } from '../config/resources'
import { Menu } from './icons'

function currentTitle(pathname) {
  let best = ''
  let bestLen = -1
  navGroups.forEach((g) =>
    g.items.forEach((it) => {
      if ((it.to === '/' ? pathname === '/' : pathname.startsWith(it.to)) && it.to.length > bestLen) {
        best = it.label
        bestLen = it.to.length
      }
    })
  )
  return best || 'لوحة التحكم'
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <BadgeProvider>
      <div className="shell">
        <Sidebar open={open} onNavigate={() => setOpen(false)} />
        <div className={`scrim${open ? ' show' : ''}`} onClick={() => setOpen(false)} />
        <div className="main">
          <div className="topbar">
            <button className="burger" onClick={() => setOpen((v) => !v)} aria-label="القائمة"><span /></button>
            <h1>{currentTitle(location.pathname)}</h1>
          </div>
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </BadgeProvider>
  )
}
