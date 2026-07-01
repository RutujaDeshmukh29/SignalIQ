import React, { useState } from 'react'

export default function DigestBox({ digest, onRefresh, loading }) {
  return (
    <div className="animate-fadeUp anim-d2" style={{
      background: 'linear-gradient(135deg,#FFF7ED 0%,#FFEDD5 50%,#FEF9C3 100%)',
      border: '1px solid var(--orange-200)',
      borderRadius: 16, padding: '20px 22px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative circle */}
      <div style={{
        position: 'absolute', top: -30, right: -30, width: 120, height: 120,
        borderRadius: '50%', background: 'rgba(249,115,22,0.08)', pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(135deg,#F97316,#EA580C)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
          }}>✨</div>
          <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--orange-900)', fontFamily: 'var(--display)' }}>
            AI Weekly Digest
          </span>
          <span style={{
            fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
            background: 'var(--orange-600)', color: '#fff',
          }}>LIVE</span>
        </div>
        <button onClick={onRefresh} className="btn-ghost" style={{ fontSize: 11 }}
          disabled={loading}>
          {loading ? '⟳ Refreshing…' : '↺ Refresh'}
        </button>
      </div>

      {loading ? (
        <div style={{
          height: 60, borderRadius: 8,
          background: 'linear-gradient(90deg,var(--orange-100) 0%,var(--orange-50) 50%,var(--orange-100) 100%)',
          backgroundSize: '800px 100%',
          animation: 'shimmer 1.5s infinite',
        }} />
      ) : (
        <p style={{ fontSize: 13.5, color: '#7C2D12', lineHeight: 1.7, fontStyle: 'italic' }}>
          "{digest?.text || 'Your personalized digest will appear here after first data sync.'}"
        </p>
      )}

      {digest?.generatedAt && (
        <p style={{ fontSize: 11, color: 'var(--orange-700)', marginTop: 10, opacity: 0.7 }}>
          Generated {new Date(digest.generatedAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' })}
        </p>
      )}
    </div>
  )
}
