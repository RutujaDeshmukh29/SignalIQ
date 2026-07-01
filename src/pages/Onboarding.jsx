import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveProfile } from '../utils/dataStore'

const INDUSTRIES = ['AI/ML Services','D2C Brand','Manufacturing','Content Creator','Finance','Other']
const GOALS = [
  { id:'updated',       label:'Stay updated',        desc:'Daily pulse on what\'s moving in your market', icon:'📡' },
  { id:'opportunities', label:'Spot opportunities',  desc:'Find gaps before your competitors fill them',  icon:'🎯' },
  { id:'competitors',   label:'Track competitors',   desc:'Know exactly what rival brands are doing',     icon:'🔍' },
  { id:'content',       label:'Content ideas',       desc:'Turn trending signals into post and pitch ideas', icon:'✍️' },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep]     = useState(1)
  const [form, setForm]     = useState({ name:'',industry:'',keywords:[],competitors:[],goal:'' })
  const [kwInput, setKwInput]   = useState('')
  const [compInput, setCompInput] = useState('')
  const [leaving, setLeaving]   = useState(false)

  function addTag(field, val, setter) {
    const v = val.trim()
    if (!v || form[field].includes(v) || form[field].length >= 5) return
    setForm(f => ({ ...f, [field]: [...f[field], v] }))
    setter('')
  }
  function removeTag(field, idx) { setForm(f=>({...f,[field]:f[field].filter((_,i)=>i!==idx)})) }

  function next() {
    if (step < 4) { setLeaving(true); setTimeout(()=>{ setStep(s=>s+1); setLeaving(false) },200) }
    else finish()
  }
  function back() { setLeaving(true); setTimeout(()=>{ setStep(s=>s-1); setLeaving(false) },200) }

  function finish() {
    saveProfile({ ...form, createdAt: new Date().toISOString() })
    navigate('/dashboard')
  }

  const canNext = () => {
    if (step===1) return form.name.trim() && form.industry
    if (step===2) return form.keywords.length >= 1
    if (step===3) return true
    if (step===4) return !!form.goal
    return true
  }

  const STEP_INFO = [
    { label:'Profile',     icon:'👤' },
    { label:'Keywords',    icon:'🏷' },
    { label:'Competitors', icon:'🎯' },
    { label:'Goal',        icon:'🚀' },
  ]

  return (
    <div style={{
      minHeight:'100vh',display:'flex',
      background:'linear-gradient(135deg,#FFF7ED 0%,#FEFBF3 40%,#F0FDFA 100%)',
    }}>
      {/* Left panel */}
      <div style={{
        width:340,flexShrink:0,
        background:'linear-gradient(160deg,#EA580C,#C2410C)',
        padding:'48px 36px',
        display:'flex',flexDirection:'column',justifyContent:'space-between',
      }}>
        <div>
          <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:48 }}>
            <div style={{
              width:38,height:38,borderRadius:10,background:'rgba(255,255,255,0.2)',
              display:'flex',alignItems:'center',justifyContent:'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="3.5" fill="white"/>
                <circle cx="9" cy="9" r="7.5" stroke="white" strokeWidth="1.2" fill="none" strokeDasharray="4 2.5"/>
              </svg>
            </div>
            <span style={{ color:'#fff',fontFamily:'var(--display)',fontWeight:800,fontSize:18,letterSpacing:'-0.5px' }}>
              SignalIQ
            </span>
          </div>

          <h2 style={{ color:'#fff',fontSize:28,fontFamily:'var(--display)',fontWeight:800,lineHeight:1.25,marginBottom:12 }}>
            Know what's moving<br/>before your<br/>competition does.
          </h2>
          <p style={{ color:'rgba(255,255,255,0.75)',fontSize:13,lineHeight:1.7 }}>
            Set up your intelligence radar in under 2 minutes. No code. No complexity.
          </p>
        </div>

        {/* Step indicators */}
        <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
          {STEP_INFO.map((s,i) => (
            <div key={i} style={{
              display:'flex',alignItems:'center',gap:12,
              opacity: step > i+1 ? 1 : step === i+1 ? 1 : 0.45,
              transition:'opacity 0.3s',
            }}>
              <div style={{
                width:32,height:32,borderRadius:'50%',
                background: step > i+1 ? 'rgba(255,255,255,0.3)' : step === i+1 ? '#fff' : 'rgba(255,255,255,0.15)',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:13,transition:'all 0.3s',
              }}>
                {step > i+1 ? '✓' : s.icon}
              </div>
              <span style={{ color:'#fff',fontSize:13,fontWeight: step===i+1 ? 700:400 }}>
                Step {i+1} — {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: form */}
      <div style={{
        flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 48px',
      }}>
        <div style={{
          width:'100%',maxWidth:460,
          opacity: leaving ? 0 : 1,
          transform: leaving ? 'translateX(16px)' : 'translateX(0)',
          transition:'opacity 0.2s,transform 0.2s',
        }}>
          {/* Progress bar */}
          <div style={{ height:4,background:'var(--stone-200)',borderRadius:2,marginBottom:36,overflow:'hidden' }}>
            <div style={{
              height:'100%',background:'linear-gradient(90deg,#F97316,#EA580C)',
              borderRadius:2,width:`${(step/4)*100}%`,transition:'width 0.4s cubic-bezier(0.22,1,0.36,1)',
            }} />
          </div>

          {step === 1 && (
            <div>
              <p style={{ fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:0.8,color:'var(--orange-600)',marginBottom:8 }}>Step 1 of 4</p>
              <h2 style={{ fontFamily:'var(--display)',fontWeight:800,fontSize:26,letterSpacing:'-0.5px',marginBottom:6 }}>
                Tell us about yourself
              </h2>
              <p style={{ fontSize:13,color:'var(--text-muted)',marginBottom:28 }}>
                This lets SignalIQ tailor signals to your exact market.
              </p>
              <div style={{ marginBottom:18 }}>
                <label style={{ fontSize:12,fontWeight:600,color:'var(--text-secondary)',display:'block',marginBottom:7 }}>Your name</label>
                <input placeholder="e.g. Rutuja Deshmukh" value={form.name}
                  onChange={e=>setForm(f=>({...f,name:e.target.value}))}
                  onKeyDown={e=>e.key==='Enter'&&canNext()&&next()} />
              </div>
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:'var(--text-secondary)',display:'block',marginBottom:7 }}>Industry / niche</label>
                <select value={form.industry} onChange={e=>setForm(f=>({...f,industry:e.target.value}))}>
                  <option value="">Choose your industry</option>
                  {INDUSTRIES.map(i=><option key={i}>{i}</option>)}
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p style={{ fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:0.8,color:'var(--orange-600)',marginBottom:8 }}>Step 2 of 4</p>
              <h2 style={{ fontFamily:'var(--display)',fontWeight:800,fontSize:26,letterSpacing:'-0.5px',marginBottom:6 }}>
                What should SignalIQ track?
              </h2>
              <p style={{ fontSize:13,color:'var(--text-muted)',marginBottom:28 }}>
                Add up to 5 keywords. Press Enter or comma after each.
              </p>
              <div style={{
                border:'1.5px solid var(--border-md)',borderRadius:12,padding:12,
                background:'var(--surface)',minHeight:90,display:'flex',flexWrap:'wrap',gap:8,alignItems:'flex-start',
              }}>
                {form.keywords.map((kw,i)=>(
                  <span key={i} style={{
                    background:'var(--orange-100)',color:'var(--orange-800,#431407)',
                    borderRadius:20,padding:'5px 12px',fontSize:12,fontWeight:600,
                    display:'flex',alignItems:'center',gap:5,
                  }}>
                    🏷 {kw}
                    <button onClick={()=>removeTag('keywords',i)} style={{ color:'var(--orange-600)',fontSize:15 }}>×</button>
                  </span>
                ))}
                {form.keywords.length < 5 && (
                  <input value={kwInput} onChange={e=>setKwInput(e.target.value)}
                    onKeyDown={e=>{ if(e.key==='Enter'||e.key===','){e.preventDefault();addTag('keywords',kwInput,setKwInput)} }}
                    placeholder={form.keywords.length===0?'Type a keyword and press Enter…':'Add more…'}
                    style={{ border:'none',background:'transparent',outline:'none',fontSize:13,flex:1,minWidth:160,padding:'4px 2px' }} />
                )}
              </div>
              <p style={{ fontSize:11,color:'var(--text-muted)',marginTop:8 }}>
                💡 Try: "AI agents", "RAG pipelines", "n8n", "LangChain", "FastAPI"
              </p>
            </div>
          )}

          {step === 3 && (
            <div>
              <p style={{ fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:0.8,color:'var(--orange-600)',marginBottom:8 }}>Step 3 of 4</p>
              <h2 style={{ fontFamily:'var(--display)',fontWeight:800,fontSize:26,letterSpacing:'-0.5px',marginBottom:6 }}>
                Who are your competitors?
              </h2>
              <p style={{ fontSize:13,color:'var(--text-muted)',marginBottom:28 }}>
                Add up to 5 competitor names. You can skip this and add them later.
              </p>
              <div style={{
                border:'1.5px solid var(--border-md)',borderRadius:12,padding:12,
                background:'var(--surface)',minHeight:90,display:'flex',flexWrap:'wrap',gap:8,alignItems:'flex-start',
              }}>
                {form.competitors.map((c,i)=>(
                  <span key={i} style={{
                    background:'var(--violet-100)',color:'var(--violet-700)',
                    borderRadius:20,padding:'5px 12px',fontSize:12,fontWeight:600,
                    display:'flex',alignItems:'center',gap:5,
                  }}>
                    🎯 {c}
                    <button onClick={()=>removeTag('competitors',i)} style={{ color:'var(--violet-700)',fontSize:15 }}>×</button>
                  </span>
                ))}
                {form.competitors.length < 5 && (
                  <input value={compInput} onChange={e=>setCompInput(e.target.value)}
                    onKeyDown={e=>{ if(e.key==='Enter'||e.key===','){e.preventDefault();addTag('competitors',compInput,setCompInput)} }}
                    placeholder={form.competitors.length===0?'Type a competitor name and press Enter…':'Add more…'}
                    style={{ border:'none',background:'transparent',outline:'none',fontSize:13,flex:1,minWidth:160,padding:'4px 2px' }} />
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <p style={{ fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:0.8,color:'var(--orange-600)',marginBottom:8 }}>Step 4 of 4</p>
              <h2 style={{ fontFamily:'var(--display)',fontWeight:800,fontSize:26,letterSpacing:'-0.5px',marginBottom:6 }}>
                What's your main goal?
              </h2>
              <p style={{ fontSize:13,color:'var(--text-muted)',marginBottom:24 }}>
                This shapes the action suggestions on every insight card.
              </p>
              <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
                {GOALS.map(g=>(
                  <div key={g.id} onClick={()=>setForm(f=>({...f,goal:g.id}))} style={{
                    padding:'14px 16px',borderRadius:12,cursor:'pointer',
                    border:`1.5px solid ${form.goal===g.id?'var(--orange-500)':'var(--border-md)'}`,
                    background:form.goal===g.id?'var(--orange-50)':'var(--surface)',
                    display:'flex',alignItems:'center',gap:12,
                    transition:'all 0.18s',
                    transform: form.goal===g.id?'scale(1.01)':'scale(1)',
                  }}>
                    <span style={{ fontSize:22 }}>{g.icon}</span>
                    <div>
                      <div style={{ fontWeight:700,fontSize:13,color:form.goal===g.id?'var(--orange-800,#431407)':'var(--text-primary)' }}>{g.label}</div>
                      <div style={{ fontSize:12,color:'var(--text-muted)',marginTop:2 }}>{g.desc}</div>
                    </div>
                    {form.goal===g.id && (
                      <div style={{ marginLeft:'auto',width:20,height:20,borderRadius:'50%',
                        background:'var(--orange-600)',display:'flex',alignItems:'center',justifyContent:'center',
                        color:'#fff',fontSize:11,fontWeight:700,flexShrink:0,
                      }}>✓</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:32 }}>
            {step > 1
              ? <button onClick={back} className="btn-ghost">← Back</button>
              : <div />
            }
            <button onClick={next} disabled={!canNext()} className="btn-primary" style={{
              opacity: canNext()?1:0.45, cursor: canNext()?'pointer':'not-allowed',
              transform: 'none',
            }}>
              {step === 4 ? '🚀 Launch my radar' : 'Continue →'}
            </button>
          </div>

          {step === 3 && (
            <p style={{ textAlign:'center',marginTop:14,fontSize:12,color:'var(--text-muted)' }}>
              Don't have competitors yet? Hit Continue — you can add them later in Settings.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
