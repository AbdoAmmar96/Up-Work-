import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import Spinner from './Spinner'

export default function ProtectedRoute() {
  const { isAuthed, loading } = useAuth()
  if (loading) return <div className="loading-screen"><Spinner /></div>
  if (!isAuthed) return <Navigate to="/login" replace />
  return <Outlet />
}
