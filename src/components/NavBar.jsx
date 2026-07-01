import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { loadProfile } from '../utils/dataStore'

const NAV = [
  { path: '/dashboard',   label: '📡 Dashboard' },
  { path: '/trends',      label: '📈 Trends' },
  { path: '/competitors', label: '🎯 Competitors' },
  { path: '/settings',    label: '⚙️ Settings' },
]

export default function NavBar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const profile = loadProfile()
  const initials = profile?.name
    ? profile.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', height: 58,
      background: scrolled ? 'rgba(254,251,243,0.92)' : '#FFFFFF',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'rgba(0,0,0,0.07)' : 'transparent'}`,
      boxShadow: scrolled ? '0 2px 12px rgba(234,88,12,0.07)' : 'none',
      position: 'sticky', top: 0, zIndex: 100,
      transition: 'all 0.25s ease',
    }}>
      {/* Logo */}
      <div onClick={() => navigate('/dashboard')} style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer' }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: 'linear-gradient(135deg, #F97316, #EA580C)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(249,115,22,0.35)',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="3" fill="white" />
            <circle cx="8" cy="8" r="6.5" stroke="white" strokeWidth="1.2" fill="none" strokeDasharray="3.5 2.5" />
          </svg>
        </div>
        <span style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 16, letterSpacing: '-0.5px' }}>
          Signal<span style={{ color: 'var(--orange-600)' }}>IQ</span>
        </span>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', gap: 2 }}>
        {NAV.map(n => {
          const active = pathname.startsWith(n.path)
          return (
            <button key={n.path} onClick={() => navigate(n.path)} style={{
              padding: '6px 14px', borderRadius: 8, fontSize: 12.5, fontWeight: active ? 600 : 400,
              background: active ? 'var(--orange-100)' : 'transparent',
              color: active ? 'var(--orange-700)' : 'var(--text-secondary)',
              border: active ? '1px solid var(--orange-200)' : '1px solid transparent',
              position: 'relative',
            }}>{n.label}</button>
          )
        })}
      </nav>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {profile?.industry && (
          <span style={{
            fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 20,
            background: 'var(--teal-50)', color: 'var(--teal-700)', border: '1px solid var(--teal-200, #99F6E4)',
          }}>{profile.industry}</span>
        )}
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: 'linear-gradient(135deg, #F97316, #EA580C)',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, letterSpacing: 0.5,
          boxShadow: '0 2px 6px rgba(249,115,22,0.30)',
          cursor: 'pointer',
        }}>{initials}</div>
      </div>
    </header>
  )
}
