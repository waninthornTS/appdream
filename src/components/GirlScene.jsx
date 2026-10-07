// Dream (art from appforluv, re-held with a guitar by scripts/make-dream.mjs) on a hill under a clock-driven sky.
const DREAM = import.meta.env.BASE_URL + 'dream-guitar.webp'
const SKY_GRADIENTS = {
  morning: ['#ffd9c2', '#ffe9dc', '#eaf6ff'],
  day: ['#bfe3ff', '#e6f4ff', '#fff1f6'],
  evening: ['#ffa9a0', '#ffc9b5', '#ffe6ee'],
  night: ['#2e2a5e', '#4d4790', '#7a6db8'],
}

const SUN = { morning: '#ffd36e', day: '#ffe58a', evening: '#ffb38a' }

function Sparkle({ x, y, s = 1, delay = 0 }) {
  return (
    <path
      className="twinkle"
      style={{ animationDelay: `${delay}s` }}
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -7 C1 -2 2 -1 7 0 C2 1 1 2 0 7 C-1 2 -2 1 -7 0 C-2 -1 -1 -2 0 -7 Z"
      fill="#fff3b8"
    />
  )
}

function Cloud({ x, y, s = 1, opacity = 1, className = 'cloud' }) {
  return (
    <g className={className} transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
      <ellipse cx="0" cy="8" rx="30" ry="12" fill="#fff" />
      <circle cx="-10" cy="2" r="13" fill="#fff" />
      <circle cx="10" cy="-2" r="16" fill="#fff" />
    </g>
  )
}

export default function GirlScene({ sky = 'day', name = '' }) {
  const [c0, c1, c2] = SKY_GRADIENTS[sky]
  const night = sky === 'night'
  return (
    <svg viewBox="0 0 360 300" className="girl-scene" role="img" aria-label="Dream ถือกีตาร์ยืนบนเนินหญ้า">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c0} />
          <stop offset="0.55" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </linearGradient>
        <radialGradient id="ground" cx="50%" cy="0%" r="100%">
          <stop offset="0" stopColor={night ? '#8fcb80' : '#b4e39c'} />
          <stop offset="0.45" stopColor={night ? '#63a85c' : '#86c977'} />
          <stop offset="1" stopColor={night ? '#3f7c45' : '#5aa45a'} />
        </radialGradient>
        <pattern id="grass" width="14" height="10" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.1" fill="#fff" opacity="0.28" />
          <circle cx="10" cy="8" r="1.1" fill="#fff" opacity="0.2" />
        </pattern>
        <mask id="moon-cut">
          <rect width="360" height="300" fill="#fff" />
          <circle cx="306" cy="44" r="22" fill="#000" />
        </mask>
      </defs>

      <rect width="360" height="300" fill="url(#sky)" />

      {night ? (
        <>
          <circle cx="294" cy="54" r="36" fill="#fff7d6" opacity="0.12" />
          <circle cx="294" cy="54" r="24" fill="#fff7d6" mask="url(#moon-cut)" />
          {[
            [40, 40, 0.8, 0], [120, 28, 0.6, 0.6], [200, 60, 0.9, 1.2], [250, 26, 0.55, 0.3],
            [80, 96, 0.5, 0.9], [330, 110, 0.7, 1.5], [170, 110, 0.45, 0.4],
          ].map(([x, y, s, d], i) => (
            <Sparkle key={i} x={x} y={y} s={s} delay={d} />
          ))}
          {[[20, 70], [150, 50], [230, 100], [300, 140], [60, 140], [340, 70]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.4" fill="#fff" opacity="0.8" className="twinkle" style={{ animationDelay: `${i * 0.4}s` }} />
          ))}
          <Cloud x={60} y={70} s={0.9} opacity={0.15} />
        </>
      ) : (
        <>
          <circle cx="300" cy={sky === 'evening' ? 70 : 52} r="24" fill={SUN[sky]} className="glow" />
          <circle cx="300" cy={sky === 'evening' ? 70 : 52} r="34" fill={SUN[sky]} opacity="0.25" />
          <Cloud x={70} y={60} s={1} />
          <Cloud x={220} y={100} s={0.7} opacity={0.9} className="cloud slow" />
        </>
      )}

      {/* hill */}
      <ellipse cx="180" cy="340" rx="270" ry="105" fill="url(#ground)" />
      <ellipse cx="180" cy="340" rx="270" ry="105" fill="url(#grass)" />
      {[[34, 262], [326, 258], [300, 284], [58, 288]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 4} cy={Math.sin((a * Math.PI) / 180) * 4} r="3.6" fill={i % 2 ? '#fff' : '#ffb3c9'} />
          ))}
          <circle r="2.4" fill="#ffd36e" />
        </g>
      ))}

      {/* music notes from her guitar */}
      <g className="notes" fill={night ? '#fff3b8' : '#b48cf0'}>
        <text x="282" y="170" fontSize="26">♪</text>
        <text x="306" y="136" fontSize="20">♫</text>
        <text x="270" y="120" fontSize="16">♪</text>
      </g>

      {/* character */}
      <ellipse cx="180" cy="283" rx="52" ry="8" fill="#1f3a22" opacity="0.25" />
      <g className="bob">
        <image href={DREAM} x="95" y="50" width="170" height="233" preserveAspectRatio="xMidYMax meet" />
      </g>

      {name && (
        <g transform="translate(180 284)">
          <rect x={-(name.length * 4.6 + 16)} y="-13" width={name.length * 9.2 + 32} height="26" rx="13" fill="#fffcf3" stroke="#eadcc2" strokeWidth="2" />
          <text textAnchor="middle" y="5" fontSize="13.5" fontWeight="700" fill="#6b4a3a">
            {name}
          </text>
        </g>
      )}
    </svg>
  )
}
