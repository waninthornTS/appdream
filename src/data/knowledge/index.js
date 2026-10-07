// Every <id>.js file in this folder is a category (see SCHEMA.md).
const modules = import.meta.glob('./*.js', { eager: true })

const ORDER = ['stack', 'frameworks', 'languages', 'sql', 'web', 'deploy', 'os', 'git', 'cs']

export const categories = Object.values(modules)
  .map((m) => m.default)
  .filter((c) => c && c.id && Array.isArray(c.topics))
  .sort((a, b) => {
    const ia = ORDER.indexOf(a.id)
    const ib = ORDER.indexOf(b.id)
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib)
  })

export const getCategory = (id) => categories.find((c) => c.id === id)

export const getTopic = (catId, topicId) => getCategory(catId)?.topics.find((t) => t.id === topicId)

export const allTopics = categories.flatMap((c) => c.topics.map((t) => ({ ...t, category: c })))

function blockText(b) {
  return [b.title, b.body, b.code, b.note, ...(b.items || []), ...(b.headers || []), ...(b.rows || []).flat()]
    .filter(Boolean)
    .join(' ')
}

const index = allTopics.map((t) => ({
  topic: t,
  head: [t.title, t.summary, ...(t.tags || []), t.category.title].join(' ').toLowerCase(),
  body: (t.sections || []).map(blockText).join(' ').toLowerCase(),
}))

export function searchTopics(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const words = q.split(/\s+/)
  return index
    .map(({ topic, head, body }) => {
      let score = 0
      for (const w of words) {
        if (head.includes(w)) score += 5
        else if (body.includes(w)) score += 1
        else return null
      }
      return { topic, score }
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 40)
    .map((r) => r.topic)
}
