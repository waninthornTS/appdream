import guitar from '@tombatossals/chords-db/lib/guitar.json' with { type: 'json' }
import { positionOk } from './chordRules.js'

// chords-db uses "Csharp"/"Fsharp" as object keys but "C#"/"F#" in `keys`
const dbKey = (key) => key.replace('#', 'sharp')

// A few upstream voicings contain notes outside the named chord; drop those,
// and supply hand-checked voicings where nothing valid is left.
const REPLACEMENTS = {
  'C#/11': [{ frets: [-1, 1, 1, 1, 1, 1], fingers: [0, 1, 1, 1, 1, 1], barres: [1], baseFret: 4, midi: [49, 54, 59, 63, 68] }],
  'E/madd9': [{ frets: [0, 2, 4, 0, 0, 0], fingers: [0, 1, 3, 0, 0, 0], barres: [], baseFret: 1, midi: [40, 47, 54, 55, 59, 64] }],
}
for (const list of Object.values(guitar.chords)) {
  for (const chord of list) {
    const valid = chord.positions.filter((p) => positionOk(chord.key, chord.suffix, p) !== false)
    chord.positions = valid.length ? valid : REPLACEMENTS[`${chord.key}/${chord.suffix}`] || []
  }
}

export const KEYS = guitar.keys // ['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B']

export const KEY_ALIASES = {
  'C#': 'C# / Db',
  Eb: 'Eb / D#',
  'F#': 'F# / Gb',
  Ab: 'Ab / G#',
  Bb: 'Bb / A#',
}

export const SUFFIX_INFO = {
  major: { th: 'เมเจอร์', feel: 'สดใส ร่าเริง' },
  minor: { th: 'ไมเนอร์', feel: 'เศร้านิดๆ อบอุ่น' },
  dim: { th: 'ดิมินิช', feel: 'ลึกลับ ตึงเครียด' },
  dim7: { th: 'ดิมินิชเซเวนท์', feel: 'ลุ้นๆ ชวนติดตาม' },
  sus2: { th: 'ซัสทู', feel: 'โปร่ง ลอยๆ' },
  sus4: { th: 'ซัสโฟร์', feel: 'ค้างไว้ รอคลี่คลาย' },
  '7sus4': { th: 'เซเวนท์ซัสโฟร์', feel: 'ค้าง แบบมีสีสัน' },
  '7sg': { th: 'เซเวนท์ (เสียงพิเศษ)', feel: 'แจ๊สซี่' },
  alt: { th: 'อัลเทอร์', feel: 'แจ๊ส ตึงๆ' },
  aug: { th: 'ออกเมนเต็ด', feel: 'ฝันๆ ลอยๆ' },
  6: { th: 'ซิกซ์', feel: 'หวาน วินเทจ' },
  69: { th: 'ซิกซ์ไนน์', feel: 'หวานแบบแจ๊ส' },
  7: { th: 'โดมิแนนท์เซเวนท์', feel: 'บลูส์ อยากไปต่อ' },
  '7b5': { th: 'เซเวนท์แฟลตไฟว์', feel: 'แจ๊ส ตึงๆ' },
  aug7: { th: 'ออกเซเวนท์', feel: 'ลุ้น ตื่นเต้น' },
  9: { th: 'ไนน์', feel: 'ฟังกี้ อบอุ่น' },
  '9b5': { th: 'ไนน์แฟลตไฟว์', feel: 'แจ๊ส' },
  aug9: { th: 'ออกไนน์', feel: 'แจ๊ส' },
  '7b9': { th: 'เซเวนท์แฟลตไนน์', feel: 'ดราม่า' },
  '7#9': { th: 'เซเวนท์ชาร์ปไนน์', feel: 'ร็อก (คอร์ด Hendrix)' },
  11: { th: 'อีเลฟเวนท์', feel: 'กว้าง โมเดิร์น' },
  '9#11': { th: 'ไนน์ชาร์ปอีเลฟเวนท์', feel: 'แจ๊สลอยๆ' },
  13: { th: 'เธอทีนท์', feel: 'แจ๊ส ฟังกี้' },
  maj7: { th: 'เมเจอร์เซเวนท์', feel: 'ละมุน ชิลๆ' },
  maj7b5: { th: 'เมเจอร์เซเวนท์แฟลตไฟว์', feel: 'ลอยๆ' },
  'maj7#5': { th: 'เมเจอร์เซเวนท์ชาร์ปไฟว์', feel: 'ฝันๆ' },
  maj9: { th: 'เมเจอร์ไนน์', feel: 'ละมุนมาก' },
  maj11: { th: 'เมเจอร์อีเลฟเวนท์', feel: 'กว้าง' },
  maj13: { th: 'เมเจอร์เธอทีนท์', feel: 'แจ๊สหรู' },
  m6: { th: 'ไมเนอร์ซิกซ์', feel: 'ลึกลับ วินเทจ' },
  m69: { th: 'ไมเนอร์ซิกซ์ไนน์', feel: 'แจ๊สเหงาๆ' },
  m7: { th: 'ไมเนอร์เซเวนท์', feel: 'นุ่ม ชิล' },
  m7b5: { th: 'ฮาล์ฟดิมินิช', feel: 'เศร้าแบบแจ๊ส' },
  m9: { th: 'ไมเนอร์ไนน์', feel: 'นุ่มละมุน' },
  m11: { th: 'ไมเนอร์อีเลฟเวนท์', feel: 'กว้าง เหงาๆ' },
  mmaj7: { th: 'ไมเนอร์เมเจอร์เซเวนท์', feel: 'หนังสายลับ' },
  mmaj7b5: { th: 'ไมเนอร์เมเจอร์เซเวนท์แฟลตไฟว์', feel: 'ลึกลับ' },
  mmaj9: { th: 'ไมเนอร์เมเจอร์ไนน์', feel: 'ลึกลับ' },
  mmaj11: { th: 'ไมเนอร์เมเจอร์อีเลฟเวนท์', feel: 'ลึกลับ' },
  add9: { th: 'แอดไนน์', feel: 'สดใส ประกายๆ' },
  madd9: { th: 'ไมเนอร์แอดไนน์', feel: 'เศร้าแบบสวยๆ' },
}

export const GROUPS = [
  { id: 'basic', label: 'พื้นฐาน', emoji: '🌱', suffixes: ['major', 'minor', '7', 'm7', 'maj7'] },
  { id: 'sus', label: 'Sus / Add', emoji: '🌸', suffixes: ['sus2', 'sus4', '7sus4', 'add9', 'madd9', '6', 'm6', '69', 'm69'] },
  { id: 'dimaug', label: 'Dim / Aug', emoji: '🍄', suffixes: ['dim', 'dim7', 'm7b5', 'aug', 'aug7', 'mmaj7'] },
  {
    id: 'ext',
    label: 'แจ๊ส / Extended',
    emoji: '🎷',
    suffixes: ['9', 'm9', 'maj9', '11', 'm11', '13', 'maj13', 'maj11', '7b5', '7b9', '7#9', '9b5', 'aug9', '9#11', 'maj7b5', 'maj7#5', 'mmaj7b5', 'mmaj9', 'mmaj11', 'alt', '7sg'],
  },
  { id: 'slash', label: 'Slash', emoji: '🎀', suffixes: guitar.suffixes.filter((s) => s.includes('/')) },
]

export function chordSymbol(key, suffix) {
  if (suffix === 'major') return key
  if (suffix === 'minor') return key + 'm'
  return key + suffix
}

export function suffixLabel(suffix) {
  if (suffix.includes('/')) {
    const [q, bass] = suffix.split('/')
    return `${q === 'm' ? 'ไมเนอร์' : 'เมเจอร์'} เบส ${bass}`
  }
  return SUFFIX_INFO[suffix]?.th || suffix
}

export function getChord(key, suffix) {
  return guitar.chords[dbKey(key)]?.find((c) => c.suffix === suffix)
}

export function chordsForKey(key) {
  return guitar.chords[dbKey(key)] || []
}

export const ALL_CHORDS = KEYS.flatMap((k) => chordsForKey(k).map((c) => ({ key: k, suffix: c.suffix, chord: c })))

const NOTE_NAMES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']
export const midiToName = (m) => NOTE_NAMES[m % 12]

export function chordNotes(position) {
  const seen = []
  for (const m of position.midi || []) {
    const n = midiToName(m)
    if (!seen.includes(n)) seen.push(n)
  }
  return seen
}

// Beginner chords shown on the home page "chord of the day"
export const FRIENDLY = [
  ['C', 'major'], ['G', 'major'], ['D', 'major'], ['A', 'minor'], ['E', 'minor'], ['F', 'major'],
  ['A', 'major'], ['E', 'major'], ['D', 'minor'], ['C', 'maj7'], ['A', 'm7'], ['G', '7'],
  ['D', 'sus4'], ['E', '7'], ['B', 'minor'], ['F', 'maj7'], ['D', 'sus2'], ['A', 'sus2'],
]
