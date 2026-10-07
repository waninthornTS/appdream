// Tiny Karplus–Strong plucked-string synth for chord previews.
let ctx

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

const cache = new Map()

function pluckBuffer(ac, midi) {
  const id = `${ac.sampleRate}:${midi}`
  if (cache.has(id)) return cache.get(id)
  const freq = 440 * Math.pow(2, (midi - 69) / 12)
  const sr = ac.sampleRate
  const length = Math.floor(sr * 2.2)
  const buffer = ac.createBuffer(1, length, sr)
  const data = buffer.getChannelData(0)
  const period = Math.round(sr / freq)
  const ring = new Float32Array(period)
  for (let i = 0; i < period; i++) ring[i] = Math.random() * 2 - 1
  let idx = 0
  const decay = 0.996
  for (let i = 0; i < length; i++) {
    const next = (idx + 1) % period
    const v = ring[idx]
    ring[idx] = decay * 0.5 * (ring[idx] + ring[next])
    data[i] = v
    idx = next
  }
  cache.set(id, buffer)
  return buffer
}

export function strum(midiNotes, { gap = 0.045 } = {}) {
  if (!midiNotes?.length) return
  const ac = getCtx()
  const master = ac.createGain()
  master.gain.value = 0.32
  master.connect(ac.destination)
  const t0 = ac.currentTime + 0.02
  midiNotes.forEach((m, i) => {
    const src = ac.createBufferSource()
    src.buffer = pluckBuffer(ac, m)
    const g = ac.createGain()
    const t = t0 + i * gap
    g.gain.setValueAtTime(0.9, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 2)
    src.connect(g).connect(master)
    src.start(t)
    src.stop(t + 2.1)
  })
}

export function pluck(midi) {
  strum([midi], { gap: 0 })
}
