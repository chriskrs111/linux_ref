import { useState, useRef } from 'react'
import { commands, CAT_COLORS } from './commands'

const CATEGORIES = ['All Categories', ...Array.from(new Set(commands.map(c => c.cat))).sort()]
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const TABS = ['A–Z', 'Categories']
const DETAIL_TABS = ['Overview', 'Parameters', 'Options']

export default function App() {
  const [tab, setTab]             = useState(0)
  const [search, setSearch]       = useState('')
  const [activeLetter, setLetter] = useState('A')
  const [activeCat, setCat]       = useState('All Categories')
  const [selected, setSelected]   = useState(null)
  const [detailTab, setDetailTab] = useState(0)
  const touchX = useRef(null)
  const touchY = useRef(null)

  const filtered = commands.filter(c => {
    const q = search.toLowerCase()
    return c.cmd.includes(q) || c.desc.toLowerCase().includes(q)
  })

  const displayList = tab === 0
    ? filtered.filter(c => c.cmd[0].toUpperCase() === activeLetter).sort((a, b) => a.cmd.localeCompare(b.cmd))
    : filtered.filter(c => activeCat === 'All Categories' || c.cat === activeCat).sort((a, b) => a.cmd.localeCompare(b.cmd))

  const onTouchStart = e => { touchX.current = e.touches[0].clientX; touchY.current = e.touches[0].clientY }
  const onTouchEnd   = e => {
    if (!touchX.current) return
    const dx = e.changedTouches[0].clientX - touchX.current
    const dy = Math.abs(e.changedTouches[0].clientY - touchY.current)
    if (Math.abs(dx) > 60 && dy < 50) setTab(t => dx < 0 ? Math.min(t + 1, 1) : Math.max(t - 1, 0))
    touchX.current = null
  }

  const openDetail = c => { setSelected(c); setDetailTab(0) }
  const color = selected ? (CAT_COLORS[selected.cat] || '#94a3b8') : '#3b82f6'

  return (
    <div style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", background: '#0f172a', minHeight: '100vh', color: '#f1f5f9', maxWidth: 430, margin: '0 auto', display: 'flex', flexDirection: 'column' }}>

      {/* ── Header ── */}
      <div style={{ background: '#1e293b', borderBottom: '1px solid #334155', padding: '12px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 22 }}>🐧</span>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: -0.5 }}>Linux Reference</span>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: '#64748b', background: '#0f172a', padding: '2px 8px', borderRadius: 99 }}>{commands.length} cmds</span>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 10 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#64748b' }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search commands…"
            style={{ width: '100%', boxSizing: 'border-box', background: '#0f172a', border: '1px solid #334155', borderRadius: 10, padding: '8px 10px 8px 32px', color: '#f1f5f9', fontSize: 15, outline: 'none' }} />
          {search && <span onClick={() => setSearch('')} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#64748b', fontSize: 16 }}>✕</span>}
        </div>

        {/* Main tabs */}
        <div style={{ display: 'flex', gap: 4 }}>
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{ flex: 1, padding: '8px 0', border: 'none', borderRadius: '8px 8px 0 0', background: tab === i ? '#0f172a' : 'transparent', color: tab === i ? '#38bdf8' : '#64748b', fontWeight: tab === i ? 700 : 500, fontSize: 14, cursor: 'pointer', borderBottom: tab === i ? '2px solid #38bdf8' : '2px solid transparent' }}>{t}</button>
          ))}
        </div>
      </div>

      {/* ── Sub-nav ── */}
      {tab === 0 && !search && (
        <div style={{ background: '#1e293b', borderBottom: '1px solid #334155', overflowX: 'auto', display: 'flex', padding: '6px 12px', gap: 4, scrollbarWidth: 'none' }}>
          {LETTERS.map(l => {
            const has = commands.some(c => c.cmd[0].toUpperCase() === l)
            return <button key={l} onClick={() => has && setLetter(l)} style={{ minWidth: 28, height: 28, borderRadius: 6, border: 'none', background: activeLetter === l ? '#38bdf8' : has ? '#1e293b' : 'transparent', color: activeLetter === l ? '#0f172a' : has ? '#94a3b8' : '#1e3a5f', fontWeight: 600, fontSize: 12, cursor: has ? 'pointer' : 'default', flexShrink: 0 }}>{l}</button>
          })}
        </div>
      )}
      {tab === 1 && !search && (
        <div style={{ background: '#1e293b', borderBottom: '1px solid #334155', overflowX: 'auto', display: 'flex', padding: '6px 12px', gap: 6, scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCat(cat)} style={{ whiteSpace: 'nowrap', padding: '4px 12px', borderRadius: 99, border: 'none', background: activeCat === cat ? (CAT_COLORS[cat] || '#38bdf8') : '#0f172a', color: activeCat === cat ? '#fff' : '#94a3b8', fontWeight: 600, fontSize: 12, cursor: 'pointer', flexShrink: 0 }}>
              {cat === 'All Categories' ? '⚡ All' : cat}
            </button>
          ))}
        </div>
      )}

      {/* ── Command list ── */}
      <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{ flex: 1, overflowY: 'auto', padding: '8px 12px' }}>
        {displayList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#475569' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>No commands found</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>Try a different search term</div>
          </div>
        ) : displayList.map(c => {
          const col = CAT_COLORS[c.cat] || '#94a3b8'
          return (
            <div key={c.cmd} onClick={() => openDetail(c)} style={{ background: '#1e293b', borderRadius: 12, marginBottom: 8, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', border: '1px solid #334155' }}>
              <div style={{ minWidth: 8, width: 8, height: 8, borderRadius: '50%', background: col }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, fontFamily: 'monospace', color: '#38bdf8' }}>{c.cmd}</span>
                  <span style={{ fontSize: 11, color: col, background: col + '22', padding: '1px 7px', borderRadius: 99, whiteSpace: 'nowrap' }}>{c.cat}</span>
                </div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.desc}</div>
              </div>
              <span style={{ color: '#475569', fontSize: 16 }}>›</span>
            </div>
          )
        })}
        <div style={{ height: 20 }} />
      </div>

      {/* ── Detail modal ── */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'flex-end', zIndex: 100 }} onClick={() => setSelected(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#1e293b', borderRadius: '20px 20px 0 0', width: '100%', maxWidth: 430, margin: '0 auto', maxHeight: '88vh', display: 'flex', flexDirection: 'column' }}>

            <div style={{ width: 36, height: 4, background: '#334155', borderRadius: 99, margin: '10px auto 0', flexShrink: 0 }} />

            {/* Title bar */}
            <div style={{ padding: '14px 20px 0', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ fontFamily: 'monospace', fontSize: 26, fontWeight: 800, color }}>{selected.cmd}</span>
                <span style={{ fontSize: 12, color: '#fff', background: color, padding: '3px 10px', borderRadius: 99 }}>{selected.cat}</span>
                <button onClick={() => setSelected(null)} style={{ marginLeft: 'auto', background: '#334155', border: 'none', borderRadius: '50%', width: 28, height: 28, color: '#94a3b8', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              </div>
              <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 14 }}>{selected.desc}</div>

              {/* Usage + Example */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                <div style={{ background: '#0f172a', borderRadius: 8, padding: '6px 12px', flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>Usage</div>
                  <code style={{ fontSize: 12, color: '#a5f3fc', fontFamily: 'monospace', wordBreak: 'break-all' }}>{selected.usage}</code>
                </div>
                <div style={{ background: '#0f172a', borderRadius: 8, padding: '6px 12px', flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>Example</div>
                  <code style={{ fontSize: 12, color: '#86efac', fontFamily: 'monospace', wordBreak: 'break-all' }}>{selected.ex}</code>
                </div>
              </div>

              {/* Detail tabs */}
              <div style={{ display: 'flex', borderBottom: '1px solid #334155' }}>
                {DETAIL_TABS.map((t, i) => (
                  <button key={t} onClick={() => setDetailTab(i)} style={{ flex: 1, padding: '8px 0', border: 'none', background: 'transparent', color: detailTab === i ? color : '#64748b', fontWeight: detailTab === i ? 700 : 500, fontSize: 13, cursor: 'pointer', borderBottom: detailTab === i ? `2px solid ${color}` : '2px solid transparent' }}>{t}</button>
                ))}
              </div>
            </div>

            {/* Detail content */}
            <div style={{ overflowY: 'auto', padding: '14px 20px 40px', flex: 1 }}>
              {detailTab === 0 && (
                <p style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>{selected.purpose}</p>
              )}
              {detailTab === 1 && (
                selected.params?.length > 0
                  ? selected.params.map((p, i) => (
                    <div key={i} style={{ background: '#0f172a', borderRadius: 10, padding: '12px 14px', marginBottom: 10 }}>
                      <code style={{ fontSize: 14, color: '#a5f3fc', fontFamily: 'monospace', fontWeight: 700 }}>{p.name}</code>
                      <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 5, lineHeight: 1.6, margin: '5px 0 0' }}>{p.desc}</p>
                    </div>
                  ))
                  : <Empty text="No positional parameters — this command uses options only." />
              )}
              {detailTab === 2 && (
                selected.options?.length > 0
                  ? selected.options.map((o, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: i < selected.options.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
                      <code style={{ fontSize: 13, color, fontFamily: 'monospace', fontWeight: 700, minWidth: 80, flexShrink: 0, background: color + '18', padding: '2px 8px', borderRadius: 6 }}>{o.flag}</code>
                      <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6, paddingTop: 2, margin: 0 }}>{o.desc}</p>
                    </div>
                  ))
                  : <Empty text="No options available for this command." />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Empty({ text }) {
  return (
    <div style={{ textAlign: 'center', padding: '30px 0', color: '#475569' }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>∅</div>
      <p style={{ fontSize: 14, margin: 0 }}>{text}</p>
    </div>
  )
}
