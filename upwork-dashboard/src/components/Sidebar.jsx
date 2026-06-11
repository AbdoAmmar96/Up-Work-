import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { useBadge } from '../lib/badge'
import { navGroups } from '../config/resources'
import * as Icons from './icons'
import { ml } from '../lib/ml'

export default function Sidebar({ open, onNavigate }) {
  const { user, logout } = useAuth()
  const { unread } = useBadge()
  const name = ml(user?.name) || user?.email || 'مدير'
  const initial = (name || 'U').trim().charAt(0).toUpperCase()

  return (
    <aside className={`sidebar${open ? ' sidebar--open' : ''}`}>
      <div className="sidebar__brand">
        <img src="/logo-white.png" alt="UP Work" />
      </div>

      <nav className="sidebar__nav">
        {navGroups.map((group) => (
          <div key={group.label}>
            <div className="sidebar__section">{group.label}</div>
            {group.items.map((item) => {
              const Icon = Icons[item.icon] || Icons.Grid
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onNavigate}
                  className={({ isActive }) => `nav-item${isActive ? ' nav-item--active' : ''}`}
                >
                  <Icon />
                  <span>{item.label}</span>
                  {item.badge === 'unread' && unread > 0 && <span className="nav-badge">{unread}</span>}
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar__foot">
        <div className="user-row">
          <div className="user-avatar">{initial}</div>
          <div>
            <div className="name">{name}</div>
            <div className="mail">{user?.email}</div>
          </div>
        </div>
        <NavLink to="/account" onClick={onNavigate} className="account-link">
          <Icons.Lock /> تغيير كلمة المرور
        </NavLink>
        <button className="logout-btn" onClick={logout}>
          <Icons.LogOut /> تسجيل الخروج
        </button>
      </div>
    </aside>
  )
}
