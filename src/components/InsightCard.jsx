import React, { useState, useEffect, useRef } from 'react'
import { recordFeedback } from '../utils/dataStore'

const BADGE = {
  hot:    { cls: 'badge badge-hot',    icon: '🔥', label: 'Hot'    },
  rising: { cls: 'badge badge-rising', icon: '↑',  label: 'Rising' },
  watch:  { cls: 'badge badge-watch',  icon: '●',  label: 'Watch'  },
}

const BAR_COLOR = {
  hot:    'linear-gradient(90deg,#F43F5E,#FB7185)',
  rising: 'linear-gradient(90deg,#14B8A6,#2DD4BF)',
  watch:  'linear-gradient(90deg,#8B5CF6,#A78BFA)',
}

export default function InsightCard({ signal, onFeedback, animDelay = 0 }) {
  const [fb, setFb] = useState(null)
  const [barWidth, setBarWidth] = useState(0)
  const barRef = useRef()
  const b = BADGE[signal.badge] || BADGE.watch
  const pct = Math.min(100, signal.finalScore)

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(pct), 300 + animDelay)
    return () => clearTimeout(t)
  }, [pct, animDelay])

  function handleFb(isUseful) {
    if (fb !== null) return
    setFb(isUseful)
    recordFeedback(signal.id, signal.keyword, isUseful)
    if (onFeedback) setTimeout(onFeedback, 300)
  }

  return (
    <div className={`animate-fadeUp`} style={{
      animationDelay: `${animDelay}ms`,
      background: '#FFFFFF', border: '1px solid var(--border)',
      borderRadius: 14, padding: '16px 18px',
      transition: 'box-shadow 0.2s, transform 0.2s',
      position: 'relative', overflow: 'hidden',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow='var(--shadow)'; e.currentTarget.style.transform='translateY(-1px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow=''; e.currentTarget.style.transform='' }}
    >
      {/* Left accent strip */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, borderRadius: '14px 0 0 14px',
        background: signal.badge === 'hot' ? 'var(--rose-500)' : signal.badge === 'rising' ? 'var(--teal-500)' : '#8B5CF6',
      }} />

      <div style={{ paddingLeft: 8 }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
          <p style={{ fontWeight: 600, fontSize: 13, lineHeight: 1.5, color: 'var(--text-primary)', flex: 1 }}>
            {signal.title}
          </p>
          <span className={b.cls}>{b.icon} {b.label}</span>
        </div>

        {/* Score bar */}
        <div style={{ height: 4, background: 'var(--stone-100)', borderRadius: 2, marginBottom: 12, overflow: 'hidden' }}>
          <div ref={barRef} style={{
            height: '100%', borderRadius: 2, width: `${barWidth}%`,
            background: BAR_COLOR[signal.badge] || BAR_COLOR.watch,
            transition: 'width 0.8s cubic-bezier(0.22,1,0.36,1)',
          }} />
        </div>

        {/* Source row */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', background: 'var(--stone-100)', padding: '2px 8px', borderRadius: 20 }}>
            📰 {signal.source}
          </span>
          <span style={{ fontSize: 11, background: 'var(--orange-50)', padding: '2px 8px', borderRadius: 20, color: 'var(--orange-700)' }}>
            🏷 {signal.keyword}
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>
            Score: <strong style={{ color: 'var(--text-primary)' }}>{pct}</strong>
          </span>
        </div>

        {/* Action */}
        <div style={{
          background: 'linear-gradient(135deg,var(--teal-50),#ECFDF5)',
          border: '1px solid var(--teal-200,#99F6E4)',
          borderRadius: 10, padding: '10px 12px',
          display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 12,
        }}>
          <span style={{ fontSize: 14, flexShrink: 0 }}>💡</span>
          <p style={{ fontSize: 12, color: 'var(--teal-900)', lineHeight: 1.5, fontWeight: 500 }}>{signal.action}</p>
        </div>

        {/* Feedback */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={() => handleFb(true)} style={{
            padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500,
            border: `1.5px solid ${fb === true ? 'var(--teal-500)' : 'var(--border-md)'}`,
            background: fb === true ? 'var(--teal-50)' : 'transparent',
            color: fb === true ? 'var(--teal-700)' : 'var(--text-secondary)',
          }}>✓ Useful</button>
          <button onClick={() => handleFb(false)} style={{
            padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500,
            border: `1.5px solid ${fb === false ? 'var(--rose-500)' : 'var(--border-md)'}`,
            background: fb === false ? 'var(--rose-50)' : 'transparent',
            color: fb === false ? 'var(--rose-700)' : 'var(--text-secondary)',
          }}>✗ Skip</button>
          {fb !== null && (
            <span className="animate-fadeIn" style={{ fontSize: 11, color: 'var(--teal-700)', marginLeft: 4 }}>
              {fb ? '✓ Noted! Score adjusted.' : 'Got it — hidden next time.'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
