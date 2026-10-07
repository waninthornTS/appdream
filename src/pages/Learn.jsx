import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TopBar, StarButton } from '../components/Layout'
import Blocks from '../components/Blocks'
import { categories, getCategory, getTopic, searchTopics } from '../data/knowledge'
import { useSaved, useStored } from '../lib/storage'

export function TopicRow({ topic, category }) {
  const [read] = useStored('read', [])
  const done = read.includes(`${category.id}/${topic.id}`)
  return (
    <Link to={`/learn/${category.id}/${topic.id}`} className="topic-row" style={{ '--accent': category.color }}>
      <span className="topic-emoji">{topic.emoji}</span>
      <span className="topic-text">
        <b>{topic.title}</b>
        <small>{topic.summary}</small>
      </span>
      <span className="topic-go">{done ? '🌸' : '›'}</span>
    </Link>
  )
}

export function LearnHome() {
  const [q, setQ] = useState('')
  const results = searchTopics(q)
  const [read] = useStored('read', [])

  return (
    <>
      <TopBar title="📚 คลังความรู้" />
      <div className="search">
        <span>🔍</span>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ค้นหา เช่น JOIN, Docker, useEffect" />
        {q && (
          <button onClick={() => setQ('')} aria-label="ล้าง">
            ×
          </button>
        )}
      </div>

      {q ? (
        <div className="list">
          <p className="muted small">เจอ {results.length} เรื่อง</p>
          {results.map((t) => (
            <TopicRow key={t.category.id + t.id} topic={t} category={t.category} />
          ))}
          {results.length === 0 && <p className="empty">ไม่เจอเลย ลองคำอื่นดูน้า 🐾</p>}
        </div>
      ) : (
        <div className="cat-grid">
          {categories.map((c) => {
            const n = c.topics.filter((t) => read.includes(`${c.id}/${t.id}`)).length
            return (
              <Link key={c.id} to={`/learn/${c.id}`} className="cat-card" style={{ '--accent': c.color }}>
                <span className="cat-emoji">{c.emoji}</span>
                <b>{c.title}</b>
                <small>{c.topics.length} เรื่อง</small>
                <span className="progress">
                  <i style={{ width: `${(n / c.topics.length) * 100}%` }} />
                </span>
              </Link>
            )
          })}
          {categories.length === 0 && <p className="empty">กำลังเตรียมเนื้อหาอยู่น้า 🍃</p>}
        </div>
      )}
    </>
  )
}

export function CategoryPage() {
  const { cat } = useParams()
  const c = getCategory(cat)
  if (!c) return <NotFound />
  return (
    <>
      <TopBar title={`${c.emoji} ${c.title}`} back="/learn" />
      <div className="cat-hero" style={{ '--accent': c.color }}>
        <p>{c.intro}</p>
      </div>
      <div className="list">
        {c.topics.map((t) => (
          <TopicRow key={t.id} topic={t} category={c} />
        ))}
      </div>
    </>
  )
}

export function TopicPage() {
  const { cat, topic } = useParams()
  const c = getCategory(cat)
  const t = getTopic(cat, topic)
  const { isSaved, toggle } = useSaved()
  const [read, setRead] = useStored('read', [])
  if (!c || !t) return <NotFound />

  const key = `${c.id}/${t.id}`
  const sid = `topic:${key}`
  const done = read.includes(key)
  const i = c.topics.indexOf(t)
  const next = c.topics[i + 1]
  const prev = c.topics[i - 1]

  return (
    <article className="topic" style={{ '--accent': c.color }}>
      <TopBar title={c.title} back={`/learn/${c.id}`} right={<StarButton on={isSaved(sid)} onClick={() => toggle(sid)} />} />
      <div className="topic-hero">
        <span className="topic-hero-emoji">{t.emoji}</span>
        <h1>{t.title}</h1>
        <p>{t.summary}</p>
      </div>
      <div className="paper">
        <Blocks sections={t.sections} />

        <button
          className={'btn wide' + (done ? ' ghost' : '')}
          onClick={() => setRead((r) => (done ? r.filter((x) => x !== key) : [...r, key]))}
        >
          {done ? '🌸 อ่านจบแล้ว (กดเพื่อยกเลิก)' : '✅ อ่านจบแล้ว!'}
        </button>
      </div>

      <nav className="prev-next">
        {prev ? (
          <Link to={`/learn/${c.id}/${prev.id}`}>
            ‹ {prev.emoji} {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/learn/${c.id}/${next.id}`} className="next">
            {next.emoji} {next.title} ›
          </Link>
        )}
      </nav>
    </article>
  )
}

export function NotFound() {
  return (
    <>
      <TopBar title="หลงทาง" back="/" />
      <p className="empty">ไม่เจอหน้านี้เลย 🐾</p>
    </>
  )
}
