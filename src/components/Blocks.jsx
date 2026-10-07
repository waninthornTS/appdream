import { useState } from 'react'

// Inline formatting: `code` and **bold** only (see data/knowledge/SCHEMA.md).
export function Rich({ text }) {
  if (text == null) return null
  const parts = String(text).split(/(`[^`]+`|\*\*[^*]+\*\*)/g)
  return parts.map((p, i) => {
    if (p.startsWith('`') && p.endsWith('`') && p.length > 1) return <code key={i}>{p.slice(1, -1)}</code>
    if (p.startsWith('**') && p.endsWith('**') && p.length > 3)
      return (
        <strong key={i}>
          <Rich text={p.slice(2, -2)} />
        </strong>
      )
    return p
  })
}

const SIDE_LABEL = { client: 'Client', server: 'Server', db: 'Database', net: 'Network' }

function CodeBlock({ block }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(block.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      /* clipboard unavailable (non-HTTPS) */
    }
  }
  return (
    <div className="code-wrap">
      <div className="code-head">
        <span className="code-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="code-lang">{block.lang}</span>
        <button className="code-copy" onClick={copy}>
          {copied ? 'คัดลอกแล้ว ✓' : 'คัดลอก'}
        </button>
      </div>
      <pre>
        <code>{block.code}</code>
      </pre>
      {block.note && (
        <p className="code-note">
          💡 <Rich text={block.note} />
        </p>
      )}
    </div>
  )
}

function Block({ block }) {
  const title = block.title && <h3 className="block-title">{block.title}</h3>
  switch (block.type) {
    case 'text':
      return (
        <section className="block">
          {title}
          {String(block.body)
            .split(/\n\n+/)
            .map((p, i) => (
              <p key={i}>
                <Rich text={p} />
              </p>
            ))}
        </section>
      )
    case 'list':
    case 'steps': {
      const Tag = block.type === 'steps' ? 'ol' : 'ul'
      return (
        <section className="block">
          {title}
          <Tag className={block.type === 'steps' ? 'steps' : 'leafy-list'}>
            {block.items.map((it, i) => (
              <li key={i}>
                <Rich text={it} />
              </li>
            ))}
          </Tag>
        </section>
      )
    }
    case 'code':
      return (
        <section className="block">
          {title}
          <CodeBlock block={block} />
        </section>
      )
    case 'table':
      return (
        <section className="block">
          {title}
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {block.headers.map((h, i) => (
                    <th key={i}>
                      <Rich text={h} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((r, i) => (
                  <tr key={i}>
                    {r.map((c, j) => (
                      <td key={j}>
                        <Rich text={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )
    case 'tip':
    case 'warn':
      return (
        <section className={`bubble ${block.type}`}>
          <span className="bubble-badge">{block.type === 'tip' ? '🍃 เคล็ดลับ' : '⚠️ ระวังนะ!'}</span>
          <p>
            <Rich text={block.body} />
          </p>
        </section>
      )
    case 'pairs':
      return (
        <section className="block">
          <h3 className="block-title">{block.title || 'ใช้คู่กับ'}</h3>
          <div className="chips">
            {block.items.map((it, i) => (
              <span className="chip" key={i}>
                <Rich text={it} />
              </span>
            ))}
          </div>
        </section>
      )
    case 'flow':
      return (
        <section className="block">
          {title}
          <div className="flow">
            {block.items.map((it, i) => (
              <div key={i}>
                <div className={`flow-step ${it.side || ''}`}>
                  <span className="flow-icon">{it.icon}</span>
                  <div className="flow-text">
                    <b>
                      <Rich text={it.label} />
                    </b>
                    {it.desc && (
                      <small>
                        <Rich text={it.desc} />
                      </small>
                    )}
                  </div>
                  {it.side && <span className="flow-side">{SIDE_LABEL[it.side]}</span>}
                </div>
                {i < block.items.length - 1 && (
                  <div className="flow-arrow">
                    <span className="flow-arrow-line">{block.back ? '↑' : '↓'}</span>
                    {it.arrow && (
                      <span className="flow-arrow-label">
                        <Rich text={it.arrow} />
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )
    default:
      return null
  }
}

export default function Blocks({ sections = [] }) {
  return sections.map((b, i) => <Block key={i} block={b} />)
}
