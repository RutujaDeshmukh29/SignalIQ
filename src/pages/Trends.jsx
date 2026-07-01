import React, { useState, useEffect } from 'react'
import { loadSignals } from '../utils/dataStore'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts'

const LINE_COLORS = ['#F97316','#14B8A6','#8B5CF6','#F43F5E','#EAB308']

function buildChartData(signals, keywords) {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Today']
  return days.map((day, di) => {
    const row = { day }
    keywords.forEach((kw, ki) => {
      const base = signals.find(s => s.keyword === kw)?.finalScore || 60
      row[kw] = Math.max(30, Math.min(100, base - (6-di)*4 + Math.floor(Math.random()*10)))
    })
    return row
  })
}

const SOURCE_ICONS = { news:'📰', community:'💬', default:'🔗' }

export default function Trends() {
  const [signals, setSignals] = useState([])
  const [filter, setFilter]   = useState('all')
  const [kwFilter, setKwFilter] = useState('all')
  const [sort, setSort]       = useState('score')
  const [chartData, setChartData] = useState([])
  const [keywords, setKeywords] = useState([])

  useEffect(() => {
    const s = loadSignals()
    setSignals(s)
    const kws = [...new Set(s.map(x => x.keyword))].slice(0,5)
    setKeywords(kws)
    setChartData(buildChartData(s, kws))
  }, [])

  const filtered = signals
    .filter(s => filter === 'all' || s.sourceType === filter)
    .filter(s => kwFilter === 'all' || s.keyword === kwFilter)
    .sort((a,b) => sort === 'score' ? b.finalScore - a.finalScore : b.recency - a.recency)

  const BADGE = { hot:'🔥 Hot', rising:'↑ Rising', watch:'● Watch' }
  const BADGE_STYLE = {
    hot:    { background:'var(--rose-100)',   color:'var(--rose-700)' },
    rising: { background:'var(--teal-50)',    color:'var(--teal-700)' },
    watch:  { background:'var(--violet-100)', color:'var(--violet-700)' },
  }

  return (
    <div>
      <div className="animate-fadeUp" style={{ marginBottom:24 }}>
        <h1 style={{ fontFamily:'var(--display)',fontWeight:800,fontSize:24,letterSpacing:'-0.5px' }}>Trends Explorer 📈</h1>
        <p style={{ fontSize:13,color:'var(--text-muted)',marginTop:4 }}>Velocity of tracked topics over the past 7 days</p>
      </div>

      {/* Chart */}
      <div className="animate-fadeUp anim-d1" style={{
        background:'#fff',border:'1px solid var(--border)',borderRadius:16,
        padding:'22px 24px',marginBottom:24,
      }}>
        <div style={{ fontWeight:700,fontSize:14,fontFamily:'var(--display)',marginBottom:18,color:'var(--text-primary)' }}>
          📡 Signal Velocity — Last 7 Days
        </div>
        {keywords.length === 0 ? (
          <div style={{ height:200,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--text-muted)',fontSize:13 }}>
            No data yet — complete setup first
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} margin={{ top:4,right:16,bottom:0,left:-20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--stone-100)" />
              <XAxis dataKey="day" tick={{ fontSize:11,fill:'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis domain={[20,100]} tick={{ fontSize:11,fill:'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{
                background:'#fff',border:'1px solid var(--border)',borderRadius:10,
                fontSize:12,boxShadow:'var(--shadow)',
              }} />
              <Legend wrapperStyle={{ fontSize:12,paddingTop:8 }} />
              {keywords.map((kw,i) => (
                <Line key={kw} type="monotone" dataKey={kw}
                  stroke={LINE_COLORS[i % LINE_COLORS.length]}
                  strokeWidth={2.5} dot={false}
                  activeDot={{ r:5,strokeWidth:0 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Filters */}
      <div className="animate-fadeUp anim-d2" style={{
        background:'#fff',border:'1px solid var(--border)',borderRadius:12,
        padding:'12px 16px',marginBottom:16,
        display:'flex',gap:12,alignItems:'center',flexWrap:'wrap',
      }}>
        <div style={{ display:'flex',gap:6,alignItems:'center' }}>
          <span style={{ fontSize:11,fontWeight:600,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:0.5 }}>Source</span>
          {['all','news','community'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding:'4px 12px',borderRadius:20,fontSize:12,fontWeight:filter===f?600:400,
              background:filter===f?'var(--orange-100)':'transparent',
              color:filter===f?'var(--orange-700)':'var(--text-secondary)',
              border:filter===f?'1px solid var(--orange-200)':'1px solid var(--border-md)',
            }}>{f === 'all' ? 'All' : f === 'news' ? '📰 News' : '💬 Community'}</button>
          ))}
        </div>
        <div style={{ width:1,height:20,background:'var(--border-md)' }} />
        <div style={{ display:'flex',gap:6,alignItems:'center' }}>
          <span style={{ fontSize:11,fontWeight:600,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:0.5 }}>Sort</span>
          {[{v:'score',l:'Top Score'},{v:'recent',l:'Newest'}].map(s => (
            <button key={s.v} onClick={() => setSort(s.v)} style={{
              padding:'4px 12px',borderRadius:20,fontSize:12,fontWeight:sort===s.v?600:400,
              background:sort===s.v?'var(--teal-50)':'transparent',
              color:sort===s.v?'var(--teal-700)':'var(--text-secondary)',
              border:sort===s.v?'1px solid #99F6E4':'1px solid var(--border-md)',
            }}>{s.l}</button>
          ))}
        </div>
        <div style={{ marginLeft:'auto',fontSize:12,color:'var(--text-muted)' }}>{filtered.length} signals</div>
      </div>

      {/* Signal grid */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:12 }}>
        {filtered.map((s,i) => {
          const bs = BADGE_STYLE[s.badge] || BADGE_STYLE.watch
          return (
            <div key={s.id} className="animate-fadeUp" style={{
              animationDelay:`${i*40}ms`,
              background:'#fff',border:'1px solid var(--border)',
              borderRadius:12,padding:'14px 16px',
              transition:'box-shadow 0.2s,transform 0.2s',
            }}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow='var(--shadow)';e.currentTarget.style.transform='translateY(-1px)'}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow='';e.currentTarget.style.transform=''}}
            >
              <div style={{ display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:8,marginBottom:8 }}>
                <p style={{ fontSize:12.5,fontWeight:600,color:'var(--text-primary)',lineHeight:1.45,flex:1 }}>{s.title}</p>
                <span style={{ ...bs,fontSize:10,fontWeight:600,padding:'2px 8px',borderRadius:20,flexShrink:0,whiteSpace:'nowrap' }}>
                  {BADGE[s.badge]||'● Watch'}
                </span>
              </div>
              <div style={{ display:'flex',alignItems:'center',gap:8,flexWrap:'wrap' }}>
                <span style={{ fontSize:11,color:'var(--text-muted)' }}>{SOURCE_ICONS[s.sourceType]||SOURCE_ICONS.default} {s.source}</span>
                <span style={{ fontSize:11,background:'var(--orange-50)',color:'var(--orange-700)',padding:'1px 7px',borderRadius:20 }}>
                  🏷 {s.keyword}
                </span>
                <span style={{ marginLeft:'auto',fontSize:11,fontWeight:700,color:'var(--orange-600)' }}>
                  Score: {s.finalScore}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
