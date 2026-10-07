import { useEffect, useRef, useState } from 'react'
import { pluck } from '../lib/audio'

const MODES = {
  focus: { label: 'โฟกัส', min: 25, emoji: '🍅' },
  break: { label: 'พัก', min: 5, emoji: '🍵' },
}

// Pomodoro timer; counts against an end timestamp so it survives backgrounding.
export default function Focus() {
  const [mode, setMode] = useState('focus')
  const [endAt, setEndAt] = useState(null)
  const [left, setLeft] = useState(MODES.focus.min * 60)
  const timer = useRef()

  useEffect(() => {
    if (!endAt) return
    const tick = () => {
      const s = Math.max(0, Math.round((endAt - Date.now()) / 1000))
      setLeft(s)
      if (s === 0) {
        setEndAt(null)
        ;[76, 79, 84].forEach((m, i) => setTimeout(() => pluck(m), i * 220))
      }
    }
    tick()
    timer.current = setInterval(tick, 500)
    return () => clearInterval(timer.current)
  }, [endAt])

  const pick = (m) => {
    setMode(m)
    setEndAt(null)
    setLeft(MODES[m].min * 60)
  }
  const start = () => setEndAt(Date.now() + left * 1000)
  const pause = () => setEndAt(null)
  const reset = () => pick(mode)

  const total = MODES[mode].min * 60
  const pct = 1 - left / total
  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')

  return (
    <div className="card focus">
      <p className="card-kicker">⏰ จับเวลาโฟกัส</p>
      <div className="focus-row">
        <div className="focus-ring" style={{ '--pct': pct }}>
          <span className="focus-time">
            {mm}:{ss}
          </span>
          <span className="focus-emoji">{MODES[mode].emoji}</span>
        </div>
        <div className="focus-controls">
          <div className="seg">
            {Object.entries(MODES).map(([k, v]) => (
              <button key={k} className={mode === k ? 'on' : ''} onClick={() => pick(k)}>
                {v.label} {v.min}'
              </button>
            ))}
          </div>
          <div className="row-gap">
            {endAt ? (
              <button className="btn" onClick={pause}>
                ⏸ พัก
              </button>
            ) : (
              <button className="btn" onClick={start} disabled={left === 0}>
                ▶ เริ่ม
              </button>
            )}
            <button className="btn ghost" onClick={reset}>
              ↺
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
