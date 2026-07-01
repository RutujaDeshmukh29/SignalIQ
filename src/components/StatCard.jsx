import React, { useEffect, useRef, useState } from 'react'

export default function StatCard({ value, label, delta, deltaPositive = true, color = 'orange', icon, delay = 0 }) {
  const [display, setDisplay] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef()

  const colors = {
    orange: { bg: 'linear-gradient(135deg,#FFF7ED,#FFEDD5)', border: '#FED7AA', num: '#C2410C', icon: 'rgba(249,115,22,0.12)' },
    teal:   { bg: 'linear-gradient(135deg,#F0FDFA,#CCFBF1)', border: '#99F6E4', num: '#0F766E', icon: 'rgba(20,184,166,0.12)' },
    rose:   { bg: 'linear-gradient(135deg,#FFF1F2,#FFE4E6)', border: '#FECDD3', num: '#BE123C', icon: 'rgba(244,63,94,0.12)' },
  }
  const c = colors[color]

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!visible) return
    const target = typeof value === 'number' ? value : 0
    if (target === 0) { setDisplay(0); return }
    let start = 0
    const step = Math.ceil(target / 18)
    const iv = setInterval(() => {
      start = Math.min(start + step, target)
      setDisplay(start)
      if (start >= target) clearInterval(iv)
    }, 40)
    return () => clearInterval(iv)
  }, [visible, value])

  return (
    <div ref={ref} className={`animate-fadeUp anim-d${Math.min(delay/50+1,6)}`} style={{
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: 14, padding: '18px 20px',
      transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='var(--shadow)' }}
      onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{
            fontSize: 30, fontWeight: 800, color: c.num, letterSpacing: '-1px',
            fontFamily: 'var(--display)', lineHeight: 1,
            animation: visible ? 'countUp 0.4s cubic-bezier(0.22,1,0.36,1)' : 'none',
          }}>{typeof value === 'number' ? display : value}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 5, fontWeight: 500 }}>{label}</div>
        </div>
        <div style={{
          width: 38, height: 38, borderRadius: 10, background: c.icon,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
        }}>{icon}</div>
      </div>
      {delta && (
        <div style={{
          marginTop: 10, fontSize: 11, fontWeight: 600,
          color: deltaPositive ? 'var(--teal-700)' : 'var(--rose-700)',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          {deltaPositive ? '↑' : '↓'} {delta}
        </div>
      )}
    </div>
  )
}
