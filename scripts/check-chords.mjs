// Sanity-check the chord data the app actually serves.
import { ALL_CHORDS } from '../src/data/chords.js'
import { positionOk } from '../src/data/chordRules.js'
const open = [40, 45, 50, 55, 59, 64]
let n = 0, bad = 0, empty = 0
for (const { key, suffix, chord } of ALL_CHORDS) {
  if (!chord.positions.length) { empty++; console.log('EMPTY', key, suffix) }
  for (const p of chord.positions) {
    n++
    const midi = p.frets.map((f, i) => (f < 0 ? null : f === 0 ? open[i] : open[i] + f + p.baseFret - 1)).filter((x) => x != null)
    if (JSON.stringify(midi) !== JSON.stringify(p.midi) || positionOk(key, suffix, p) === false) { bad++; console.log('BAD', key, suffix, JSON.stringify(p)) }
  }
}
console.log({ chords: ALL_CHORDS.length, positions: n, bad, empty })
