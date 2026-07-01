import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { loadProfile } from './utils/dataStore'
import Onboarding   from './pages/Onboarding'
import Dashboard    from './pages/Dashboard'
import Trends       from './pages/Trends'
import Competitors  from './pages/Competitors'
import Settings     from './pages/Settings'
import NavBar       from './components/NavBar'

function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <main style={{ flex: 1, padding: '28px 32px', maxWidth: 1200, width: '100%', margin: '0 auto' }}>
        {children}
      </main>
    </div>
  )
}

function RequireProfile({ children }) {
  const profile = loadProfile()
  if (!profile) return <Navigate to="/setup" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/setup" element={<Onboarding />} />
        <Route path="/dashboard" element={
          <RequireProfile><Layout><Dashboard /></Layout></RequireProfile>
        } />
        <Route path="/trends" element={
          <RequireProfile><Layout><Trends /></Layout></RequireProfile>
        } />
        <Route path="/competitors" element={
          <RequireProfile><Layout><Competitors /></Layout></RequireProfile>
        } />
        <Route path="/settings" element={
          <RequireProfile><Layout><Settings /></Layout></RequireProfile>
        } />
        <Route path="*" element={<Navigate to={loadProfile() ? '/dashboard' : '/setup'} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
