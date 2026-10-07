import { TopBar } from '../components/Layout'
import { TopicRow } from './Learn'
import { ChordCard } from './Chords'
import { getCategory, getTopic } from '../data/knowledge'
import { useName, useSaved, useStored } from '../lib/storage'
import { SKIES } from '../lib/sky'

export default function Saved() {
  const { saved } = useSaved()
  const [name, setName] = useName()
  const [skyMode, setSkyMode] = useStored('skyMode', 'auto')

  const topics = saved
    .filter((x) => x.startsWith('topic:'))
    .map((x) => {
      const [cat, id] = x.slice(6).split('/')
      const c = getCategory(cat)
      const t = getTopic(cat, id)
      return c && t ? { c, t } : null
    })
    .filter(Boolean)

  const chords = saved
    .filter((x) => x.startsWith('chord:'))
    .map((x) => {
      const rest = x.slice(6)
      const i = rest.indexOf('/')
      return { k: rest.slice(0, i), s: rest.slice(i + 1) }
    })

  const rename = () => {
    const n = window.prompt('อยากให้เรียกว่าอะไรดี?', name)
    if (n && n.trim()) setName(n.trim())
  }

  return (
    <>
      <TopBar title="⭐ ที่เก็บไว้" />

      <h3 className="block-title">📖 เรื่องที่เก็บไว้อ่าน</h3>
      {topics.length ? (
        <div className="list">
          {topics.map(({ c, t }) => (
            <TopicRow key={c.id + t.id} topic={t} category={c} />
          ))}
        </div>
      ) : (
        <p className="empty">กด ☆ มุมขวาบนในหน้าความรู้ เพื่อเก็บไว้ที่นี่น้า</p>
      )}

      <h3 className="block-title">🎸 คอร์ดโปรด</h3>
      {chords.length ? (
        <div className="chord-grid">
          {chords.map(({ k, s }) => (
            <ChordCard key={k + s} k={k} s={s} />
          ))}
        </div>
      ) : (
        <p className="empty">กด ☆ ในหน้าคอร์ดเพื่อเก็บคอร์ดที่ชอบ</p>
      )}

      <div className="card settings">
        <p className="card-kicker">⚙️ ตั้งค่า</p>
        <button className="btn ghost wide" onClick={rename}>
          ✏️ เปลี่ยนชื่อเล่น ({name})
        </button>
        <p className="card-kicker" style={{ marginTop: 6 }}>🌈 ท้องฟ้า</p>
        <div className="sky-picker">
          {[['auto', '🕰️', 'ตามเวลา'], ...Object.entries(SKIES).map(([k, v]) => [k, v.emoji, v.label])].map(([k, emoji, label]) => (
            <button key={k} className={'chip-btn' + (skyMode === k ? ' on' : '')} onClick={() => setSkyMode(k)}>
              {emoji} {label}
            </button>
          ))}
        </div>
        <p className="muted small">
          ติดตั้งบน iPhone: เปิดใน Safari → ปุ่มแชร์ <b>⎋</b> → <b>เพิ่มไปยังหน้าจอโฮม</b>
        </p>
      </div>
    </>
  )
}
