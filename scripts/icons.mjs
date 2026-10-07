// Builds the app icons: Dream's face on a night-sky square.
import sharp from 'sharp'

const SIZE = 512
const bg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3a3576"/>
      <stop offset="1" stop-color="#7a6db8"/>
    </linearGradient>
  </defs>
  <rect width="${SIZE}" height="${SIZE}" fill="url(#g)"/>
  <path d="M410 70 l7 17 17 7 -17 7 -7 17 -7 -17 -17 -7 17 -7z" fill="#fff3b8"/>
  <path d="M84 110 l5 12 12 5 -12 5 -5 12 -5 -12 -12 -5 12 -5z" fill="#fff3b8"/>
  <circle cx="440" cy="170" r="3" fill="#fff"/>
  <circle cx="70" cy="60" r="2.5" fill="#fff"/>
</svg>`)

// Head + shoulders of the original art (278x381)
const face = await sharp('scripts/src-art/dream-original.png')
  .extract({ left: 0, top: 0, width: 278, height: 234 }) // stop above the teddy bear
  .resize({ width: 440 })
  .toBuffer()
const { height } = await sharp(face).metadata()

const icon = await sharp(bg)
  .composite([{ input: face, left: Math.round((SIZE - 440) / 2), top: SIZE - height }])
  .png()
  .toBuffer()

for (const [file, size] of [['apple-touch-icon.png', 180], ['pwa-192.png', 192], ['pwa-512.png', 512]]) {
  await sharp(icon).resize(size, size).png().toFile('public/' + file)
  console.log('wrote', file)
}
