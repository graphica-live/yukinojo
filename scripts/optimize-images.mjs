/**
 * Generates the responsive hero portrait set and the social card from the
 * original 4608x4608 master.
 *
 * The master is ~1.9MB, which is far too heavy to be the LCP image for an
 * audience arriving on mobile data from TikTok. Run with:
 *
 *   node scripts/optimize-images.mjs
 */
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const master = path.join(root, 'public/images/hero-profile.webp')
const outDir = path.join(root, 'public/images')

const widths = [480, 768, 1080]

await mkdir(outDir, { recursive: true })

for (const width of widths) {
  await sharp(master)
    .resize(width, width, { fit: 'cover' })
    .webp({ quality: 78, effort: 6 })
    .toFile(path.join(outDir, `portrait-${width}.webp`))

  await sharp(master)
    .resize(width, width, { fit: 'cover' })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(outDir, `portrait-${width}.jpg`))
}

// Social card. 1200x630 with the square portrait offset to the right over the
// page's ink background, leaving room for the title text baked in by the
// platform preview.
const portrait = await sharp(master)
  .resize(560, 560, { fit: 'cover' })
  .toBuffer()

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 3,
    background: '#08080c',
  },
})
  .composite([{ input: portrait, top: 35, left: 600 }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(outDir, 'og-cover.jpg'))

console.log('done')
