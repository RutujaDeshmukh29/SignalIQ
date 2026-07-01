import React, { useState, useEffect, useCallback } from 'react'
import { loadProfile, loadSignals, loadDigest, loadWeights, loadCompFeed, weightToLabel, timeAgo } from '../utils/dataStore'
import InsightCard from '../components/InsightCard'
import StatCard    from '../components/StatCard'
import DigestBox   from '../components/DigestBox'

function PulseDot({ active }) {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: 10, height: 10 }}>
      <span style={{
        width: 10, height: 10, borderRadius: '50%', display: 'block',
        background: active ? 'var(--teal-500)' : 'var(--stone-300)',
      }} />
      {active && (
        <span style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'var(--teal-500)', opacity: 0.4,
          animation: 'pulse-dot 1.8s ease-in-out infinite',
        }} />
      )}
    </span>
  )
}

export default function Dashboard() {
  const [signals, setSignals]     = useState([])
  const [digest, setDigest]       = useState(null)
  const [weights, setWeights]     = useState({})
  const [compFeed, setCompFeed]   = useState([])
  const [loading, setLoading]     = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const profile = loadProfile()

  const reload = useCallback(() => {
    setSignals(loadSignals())
    setDigest(loadDigest())
    setWeights(loadWeights())
    setCompFeed(loadCompFeed())
  }, [])

  useEffect(() => { reload() }, [reload, refreshKey])

  function handleRefresh() {
    setLoading(true)
    setTimeout(() => { reload(); setLoading(false) }, 1200)
  }

  // Stats
  const hotCount     = signals.filter(s => s.badge === 'hot').length
  const avgScore     = signals.length ? Math.round(signals.reduce((a,s) => a+s.finalScore,0)/signals.length) : 0
  const activeComps  = [...new Set(compFeed.filter(c => c.hoursAgo < 48).map(c => c.competitorName))].length

  // Sidebar: unique competitors, most recent mention each
  const compLatest = {}
  compFeed.forEach(c => {
    if (!compLatest[c.competitorName] || c.hoursAgo < compLatest[c.competitorName].hoursAgo)
      compLatest[c.competitorName] = c
  })
  const compItems = Object.values(compLatest).sort((a,b) => a.hoursAgo - b.hoursAgo)

  // Weight display
  const weightRows = Object.entries(weights).map(([kw, w]) => ({
    kw, w, label: weightToLabel(w),
    color: w >= 1.5 ? 'var(--teal-700)' : w >= 0.8 ? 'var(--orange-600)' : 'var(--stone-400)',
  })).sort((a,b) => b.w - a.w)

  return (
    <div>
      {/* Page header */}
      <div className="animate-fadeUp" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontFamily:'var(--display)', fontWeight:800, fontSize:24, letterSpacing:'-0.5px' }}>
            Good day{profile?.name ? `, ${profile.name.split(' ')[0]}` : ''} 👋
          </h1>
          <p style={{ fontSize:13, color:'var(--text-muted)', marginTop:4 }}>
            Here's what's moving in <strong style={{color:'var(--orange-600)'}}>{profile?.industry || 'your market'}</strong> right now
          </p>
        </div>
        <button onClick={handleRefresh} className="btn-primary" disabled={loading} style={{ display:'flex',gap:8,alignItems:'center' }}>
          {loading
            ? <><span style={{animation:'spin 0.8s linear infinite',display:'inline-block'}}>⟳</span> Syncing…</>
            : <><span>⟳</span> Refresh signals</>
          }
        </button>
      </div>

      {/* Stat cards */}
      <div className="animate-fadeUp anim-d1" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:22 }}>
        <StatCard value={signals.length} label="Total signals tracked"  delta="3 new since yesterday" icon="📡" color="orange" delay={50}  />
        <StatCard value={avgScore}       label="Average trend score"    delta="8 pts this week"       icon="📊" color="teal"   delay={100} />
        <StatCard value={activeComps}    label="Competitors active"     delta={`${hotCount} hot signals`} icon="🎯" color="rose"  delay={150} />
      </div>

      {/* Digest */}
      <div style={{ marginBottom: 22 }}>
        <DigestBox digest={digest} onRefresh={handleRefresh} loading={loading} />
      </div>

      {/* Two-column layout */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 288px', gap:20 }}>

        {/* Left: Insight feed */}
        <div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ fontWeight:700, fontSize:15, fontFamily:'var(--display)' }}>Intelligence Feed</span>
              <span style={{
                fontSize:11, fontWeight:600, padding:'2px 9px', borderRadius:20,
                background:'var(--orange-100)', color:'var(--orange-700)',
              }}>{signals.length} signals</span>
            </div>
            <span style={{ fontSize:11, color:'var(--text-muted)' }}>Ranked by trend score · updates daily</span>
          </div>

          {signals.length === 0 ? (
            <div style={{ textAlign:'center', padding:'60px 20px', color:'var(--text-muted)' }}>
              <div style={{ fontSize:40, marginBottom:12 }}>📡</div>
              <p style={{ fontWeight:600, fontSize:14, marginBottom:6 }}>No signals yet</p>
              <p style={{ fontSize:12 }}>Hit Refresh to pull your first intelligence feed</p>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {signals.map((s, i) => (
                <InsightCard key={`${s.id}-${refreshKey}`} signal={s} animDelay={i * 60}
                  onFeedback={() => setRefreshKey(k => k+1)} />
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

          {/* Competitor radar */}
          <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:'16px 18px' }}>
            <div style={{ fontWeight:700, fontSize:13, fontFamily:'var(--display)', marginBottom:14, display:'flex',alignItems:'center',gap:8 }}>
              🎯 Competitor Radar
              {activeComps > 0 && (
                <span style={{ fontSize:10,fontWeight:600,padding:'2px 7px',borderRadius:20,background:'var(--rose-100)',color:'var(--rose-700)' }}>
                  {activeComps} active
                </span>
              )}
            </div>
            {compItems.length === 0 ? (
              <p style={{ fontSize:12, color:'var(--text-muted)' }}>No competitors added yet — add them in Settings</p>
            ) : (
              <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
                {compItems.map((c, i) => {
                  const active = c.hoursAgo < 48
                  return (
                    <div key={i} className="animate-fadeUp" style={{
                      animationDelay:`${i*60}ms`,
                      display:'flex',alignItems:'center',gap:10,
                      padding:'9px 12px', borderRadius:10,
                      background: active ? 'var(--teal-50)' : 'var(--stone-50)',
                      border:`1px solid ${active ? '#99F6E4' : 'var(--border)'}`,
                    }}>
                      <PulseDot active={active} />
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontWeight:600, fontSize:12, color:'var(--text-primary)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.competitorName}</div>
                        <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:1 }}>{timeAgo(c.hoursAgo)} · {c.topic}</div>
                      </div>
                      <span style={{
                        fontSize:10,fontWeight:600,padding:'2px 7px',borderRadius:20,flexShrink:0,
                        background: active?'var(--teal-500)':'var(--stone-200)',
                        color: active?'#fff':'var(--text-muted)',
                      }}>{active?'Active':'Quiet'}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Preference weights */}
          {weightRows.length > 0 && (
            <div style={{ background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,padding:'16px 18px' }}>
              <div style={{ fontWeight:700,fontSize:13,fontFamily:'var(--display)',marginBottom:14 }}>🧠 Your Signal Tuning</div>
              <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
                {weightRows.map(({ kw, w, label, color }) => (
                  <div key={kw} style={{ display:'flex',alignItems:'center',gap:8 }}>
                    <div style={{ flex:1,minWidth:0 }}>
                      <div style={{ fontSize:12,color:'var(--text-primary)',fontWeight:500,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>{kw}</div>
                      <div style={{ marginTop:3,height:3,background:'var(--stone-100)',borderRadius:2,overflow:'hidden' }}>
                        <div style={{ height:'100%',background:color,borderRadius:2,width:`${(w/2)*100}%`,transition:'width 0.6s' }} />
                      </div>
                    </div>
                    <span style={{ fontSize:11,fontWeight:700,color,flexShrink:0 }}>{label}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize:11,color:'var(--text-muted)',marginTop:12,lineHeight:1.5 }}>
                Tap "Useful" on cards to train your feed
              </p>
            </div>
          )}

          {/* Profile chip */}
          <div style={{ background:'linear-gradient(135deg,var(--orange-50),var(--orange-100))',border:'1px solid var(--orange-200)',borderRadius:14,padding:'14px 16px' }}>
            <div style={{ fontWeight:700,fontSize:12,color:'var(--orange-900)',marginBottom:10 }}>📋 Your Profile</div>
            <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
              {[
                { label:'Industry', val: profile?.industry },
                { label:'Goal',     val: profile?.goal?.replace(/([A-Z])/g,' $1').trim() },
                { label:'Keywords', val: profile?.keywords?.join(', ') },
              ].map(r => r.val && (
                <div key={r.label}>
                  <span style={{ fontSize:10,fontWeight:600,color:'var(--orange-600)',textTransform:'uppercase',letterSpacing:0.5 }}>{r.label}</span>
                  <p style={{ fontSize:12,color:'var(--orange-900)',marginTop:1,lineHeight:1.4 }}>{r.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
