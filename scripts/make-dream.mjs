// Builds public/dream-guitar.png: Dream (from appforluv) holding a guitar instead of the teddy bear.
// Source art: scripts/src-art/dream-original.png (278x381). Output is 2x for crisp vector parts.
// Tweak placement with GUITAR="x,y,angle,scale" node scripts/make-dream.mjs
import sharp from 'sharp'

const SRC = 'scripts/src-art/dream-original.png'
const OUT = process.env.OUT || 'scripts/src-art/dream-guitar.png'
const S = 2
const W = 278
const H = 381

const [GX, GY, ANGLE, BS] = (process.env.GUITAR || '130,282,55,1.28').split(',').map(Number)
const NECK = Number(process.env.NECK || 78) // visible neck length above the body
const STRUM = (process.env.STRUM || '92,300').split(',').map(Number) // global position
const HAND_T = Number(process.env.HAND_T || 64) // distance of fretting hand from body centre

const BODY =
  'M0 -50 C22 -50 31 -36 29 -22 C28 -12 22 -6 26 4 C44 10 44 52 0 60 C-44 52 -44 10 -26 4 C-22 -6 -28 -12 -29 -22 C-31 -36 -22 -50 0 -50 Z'

const top = -50 * BS // top of the body in local units
const neckTop = top - NECK
const frets = Array.from({ length: 7 }, (_, i) => neckTop + 8 + i * ((NECK - 6) / 7))

const overlay = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W * S}" height="${H * S}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="wood" cx="40%" cy="35%" r="75%">
      <stop offset="0" stop-color="#ffe2b0"/>
      <stop offset="0.55" stop-color="#f2b672"/>
      <stop offset="1" stop-color="#cf8447"/>
    </radialGradient>
    <linearGradient id="neck" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#7a4a30"/>
      <stop offset="0.5" stop-color="#a8714b"/>
      <stop offset="1" stop-color="#7a4a30"/>
    </linearGradient>
    <radialGradient id="skin" cx="40%" cy="35%" r="70%">
      <stop offset="0" stop-color="#ffe6dc"/>
      <stop offset="0.6" stop-color="#f4cbbd"/>
      <stop offset="1" stop-color="#dfa596"/>
    </radialGradient>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="4"/>
    </filter>
  </defs>

  <g transform="translate(${GX} ${GY}) rotate(${ANGLE})">
    <path d="${BODY}" transform="translate(4 7) scale(${BS})" filter="url(#soft)" opacity="0.35" fill="#5a2a35"/>

    <!-- neck + headstock -->
    <rect x="-7" y="${neckTop}" width="14" height="${NECK + 12}" rx="4" fill="url(#neck)"/>
    ${frets.map((y) => `<rect x="-7" y="${y}" width="14" height="1.6" fill="#f3dcc0" opacity="0.8"/>`).join('')}
    <path d="M-11 ${neckTop - 24} C-11 ${neckTop - 30} 11 ${neckTop - 30} 11 ${neckTop - 24} L9 ${neckTop + 2} L-9 ${neckTop + 2} Z" fill="#6a3d26"/>
    ${[20, 12, 4].map((d) => `<circle cx="-13" cy="${neckTop - d}" r="2.6" fill="#fff6e6"/><circle cx="13" cy="${neckTop - d}" r="2.6" fill="#fff6e6"/>`).join('')}

    <!-- body -->
    <g transform="scale(${BS})">
      <path d="${BODY}" fill="url(#wood)" stroke="#b86f3a" stroke-width="2"/>
      <path fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="1.5" d="M0 -45 C18 -45 25 -34 24 -22 M0 -45 C-18 -45 -25 -34 -24 -22"/>
      <ellipse cx="-14" cy="-28" rx="7" ry="12" fill="#fff" opacity="0.28" transform="rotate(-15 -14 -28)"/>
      <circle cx="0" cy="-8" r="13" fill="#d99a5e"/>
      <circle cx="0" cy="-8" r="10.5" fill="#4a2c1d"/>
      <rect x="-15" y="30" width="30" height="7" rx="3.5" fill="#7a4a30"/>
      <path transform="translate(20 22) scale(0.55)" fill="#ff8fb5"
        d="M0 12 C-10 5 -14 0 -14 -5 C-14 -10 -10 -13 -6 -13 C-3 -13 -1 -11 0 -9 C1 -11 3 -13 6 -13 C10 -13 14 -10 14 -5 C14 0 10 5 0 12 Z"/>
    </g>
    ${[-4.5, -1.5, 1.5, 4.5].map((x) => `<line x1="${x}" y1="${neckTop - 2}" x2="${x}" y2="${33 * BS}" stroke="#fffaf0" stroke-width="0.8" opacity="0.9"/>`).join('')}

    <!-- hands: fretting hand on the neck, strumming hand on the body -->
    <ellipse cx="0" cy="${-HAND_T}" rx="11.5" ry="10" fill="url(#skin)"/>
    <path d="M-8 ${-HAND_T - 3} q8 -4 16 0" stroke="#d99a8a" stroke-width="1.2" fill="none" opacity="0.7"/>
    </g>
  <!-- strumming hand where her left arm ends -->
  <ellipse cx="${STRUM[0]}" cy="${STRUM[1]}" rx="11" ry="12" fill="url(#skin)" transform="rotate(-25 ${STRUM[0]} ${STRUM[1]})"/>
</svg>`

// Teddy-bear fur: orange-brown, fairly saturated, not too bright.
const isBear = (r, g, b) => {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const sat = max ? (max - min) / max : 0
  const hue = (60 * (g - b)) / (max - min || 1)
  return max === r && hue > 14 && hue < 42 && sat > 0.4 && max < 175
}

const base = await sharp(SRC).resize(W * S, H * S, { kernel: 'lanczos3' }).png().toBuffer()

// Recolour the bear into dress-pink fabric (keeping its shading) so edges peeking
// out from behind the guitar read as dress, not fur.
const BOX = { x0: 98 * S, x1: 182 * S, y0: 228 * S, y1: 338 * S }
const raw = await sharp(base).raw().toBuffer()
const mask = Buffer.alloc(W * S * H * S)
const fabric = Buffer.alloc(W * S * H * S * 4)
for (let y = BOX.y0; y < BOX.y1; y++) {
  for (let x = BOX.x0; x < BOX.x1; x++) {
    const p = y * W * S + x
    const [r, g, b] = [raw[p * 4], raw[p * 4 + 1], raw[p * 4 + 2]]
    if (isBear(r, g, b)) mask[p] = 255
    const k = Math.min(1.12, Math.max(0.72, 0.62 + (0.3 * r + 0.59 * g + 0.11 * b) / 260))
    fabric[p * 4] = Math.min(255, 206 * k)
    fabric[p * 4 + 1] = Math.min(255, 140 * k)
    fabric[p * 4 + 2] = Math.min(255, 160 * k)
    fabric[p * 4 + 3] = 255
  }
}
const alpha = await sharp(mask, { raw: { width: W * S, height: H * S, channels: 1 } })
  .blur(3)
  .linear(2.2, 0) // grow + feather the mask
  .extractChannel(0)
  .raw()
  .toBuffer()
for (let p = 0; p < alpha.length; p++) fabric[p * 4 + 3] = alpha[p]
const fabricPng = await sharp(fabric, { raw: { width: W * S, height: H * S, channels: 4 } }).png().toBuffer()

await sharp(base)
  .composite([
    { input: fabricPng, top: 0, left: 0 },
    { input: Buffer.from(overlay), top: 0, left: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(OUT)

// Coverage check: teddy-bear-brown pixels of the original that the overlay left (nearly) untouched.
const orig = await sharp(base).raw().toBuffer()
const { data, info } = await sharp(OUT).raw().toBuffer({ resolveWithObject: true })
let left = 0
for (let y = 236 * S; y < 330 * S; y++) {
  for (let x = 104 * S; x < 176 * S; x++) {
    const i = (y * info.width + x) * 4
    // faint shadow on top of fur still reads as bear, so require a real change
    const same = Math.abs(data[i] - orig[i]) + Math.abs(data[i + 1] - orig[i + 1]) + Math.abs(data[i + 2] - orig[i + 2]) < 60
    if (same && isBear(orig[i], orig[i + 1], orig[i + 2])) left++
  }
}
console.log(`wrote ${OUT} (${info.width}x${info.height}); uncovered bear pixels: ${left}`)

// The app loads the smaller WebP; the PNG stays as the editable master.
const webp = 'public/dream-guitar.webp'
await sharp(OUT).webp({ quality: 90, alphaQuality: 100 }).toFile(webp)
console.log(`wrote ${webp}`)
