// Cute SVG chord box. Frets in `position` are relative to baseFret (1 = baseFret).
export const FINGER_COLORS = {
  1: '#f48fb1', // ชี้
  2: '#ffb74d', // กลาง
  3: '#81c784', // นาง
  4: '#64b5f6', // ก้อย
  0: '#a1887f',
}

const STRINGS = 6
const FRETS = 4
const X0 = 30
const SX = 20 // string spacing
const Y0 = 42
const SY = 27 // fret spacing
const W = X0 * 2 + SX * (STRINGS - 1)
const H = Y0 + SY * FRETS + 30

const xOf = (s) => X0 + s * SX
const yOf = (f) => Y0 + (f - 0.5) * SY

export default function ChordDiagram({ position, size = 140, showStrings = true, title }) {
  const { frets, fingers = [], barres = [], baseFret = 1 } = position
  const bottom = Y0 + SY * FRETS

  const barreShapes = barres.map((b) => {
    const idx = frets.map((f, i) => (f === b ? i : -1)).filter((i) => i >= 0)
    if (!idx.length) return null
    const from = idx[0]
    const to = idx[idx.length - 1]
    const finger = fingers[from] || 1
    return { b, from, to, finger }
  })

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={size}
      height={(size * H) / W}
      role="img"
      aria-label={title ? `คอร์ด ${title}` : 'chord diagram'}
      className="chord-svg"
    >
      {/* fretboard */}
      <rect x={X0 - 10} y={Y0 - 4} width={SX * 5 + 20} height={SY * FRETS + 8} rx="10" fill="var(--wood-light)" />
      {/* nut or base fret */}
      {baseFret === 1 ? (
        <rect x={X0 - 2} y={Y0 - 5} width={SX * 5 + 4} height="6" rx="3" fill="var(--wood-dark)" />
      ) : (
        <text x={X0 - 14} y={yOf(1) + 4} textAnchor="end" fontSize="11" fontWeight="700" fill="var(--ink-soft)">
          {baseFret}fr
        </text>
      )}
      {/* frets */}
      {Array.from({ length: FRETS + 1 }, (_, i) => (
        <line key={'f' + i} x1={X0} x2={xOf(5)} y1={Y0 + i * SY} y2={Y0 + i * SY} stroke="var(--fret)" strokeWidth={i === 0 ? 1.5 : 1.5} strokeLinecap="round" />
      ))}
      {/* strings (thicker for bass) */}
      {Array.from({ length: STRINGS }, (_, s) => (
        <line key={'s' + s} x1={xOf(s)} x2={xOf(s)} y1={Y0} y2={bottom} stroke="var(--string)" strokeWidth={2.2 - s * 0.25} />
      ))}
      {/* open / muted markers */}
      {frets.map((f, s) =>
        f === -1 ? (
          <g key={'m' + s} stroke="var(--mute)" strokeWidth="2.2" strokeLinecap="round">
            <line x1={xOf(s) - 4.5} y1={Y0 - 18} x2={xOf(s) + 4.5} y2={Y0 - 9} />
            <line x1={xOf(s) + 4.5} y1={Y0 - 18} x2={xOf(s) - 4.5} y2={Y0 - 9} />
          </g>
        ) : f === 0 ? (
          <circle key={'o' + s} cx={xOf(s)} cy={Y0 - 13.5} r="5" fill="var(--card)" stroke="var(--leaf-dark)" strokeWidth="2.2" />
        ) : null,
      )}
      {/* barres */}
      {barreShapes.map(
        (bs) =>
          bs && (
            <g key={'b' + bs.b}>
              <rect
                x={xOf(bs.from) - 8.5}
                y={yOf(bs.b) - 8.5}
                width={xOf(bs.to) - xOf(bs.from) + 17}
                height="17"
                rx="8.5"
                fill={FINGER_COLORS[bs.finger]}
                stroke="#fff"
                strokeWidth="1.5"
              />
              <text x={xOf(bs.from)} y={yOf(bs.b) + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">
                {bs.finger}
              </text>
            </g>
          ),
      )}
      {/* finger dots */}
      {frets.map((f, s) => {
        if (f <= 0) return null
        const finger = fingers[s] || 0
        const onBarre = barreShapes.some((bs) => bs && bs.b === f && s >= bs.from && s <= bs.to && (fingers[s] || 0) === bs.finger)
        if (onBarre) return null
        return (
          <g key={'d' + s}>
            <circle cx={xOf(s)} cy={yOf(f)} r="8.5" fill={FINGER_COLORS[finger]} stroke="#fff" strokeWidth="1.5" />
            {finger > 0 && (
              <text x={xOf(s)} y={yOf(f) + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">
                {finger}
              </text>
            )}
          </g>
        )
      })}
      {showStrings &&
        ['E', 'A', 'D', 'G', 'B', 'e'].map((n, s) => (
          <text key={'n' + s} x={xOf(s)} y={bottom + 18} textAnchor="middle" fontSize="10" fill="var(--ink-faint)">
            {n}
          </text>
        ))}
    </svg>
  )
}
