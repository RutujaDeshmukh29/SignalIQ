import React, { useState, useEffect } from 'react'
import { loadCompFeed, loadProfile, timeAgo } from '../utils/dataStore'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts'

const COMP_COLORS = ['#F97316','#14B8A6','#8B5CF6','#F43F5E','#EAB308']

export default function Competitors() {
  const [feed, setFeed]     = useState([])
  const [filter, setFilter] = useState('all')
  const profile = loadProfile()

  useEffect(() => { setFeed(loadCompFeed()) }, [])

  // Bar chart data: mention count per competitor
  const competitors = [...new Set(feed.map(c => c.competitorName))]
  const barData = competitors.map((name, i) => ({
    name, count: feed.filter(c => c.competitorName === name).length, color: COMP_COLORS[i % COMP_COLORS.length],
  })).sort((a,b) => b.count - a.count)

  const filtered = filter === 'all' ? feed : feed.filter(c => c.competitorName === filter)

  const topComp = barData[0]

  return (
    <div>
      <div className="animate-fadeUp" style={{ marginBottom:24 }}>
        <h1 style={{ fontFamily:'var(--display)',fontWeight:800,fontSize:24,letterSpacing:'-0.5px' }}>Competitor Radar 🎯</h1>
        <p style={{ fontSize:13,color:'var(--text-muted)',marginTop:4 }}>Public news mentions of your tracked competitors</p>
      </div>

      {competitors.length === 0 ? (
        <div style={{
          textAlign:'center',padding:'80px 20px',background:'#fff',
          borderRadius:16,border:'1px solid var(--border)',
        }}>
          <div style={{ fontSize:48,marginBottom:16 }}>🎯</div>
          <p style={{ fontWeight:700,fontSize:16,marginBottom:8 }}>No competitors tracked yet</p>
          <p style={{ fontSize:13,color:'var(--text-muted)' }}>Go to Settings → edit your profile to add competitor names</p>
        </div>
      ) : (
        <>
          {/* Top row: summary + chart */}
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:24 }}>

            {/* Most active */}
            <div className="animate-fadeUp anim-d1" style={{
              background:'linear-gradient(135deg,var(--orange-50),var(--orange-100))',
              border:'1px solid var(--orange-200)',borderRadius:16,padding:'20px 22px',
            }}>
              <div style={{ fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:0.6,color:'var(--orange-600)',marginBottom:8 }}>
                Most Active Competitor
              </div>
              {topComp ? (
                <>
                  <div style={{ fontFamily:'var(--display)',fontWeight:800,fontSize:22,color:'var(--orange-900)',marginBottom:4 }}>
                    {topComp.name}
                  </div>
                  <div style={{ fontSize:13,color:'var(--orange-700)' }}>
                    {topComp.count} mentions in the last 30 days
                  </div>
                </>
              ) : <div style={{ color:'var(--text-muted)',fontSize:13 }}>No data</div>}
            </div>

            {/* Bar chart */}
            <div className="animate-fadeUp anim-d2" style={{
              background:'#fff',border:'1px solid var(--border)',borderRadius:16,padding:'18px 20px',
            }}>
              <div style={{ fontSize:13,fontWeight:700,fontFamily:'var(--display)',marginBottom:14 }}>Weekly Mentions</div>
              <ResponsiveContainer width="100%" height={110}>
                <BarChart data={barData} margin={{ top:0,right:0,bottom:0,left:-28 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--stone-100)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize:10,fill:'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize:10,fill:'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize:11,borderRadius:8,border:'1px solid var(--border)',boxShadow:'var(--shadow)' }} />
                  <Bar dataKey="count" radius={[4,4,0,0]}>
                    {barData.map((entry,i) => <Cell key={i} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Filter pills */}
          <div className="animate-fadeUp anim-d3" style={{
            display:'flex',gap:8,marginBottom:16,flexWrap:'wrap',
          }}>
            <button onClick={() => setFilter('all')} style={{
              padding:'5px 14px',borderRadius:20,fontSize:12,fontWeight:filter==='all'?600:400,
              background:filter==='all'?'var(--orange-100)':'#fff',
              color:filter==='all'?'var(--orange-700)':'var(--text-secondary)',
              border:filter==='all'?'1px solid var(--orange-200)':'1px solid var(--border-md)',
            }}>All competitors</button>
            {competitors.map((c,i) => (
              <button key={c} onClick={() => setFilter(c)} style={{
                padding:'5px 14px',borderRadius:20,fontSize:12,fontWeight:filter===c?600:400,
                background:filter===c?COMP_COLORS[i%COMP_COLORS.length]+'22':'#fff',
                color:filter===c?COMP_COLORS[i%COMP_COLORS.length]:'var(--text-secondary)',
                border:`1px solid ${filter===c?COMP_COLORS[i%COMP_COLORS.length]+'55':'var(--border-md)'}`,
              }}>{c}</button>
            ))}
          </div>

          {/* Timeline feed */}
          <div className="animate-fadeUp anim-d4" style={{ display:'flex',flexDirection:'column',gap:10 }}>
            {filtered.map((item,i) => {
              const ci = competitors.indexOf(item.competitorName)
              const color = COMP_COLORS[ci % COMP_COLORS.length]
              const isRecent = item.hoursAgo < 24
              return (
                <div key={item.id} className="animate-fadeUp" style={{
                  animationDelay:`${i*30}ms`,
                  background:'#fff',border:'1px solid var(--border)',borderRadius:12,
                  padding:'14px 16px',display:'flex',gap:14,alignItems:'flex-start',
                  transition:'box-shadow 0.2s,transform 0.2s',
                }}
                  onMouseEnter={e=>{e.currentTarget.style.boxShadow='var(--shadow-sm)';e.currentTarget.style.transform='translateY(-1px)'}}
                  onMouseLeave={e=>{e.currentTarget.style.boxShadow='';e.currentTarget.style.transform=''}}
                >
                  {/* Left color dot */}
                  <div style={{ flexShrink:0,display:'flex',flexDirection:'column',alignItems:'center',gap:4,paddingTop:2 }}>
                    <div style={{ width:10,height:10,borderRadius:'50%',background:color }} />
                    <div style={{ width:1,flex:1,background:i<filtered.length-1?`${color}33`:'transparent',minHeight:16 }} />
                  </div>

                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ display:'flex',alignItems:'flex-start',gap:8,marginBottom:6 }}>
                      <p style={{ flex:1,fontSize:13,fontWeight:600,color:'var(--text-primary)',lineHeight:1.45 }}>
                        {item.headline}
                      </p>
                      {isRecent && (
                        <span style={{ fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:20,
                          background:'var(--rose-100)',color:'var(--rose-700)',flexShrink:0 }}>NEW</span>
                      )}
                    </div>
                    <div style={{ display:'flex',gap:10,alignItems:'center',flexWrap:'wrap' }}>
                      <span style={{ fontSize:11,fontWeight:700,padding:'2px 9px',borderRadius:20,
                        background:color+'22',color }}>
                        {item.competitorName}
                      </span>
                      <span style={{ fontSize:11,color:'var(--text-muted)' }}>📰 {item.source}</span>
                      <span style={{ fontSize:11,color:'var(--text-muted)' }}>🏷 {item.topic}</span>
                      <span style={{ fontSize:11,color:'var(--text-muted)',marginLeft:'auto' }}>{timeAgo(item.hoursAgo)}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
