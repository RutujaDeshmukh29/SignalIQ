import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadProfile, saveProfile, clearAll } from '../utils/dataStore'

const INDUSTRIES = ['AI/ML Services','D2C Brand','Manufacturing','Content Creator','Finance','Other']
const GOALS = ['updated','opportunities','competitors','content']
const GOAL_LABELS = { updated:'Stay updated', opportunities:'Spot opportunities', competitors:'Track competitors', content:'Content ideas' }

export default function Settings() {
  const navigate = useNavigate()
  const [form, setForm]       = useState({ name:'',industry:'',keywords:[],competitors:[],goal:'' })
  const [kwInput, setKwInput] = useState('')
  const [coInput, setCoInput] = useState('')
  const [saved, setSaved]     = useState(false)
  const [resetConfirm, setResetConfirm] = useState(false)

  useEffect(() => {
    const p = loadProfile()
    if (p) setForm({ name:p.name||'',industry:p.industry||'',keywords:p.keywords||[],competitors:p.competitors||[],goal:p.goal||'' })
  }, [])

  function addTag(field, val, setter) {
    const v = val.trim()
    if (!v || form[field].includes(v) || form[field].length >= 5) return
    setForm(f => ({ ...f, [field]: [...f[field], v] }))
    setter('')
  }

  function removeTag(field, idx) {
    setForm(f => ({ ...f, [field]: f[field].filter((_,i) => i !== idx) }))
  }

  function handleSave() {
    saveProfile({ ...form, updatedAt: new Date().toISOString() })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function handleReset() {
    if (!resetConfirm) { setResetConfirm(true); return }
    clearAll()
    navigate('/setup')
  }

  const TagInput = ({ field, inputVal, setInputVal, color='orange', placeholder }) => (
    <div style={{
      border:'1.5px solid var(--border-md)',borderRadius:10,padding:10,
      background:'var(--surface)',minHeight:70,display:'flex',flexWrap:'wrap',gap:6,alignItems:'flex-start',
      transition:'border-color 0.18s',
    }}
      onFocus={e=>e.currentTarget.style.borderColor='var(--orange-500)'}
      onBlur={e=>e.currentTarget.style.borderColor='var(--border-md)'}
    >
      {form[field].map((tag,i) => (
        <span key={i} style={{
          background:`var(--${color}-100)`,color:`var(--${color}-800,var(--orange-800))`,
          borderRadius:20,padding:'4px 12px',fontSize:12,fontWeight:500,
          display:'flex',alignItems:'center',gap:5,
        }}>
          {tag}
          <button onClick={()=>removeTag(field,i)} style={{ color:'var(--text-muted)',fontSize:14,lineHeight:1 }}>×</button>
        </span>
      ))}
      {form[field].length < 5 && (
        <input value={inputVal} onChange={e=>setInputVal(e.target.value)}
          onKeyDown={e=>{ if(e.key==='Enter'||e.key===','){e.preventDefault();addTag(field,inputVal,setInputVal)} }}
          placeholder={form[field].length===0?placeholder:'Add another…'}
          style={{ border:'none',background:'transparent',outline:'none',fontSize:13,flex:1,minWidth:130,padding:'4px 2px' }}
        />
      )}
    </div>
  )

  return (
    <div style={{ maxWidth:680 }}>
      <div className="animate-fadeUp" style={{ marginBottom:28 }}>
        <h1 style={{ fontFamily:'var(--display)',fontWeight:800,fontSize:24,letterSpacing:'-0.5px' }}>Settings ⚙️</h1>
        <p style={{ fontSize:13,color:'var(--text-muted)',marginTop:4 }}>Update your profile — changes retune your signal feed</p>
      </div>

      {/* Profile section */}
      {[
        { id:'profile', icon:'👤', title:'Your profile', content: (
          <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
            <div>
              <label style={{ fontSize:12,fontWeight:600,color:'var(--text-secondary)',display:'block',marginBottom:6 }}>Name</label>
              <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Your name" />
            </div>
            <div>
              <label style={{ fontSize:12,fontWeight:600,color:'var(--text-secondary)',display:'block',marginBottom:6 }}>Industry</label>
              <select value={form.industry} onChange={e=>setForm(f=>({...f,industry:e.target.value}))}>
                <option value="">Select industry</option>
                {INDUSTRIES.map(i=><option key={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize:12,fontWeight:600,color:'var(--text-secondary)',display:'block',marginBottom:6 }}>Tracking goal</label>
              <div style={{ display:'flex',gap:8,flexWrap:'wrap' }}>
                {GOALS.map(g=>(
                  <button key={g} onClick={()=>setForm(f=>({...f,goal:g}))} style={{
                    padding:'6px 14px',borderRadius:8,fontSize:12,fontWeight:form.goal===g?600:400,
                    border:`1.5px solid ${form.goal===g?'var(--orange-500)':'var(--border-md)'}`,
                    background:form.goal===g?'var(--orange-100)':'#fff',
                    color:form.goal===g?'var(--orange-700)':'var(--text-secondary)',
                  }}>{GOAL_LABELS[g]}</button>
                ))}
              </div>
            </div>
          </div>
        )},
        { id:'keywords', icon:'🏷', title:'Tracked keywords', content: (
          <div>
            <p style={{ fontSize:12,color:'var(--text-muted)',marginBottom:10 }}>Up to 5 keywords. Press Enter to add.</p>
            <TagInput field="keywords" inputVal={kwInput} setInputVal={setKwInput} color="orange" placeholder="Type a keyword and press Enter…" />
          </div>
        )},
        { id:'competitors', icon:'🎯', title:'Competitors to watch', content: (
          <div>
            <p style={{ fontSize:12,color:'var(--text-muted)',marginBottom:10 }}>Up to 5 competitor names. Press Enter to add.</p>
            <TagInput field="competitors" inputVal={coInput} setInputVal={setCoInput} color="violet" placeholder="Type a competitor name and press Enter…" />
          </div>
        )},
      ].map((section, i) => (
        <div key={section.id} className="animate-fadeUp" style={{
          animationDelay:`${i*60}ms`,
          background:'#fff',border:'1px solid var(--border)',borderRadius:14,
          padding:'20px 22px',marginBottom:14,
        }}>
          <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:16 }}>
            <span style={{ fontSize:16 }}>{section.icon}</span>
            <span style={{ fontWeight:700,fontSize:14,fontFamily:'var(--display)' }}>{section.title}</span>
          </div>
          {section.content}
        </div>
      ))}

      {/* Save button */}
      <div className="animate-fadeUp anim-d4" style={{ display:'flex',alignItems:'center',gap:12,marginBottom:32 }}>
        <button onClick={handleSave} className="btn-primary" style={{ padding:'10px 28px',fontSize:14 }}>
          {saved ? '✓ Saved!' : 'Save changes'}
        </button>
        {saved && (
          <span className="animate-fadeIn" style={{ fontSize:13,color:'var(--teal-700)',fontWeight:500 }}>
            ✓ Your signal feed has been updated
          </span>
        )}
      </div>

      {/* Danger zone */}
      <div className="animate-fadeUp anim-d5" style={{
        border:'1.5px solid var(--rose-100)',borderRadius:14,padding:'18px 20px',
        background:'var(--rose-50)',
      }}>
        <div style={{ fontWeight:700,fontSize:13,color:'var(--rose-700)',marginBottom:6 }}>⚠️ Reset account</div>
        <p style={{ fontSize:12,color:'var(--rose-700)',marginBottom:14,lineHeight:1.5 }}>
          This clears all your data, preferences, and feedback history. You'll restart the setup flow.
        </p>
        <button onClick={handleReset} style={{
          padding:'7px 18px',borderRadius:8,fontSize:12,fontWeight:600,
          border:'1.5px solid var(--rose-500)',
          background:resetConfirm?'var(--rose-500)':'transparent',
          color:resetConfirm?'#fff':'var(--rose-700)',
          transition:'all 0.18s',
        }}>
          {resetConfirm ? '⚠️ Click again to confirm reset' : 'Reset all data'}
        </button>
        {resetConfirm && (
          <button onClick={()=>setResetConfirm(false)} style={{ marginLeft:10,fontSize:12,color:'var(--text-muted)' }}>
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}
