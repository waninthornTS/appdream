import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TopBar, StarButton } from '../components/Layout'
import ChordDiagram, { FINGER_COLORS } from '../components/ChordDiagram'
import { NotFound } from './Learn'
import { GROUPS, KEYS, KEY_ALIASES, SUFFIX_INFO, chordNotes, chordSymbol, getChord, suffixLabel } from '../data/chords'
import { useSaved, useStored } from '../lib/storage'
import { strum, pluck } from '../lib/audio'

const chordPath = (k, s) => `/chords/${encodeURIComponent(k)}/${encodeURIComponent(s)}`

export function ChordCard({ k, s }) {
  const chord = getChord(k, s)
  if (!chord) return null
  const name = chordSymbol(k, s)
  return (
    <Link to={chordPath(k, s)} className="chord-card">
      <span className="chord-name">{name}</span>
      <ChordDiagram position={chord.positions[0]} size={104} showStrings={false} title={name} />
      <small>{suffixLabel(s)}</small>
    </Link>
  )
}

export function ChordsHome() {
  const [key, setKey] = useStored('chordKey', 'C')
  const [group, setGroup] = useStored('chordGroup', 'basic')
  const [showAll, setShowAll] = useState(false)
  const g = GROUPS.find((x) => x.id === group) || GROUPS[0]

  return (
    <>
      <TopBar title="🎸 คอร์ดกีตาร์" />

      <div className="key-picker">
        {KEYS.map((k) => (
          <button key={k} className={'key-btn' + (k === key && !showAll ? ' on' : '')} onClick={() => (setKey(k), setShowAll(false))}>
            {k}
          </button>
        ))}
      </div>

      <div className="group-tabs">
        {GROUPS.map((x) => (
          <button key={x.id} className={'chip-btn' + (x.id === g.id ? ' on' : '')} onClick={() => setGroup(x.id)}>
            {x.emoji} {x.label}
          </button>
        ))}
      </div>

      <label className="toggle-row">
        <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} />
        <span>แสดงทุกคีย์ในหมวดนี้</span>
      </label>

      {showAll ? (
        g.suffixes.map((s) => (
          <section key={s} className="chord-section">
            <h3 className="block-title">
              {chordSymbol('X', s).replace('X', '□')} · {suffixLabel(s)}
            </h3>
            <div className="chord-grid">
              {KEYS.map((k) => (
                <ChordCard key={k} k={k} s={s} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <>
          <p className="muted small center">
            คีย์ <b>{KEY_ALIASES[key] || key}</b> · {g.suffixes.length} คอร์ด
          </p>
          <div className="chord-grid">
            {g.suffixes.map((s) => (
              <ChordCard key={s} k={key} s={s} />
            ))}
          </div>
        </>
      )}

      <Legend />
    </>
  )
}

function Legend() {
  return (
    <div className="card legend">
      <p className="card-kicker">🐾 วิธีอ่านภาพคอร์ด</p>
      <ul className="legend-list">
        {[1, 2, 3, 4].map((f) => (
          <li key={f}>
            <i style={{ background: FINGER_COLORS[f] }}>{f}</i> {['นิ้วชี้', 'นิ้วกลาง', 'นิ้วนาง', 'นิ้วก้อย'][f - 1]}
          </li>
        ))}
        <li>
          <i className="open" /> ดีดสายเปล่า
        </li>
        <li>
          <i className="mute">×</i> ไม่ต้องดีดสายนี้
        </li>
      </ul>
      <p className="muted small">
        เส้นแนวตั้ง = สาย (ซ้ายสุดคือสาย 6 เสียงทุ้ม E) · แถบยาวๆ = ทาบ (barre) · “3fr” = เริ่มที่เฟรต 3
      </p>
    </div>
  )
}

export function ChordDetail() {
  const { k, s } = useParams()
  const chord = getChord(k, s)
  const { isSaved, toggle } = useSaved()
  const [pos, setPos] = useState(0)
  if (!chord) return <NotFound />

  const name = chordSymbol(k, s)
  const p = chord.positions[Math.min(pos, chord.positions.length - 1)]
  const sid = `chord:${k}/${s}`
  const info = SUFFIX_INFO[s]
  const strings = ['E', 'A', 'D', 'G', 'B', 'e']

  return (
    <>
      <TopBar title="คอร์ด" back="/chords" right={<StarButton on={isSaved(sid)} onClick={() => toggle(sid)} />} />
      <div className="chord-hero">
        <h1>{name}</h1>
        <p>
          {KEY_ALIASES[k] || k} {suffixLabel(s)}
          {info?.feel && <span className="feel"> · ฟีล {info.feel}</span>}
        </p>
      </div>

      <div className="card chord-big">
        <ChordDiagram position={p} size={230} title={name} />
        <div className="row-gap center">
          <button className="btn" onClick={() => strum(p.midi)}>
            🔊 ตีคอร์ด
          </button>
          <button className="btn ghost" onClick={() => strum([...p.midi].reverse(), { gap: 0.03 })}>
            ↑ ตีขึ้น
          </button>
        </div>
      </div>

      {chord.positions.length > 1 && (
        <div className="positions">
          <p className="card-kicker">ท่าจับอื่นๆ ({chord.positions.length} แบบ)</p>
          <div className="pos-row">
            {chord.positions.map((x, i) => (
              <button key={i} className={'pos-btn' + (i === pos ? ' on' : '')} onClick={() => setPos(i)}>
                <ChordDiagram position={x} size={78} showStrings={false} />
                <small>{x.baseFret === 1 ? 'ตำแหน่งเปิด' : `เฟรต ${x.baseFret}`}</small>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <p className="card-kicker">🎼 โน้ตในคอร์ด</p>
        <div className="chips">
          {chordNotes(p).map((n) => (
            <span key={n} className="chip note">
              {n}
            </span>
          ))}
        </div>
        <p className="card-kicker" style={{ marginTop: 14 }}>
          🎯 จับทีละสาย (แตะเพื่อฟัง)
        </p>
        <div className="string-table">
          {p.frets.map((f, i) => {
            const real = f <= 0 ? f : f + p.baseFret - 1
            const midiIdx = p.frets.slice(0, i).filter((x) => x >= 0).length
            const midi = f >= 0 ? p.midi[midiIdx] : null
            return (
              <button key={i} className="string-cell" disabled={midi == null} onClick={() => midi != null && pluck(midi)}>
                <b>{strings[i]}</b>
                <span>{f === -1 ? '×' : f === 0 ? 'เปล่า' : `เฟรต ${real}`}</span>
                {p.fingers[i] > 0 && <i style={{ background: FINGER_COLORS[p.fingers[i]] }}>{p.fingers[i]}</i>}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
