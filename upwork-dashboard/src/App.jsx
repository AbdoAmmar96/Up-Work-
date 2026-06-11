import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { ToastProvider } from './lib/toast'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ResourceList from './pages/ResourceList'
import ResourceForm from './pages/ResourceForm'
import PageSections from './pages/PageSections'
import PageSectionEdit from './pages/PageSectionEdit'
import Settings from './pages/Settings'
import Messages from './pages/Messages'
import Account from './pages/Account'

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/page-sections" element={<PageSections />} />
              <Route path="/page-sections/:id" element={<PageSectionEdit />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/account" element={<Account />} />
              <Route path="/:resource/new" element={<ResourceForm />} />
              <Route path="/:resource/:id" element={<ResourceForm />} />
              <Route path="/:resource" element={<ResourceList />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  )
}
