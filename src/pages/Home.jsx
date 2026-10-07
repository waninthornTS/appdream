import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import GirlScene from '../components/GirlScene'
import ChordDiagram from '../components/ChordDiagram'
import { AppIcon } from '../components/Layout'
import { allTopics, categories } from '../data/knowledge'
import { FRIENDLY, chordSymbol, getChord } from '../data/chords'
import { useName, useStored } from '../lib/storage'
import { strum } from '../lib/audio'
import { SKIES, useSky } from '../lib/sky'
import Focus from '../components/Focus'

// Same pick for the whole day
function dailyPick(list, salt = 0) {
  const d = new Date()
  const seed = d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate() + salt
  return list.length ? list[seed % list.length] : null
}

export default function Home() {
  const { now, sky } = useSky(15000)
  const [name] = useName()
  const tip = useMemo(() => dailyPick(allTopics, 7), [])
  const [ck, cs] = dailyPick(FRIENDLY, 3)
  const chord = getChord(ck, cs)

  const time = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
  const date = now.toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'short' })

  return (
    <div className="home">
      <p className="time-pill">
        {SKIES[sky].emoji} <b>{time} น.</b> <span>· {date}</span>
      </p>

      <div className="scene-card">
        <GirlScene sky={sky} name={name} />
      </div>

      <h2 className="section-label">🌿 ไปเล่นกัน</h2>
      <div className="mode-grid">
        <Link to="/learn" className="card mode-card">
          <AppIcon icon="book" c="#FFC857" cd="#DDA22A" size={46} />
          <b>คลังความรู้</b>
          <small>
            {categories.length} หมวด · {allTopics.length} เรื่อง
          </small>
        </Link>
        <Link to="/chords" className="card mode-card">
          <AppIcon icon="guitar" c="#7CC4F0" cd="#4E9CCB" size={46} />
          <b>คอร์ดกีตาร์</b>
          <small>12 คีย์ · 529 คอร์ด</small>
        </Link>
      </div>

      <h2 className="section-label">🌿 วันนี้มีอะไรดี</h2>
      {tip && (
        <Link to={`/learn/${tip.category.id}/${tip.id}`} className="card tip-card">
          <span className="tip-emoji">{tip.emoji}</span>
          <div>
            <span className="pill pink">ความรู้ประจำวัน</span>
            <b>{tip.title}</b>
            <small>{tip.summary}</small>
          </div>
          <span className="tip-go">›</span>
        </Link>
      )}

      {chord && (
        <div className="card chord-day">
          <div>
            <span className="pill blue">คอร์ดประจำวัน</span>
            <h2 className="chord-day-name">{chordSymbol(ck, cs)}</h2>
            <div className="row-gap">
              <button className="btn" onClick={() => strum(chord.positions[0].midi)}>
                🔊 ฟังเสียง
              </button>
              <Link className="btn ghost" to={`/chords/${encodeURIComponent(ck)}/${encodeURIComponent(cs)}`}>
                ดูท่าจับ
              </Link>
            </div>
          </div>
          <ChordDiagram position={chord.positions[0]} size={112} title={chordSymbol(ck, cs)} />
        </div>
      )}

      <h2 className="section-label">🌿 ตัวช่วยประจำวัน</h2>
      <Focus />
      <Todo />
    </div>
  )
}

function Todo() {
  const [todos, setTodos] = useStored('todos', [])
  const [text, setText] = useState('')
  const add = (e) => {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    setTodos((list) => [...list, { id: Date.now(), text: t, done: false }])
    setText('')
  }
  const toggle = (id) => setTodos((list) => list.map((x) => (x.id === id ? { ...x, done: !x.done } : x)))
  const remove = (id) => setTodos((list) => list.filter((x) => x.id !== id))
  const left = todos.filter((t) => !t.done).length

  return (
    <div className="card">
      <p className="card-kicker">📝 สิ่งที่ต้องทำวันนี้ {todos.length > 0 && <span className="muted">· เหลือ {left}</span>}</p>
      <form className="todo-form" onSubmit={add}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="เช่น อ่านเรื่อง JOIN, ซ้อมคอร์ด F" />
        <button className="btn" type="submit">
          +
        </button>
      </form>
      {todos.length === 0 ? (
        <p className="muted small">ยังไม่มีอะไรเลย ว่างจัง~ 🌼</p>
      ) : (
        <ul className="todo-list">
          {todos.map((t) => (
            <li key={t.id} className={t.done ? 'done' : ''}>
              <button className="todo-check" onClick={() => toggle(t.id)} aria-label="ทำเสร็จแล้ว">
                {t.done ? '🌸' : ''}
              </button>
              <span onClick={() => toggle(t.id)}>{t.text}</span>
              <button className="todo-del" onClick={() => remove(t.id)} aria-label="ลบ">
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
