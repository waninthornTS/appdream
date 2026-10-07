// Validates every knowledge file against SCHEMA.md.
import { readdirSync } from 'node:fs'
const dir = new URL('../src/data/knowledge/', import.meta.url)
const TYPES = new Set(['text', 'list', 'steps', 'code', 'table', 'tip', 'warn', 'pairs', 'flow'])
let problems = 0, topics = 0
const bad = (...m) => { problems++; console.log('✗', ...m) }
for (const f of readdirSync(dir).filter((f) => f.endsWith('.js') && f !== 'index.js')) {
  const c = (await import(new URL(f, dir))).default
  if (c.id + '.js' !== f) bad(f, 'id mismatch', c.id)
  const ids = new Set()
  for (const t of c.topics) {
    topics++
    if (ids.has(t.id)) bad(f, 'dup id', t.id)
    ids.add(t.id)
    if (!t.title || !t.emoji || !t.summary) bad(f, t.id, 'missing title/emoji/summary')
    for (const s of t.sections || []) {
      if (!TYPES.has(s.type)) bad(f, t.id, 'type', s.type)
      if (['list', 'steps', 'pairs'].includes(s.type) && !Array.isArray(s.items)) bad(f, t.id, s.type, 'no items')
      if (s.type === 'code' && typeof s.code !== 'string') bad(f, t.id, 'code missing')
      if (s.type === 'table') for (const r of s.rows) if (r.length !== s.headers.length) bad(f, t.id, 'row len')
      if (['text', 'tip', 'warn'].includes(s.type) && typeof s.body !== 'string') bad(f, t.id, s.type, 'body missing')
      if (s.type === 'flow') for (const it of s.items) if (!it.icon || !it.label) bad(f, t.id, 'flow item missing icon/label')
      const items = (s.items || []).flatMap((it) => (typeof it === 'string' ? [it] : [it.label, it.desc, it.arrow]))
      const txt = [s.body, s.note, ...items, ...(s.rows || []).flat()].filter(Boolean).join(' ')
      if (/\[object Object\]/.test(txt)) bad(f, t.id, 'object rendered as text')
      if ((txt.match(/`/g) || []).length % 2) bad(f, t.id, 'odd backticks', txt.slice(0, 60))
    }
  }
  console.log(`✓ ${f}: ${c.topics.length} topics`)
}
console.log({ topics, problems })
