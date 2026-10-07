// Music-theory check for voicings: semitones above the root allowed in each chord type.
export const PC = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 }

export const INTERVALS = {
  major: [0, 4, 7], minor: [0, 3, 7], dim: [0, 3, 6], dim7: [0, 3, 6, 9], sus2: [0, 2, 7], sus4: [0, 5, 7],
  '7sus4': [0, 5, 7, 10], aug: [0, 4, 8], 6: [0, 4, 7, 9], 69: [0, 2, 4, 7, 9], 7: [0, 4, 7, 10], '7b5': [0, 4, 6, 10],
  aug7: [0, 4, 8, 10], 9: [0, 2, 4, 7, 10], '9b5': [0, 2, 4, 6, 10], aug9: [0, 2, 4, 8, 10], '7b9': [0, 1, 4, 7, 10],
  '7#9': [0, 3, 4, 7, 10], 11: [0, 2, 4, 5, 7, 10], '9#11': [0, 2, 4, 6, 7, 10], 13: [0, 2, 4, 5, 7, 9, 10],
  maj7: [0, 4, 7, 11], maj7b5: [0, 4, 6, 11], 'maj7#5': [0, 4, 8, 11], maj9: [0, 2, 4, 7, 11], maj11: [0, 2, 4, 5, 7, 11],
  maj13: [0, 2, 4, 5, 7, 9, 11], m6: [0, 3, 7, 9], m69: [0, 2, 3, 7, 9], m7: [0, 3, 7, 10], m7b5: [0, 3, 6, 10],
  m9: [0, 2, 3, 7, 10], m11: [0, 2, 3, 5, 7, 10], mmaj7: [0, 3, 7, 11], mmaj7b5: [0, 3, 6, 11], mmaj9: [0, 2, 3, 7, 11],
  mmaj11: [0, 2, 3, 5, 7, 11], add9: [0, 2, 4, 7], madd9: [0, 2, 3, 7],
}

// true = every note belongs to the chord (and slash bass is lowest), false = wrong note, null = can't judge
export function positionOk(key, suffix, p) {
  const root = PC[key]
  let allowed
  let bass = null
  if (suffix.includes('/')) {
    const [q, b] = suffix.split('/')
    bass = PC[b]
    allowed = [...(q === 'm' ? INTERVALS.minor : INTERVALS.major), (bass - root + 12) % 12]
  } else allowed = INTERVALS[suffix]
  if (!allowed) return null
  const rel = p.midi.map((m) => (((m - root) % 12) + 12) % 12)
  if (rel.some((x) => !allowed.includes(x))) return false
  if (bass != null) return Math.min(...p.midi) % 12 === bass
  return true
}
