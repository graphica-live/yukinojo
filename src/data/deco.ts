/**
 * Decoration placement.
 *
 * These are the illustrated assets cut out of the supplied sheets. Every value
 * here is static: the component turns them into inline custom properties once,
 * and the motion itself is composed in CSS from `--px` / `--py` / `--sy`
 * (see `useAmbientVars`). Nothing in this file causes a re-render.
 *
 * Coordinates are percentages of the owning section. `x`/`right` and
 * `y`/`bottom` are mutually exclusive - give one of each.
 */

/**
 * Every decoration sits on one of three depth layers, and the layer decides
 * both parallax channels at once.
 *
 * `pointer` is how far it slides under the cursor; `scroll` is how far it lags
 * behind (positive) or leads (negative) the scroll as its section crosses the
 * viewport. Far things lag and barely react, near things lead and react most -
 * the two channels have to agree or the depth cue falls apart, which is why
 * they are one choice here rather than two free numbers per item.
 *
 * `scroll` is deliberately small. Displacement is measured from the moment the
 * section is centred in the viewport, so the excursion is roughly half the
 * section height plus half the viewport - about 900px on a laptop, which these
 * values turn into at most ~110px of travel.
 */
export const LAYERS = {
  far: { pointer: 0.35, scroll: 0.12 },
  mid: { pointer: 0.6, scroll: 0.05 },
  near: { pointer: 0.9, scroll: -0.08 },
} as const

export type DecoLayer = keyof typeof LAYERS

export type DecoItem = {
  /** File stem under /public/deco. */
  src: string
  kind: 'drift' | 'twinkle'
  layer: DecoLayer
  x?: string
  right?: string
  y?: string
  bottom?: string
  /** Rendered width. */
  w: string
  opacity?: number
  dur?: string
  delay?: string
  /** Drift offset at the half-way keyframe. */
  dx?: string
  dy?: string
  /** Rotation at each end of the drift. */
  r0?: string
  r1?: string
  /**
   * Dropped from the markup below 640px. Phones get roughly half the
   * decorations: the same composition at a quarter of the area just reads as
   * noise, and it is the viewport where the transfer cost hurts most.
   */
  phone?: false
}

export const heroDeco: DecoItem[] = [
  { src: 'cloud-1', kind: 'drift', layer: 'far', x: '3%', y: '16%', w: '190px', opacity: 0.85, dur: '15s', dx: '16px', dy: '-26px', r0: '-8deg', r1: '4deg' },
  { src: 'cloud-3', kind: 'drift', layer: 'far', right: '4%', y: '9%', w: '150px', opacity: 0.8, dur: '17s', dx: '-14px', dy: '20px', r0: '6deg', r1: '-4deg' },
  { src: 'cloud-6', kind: 'drift', layer: 'far', x: '12%', bottom: '12%', w: '210px', opacity: 0.75, dur: '19s', dx: '20px', dy: '-16px', r0: '4deg', r1: '-6deg', phone: false },
  { src: 'bubble-xl', kind: 'drift', layer: 'mid', x: '7%', y: '58%', w: '132px', dur: '12s', dx: '-14px', dy: '-24px', r0: '-10deg', r1: '6deg' },
  { src: 'bubble-duo', kind: 'drift', layer: 'mid', right: '9%', y: '62%', w: '96px', dur: '10s', delay: '-3s', dx: '12px', dy: '-30px', r0: '8deg', r1: '-6deg' },
  { src: 'bubble-md', kind: 'drift', layer: 'mid', x: '44%', y: '6%', w: '72px', dur: '9s', delay: '-1.4s', dx: '-10px', dy: '-22px', phone: false },
  { src: 'bubble-sm', kind: 'drift', layer: 'mid', right: '30%', bottom: '14%', w: '60px', dur: '11s', delay: '-5s', dx: '14px', dy: '-26px', phone: false },
  { src: 'plane-blue', kind: 'drift', layer: 'near', right: '16%', y: '18%', w: '150px', dur: '13s', dx: '-18px', dy: '16px', r0: '14deg', r1: '2deg' },
  { src: 'plane-white', kind: 'drift', layer: 'mid', x: '22%', bottom: '22%', w: '104px', dur: '14s', delay: '-4s', dx: '22px', dy: '-14px', r0: '-16deg', r1: '-2deg', phone: false },
  { src: 'glint-3', kind: 'twinkle', layer: 'near', x: '34%', y: '22%', w: '64px', dur: '3.2s' },
  { src: 'glint-1', kind: 'twinkle', layer: 'near', right: '22%', y: '44%', w: '52px', dur: '3.8s', delay: '-1.2s', phone: false },
  { src: 'glint-5', kind: 'twinkle', layer: 'near', x: '16%', y: '34%', w: '44px', dur: '2.9s', delay: '-2s' },
  { src: 'spark-cyan', kind: 'twinkle', layer: 'near', right: '38%', bottom: '26%', w: '56px', dur: '4.2s', delay: '-0.6s', phone: false },
  { src: 'feather-2', kind: 'drift', layer: 'mid', x: '2%', bottom: '30%', w: '120px', opacity: 0.9, dur: '16s', dx: '16px', dy: '-18px', r0: '-14deg', r1: '8deg', phone: false },
  { src: 'feather-5', kind: 'drift', layer: 'far', right: '2%', bottom: '38%', w: '110px', opacity: 0.85, dur: '18s', delay: '-6s', dx: '-16px', dy: '-22px', r0: '20deg', r1: '4deg' },
  { src: 'ribbon-loop', kind: 'drift', layer: 'mid', x: '40%', bottom: '6%', w: '130px', opacity: 0.9, dur: '15s', dx: '-20px', dy: '-14px', r0: '8deg', r1: '-8deg', phone: false },
  { src: 'ribbon-d1', kind: 'drift', layer: 'mid', right: '44%', y: '12%', w: '96px', opacity: 0.9, dur: '12s', delay: '-2.6s', dx: '12px', dy: '20px', r0: '-12deg', r1: '10deg', phone: false },
]

export const profileDeco: DecoItem[] = [
  { src: 'moon-crescent', kind: 'drift', layer: 'far', right: '3%', y: '4%', w: '150px', opacity: 0.85, dur: '16s', dx: '-14px', dy: '-20px', r0: '10deg', r1: '-4deg' },
  { src: 'star-blue', kind: 'drift', layer: 'far', x: '1%', bottom: '8%', w: '120px', opacity: 0.8, dur: '14s', dx: '16px', dy: '-18px', r0: '-8deg', r1: '6deg' },
  { src: 'cloud-4', kind: 'drift', layer: 'mid', x: '6%', y: '2%', w: '96px', opacity: 0.85, dur: '13s', delay: '-3s', dx: '12px', dy: '-22px', r0: '-14deg', r1: '6deg', phone: false },
  { src: 'glint-2', kind: 'twinkle', layer: 'near', right: '16%', bottom: '20%', w: '58px', dur: '3.4s' },
  { src: 'glint-6', kind: 'twinkle', layer: 'near', x: '34%', bottom: '4%', w: '44px', dur: '4.1s', delay: '-1.5s', phone: false },
  { src: 'feather-4', kind: 'drift', layer: 'far', right: '1%', bottom: '2%', w: '130px', opacity: 0.8, dur: '17s', dx: '-16px', dy: '-16px', r0: '6deg', r1: '-10deg', phone: false },
  { src: 'bubble-md', kind: 'drift', layer: 'mid', x: '46%', y: '0%', w: '74px', opacity: 0.85, dur: '11s', delay: '-4s', dx: '14px', dy: '-24px', phone: false },
]

export const contentsDeco: DecoItem[] = [
  { src: 'book-open', kind: 'drift', layer: 'far', x: '2%', y: '2%', w: '170px', opacity: 0.85, dur: '17s', dx: '18px', dy: '-16px', r0: '-6deg', r1: '8deg' },
  { src: 'glint-4', kind: 'twinkle', layer: 'near', right: '6%', y: '12%', w: '60px', dur: '3.6s' },
  { src: 'swoosh-b', kind: 'drift', layer: 'far', right: '1%', bottom: '4%', w: '140px', opacity: 0.8, dur: '15s', dx: '-16px', dy: '-22px', r0: '12deg', r1: '-6deg' },
  { src: 'plane-blue', kind: 'drift', layer: 'mid', right: '12%', y: '0%', w: '120px', opacity: 0.85, dur: '14s', dx: '-12px', dy: '-20px', r0: '-8deg', r1: '8deg', phone: false },
  { src: 'bubble-duo', kind: 'drift', layer: 'mid', x: '8%', bottom: '18%', w: '96px', opacity: 0.85, dur: '12s', delay: '-5s', dx: '16px', dy: '-24px', phone: false },
  { src: 'ribbon-d3', kind: 'drift', layer: 'far', x: '1%', y: '46%', w: '110px', opacity: 0.8, dur: '16s', dx: '14px', dy: '-16px', r0: '14deg', r1: '-6deg', phone: false },
  { src: 'glint-1', kind: 'twinkle', layer: 'near', x: '42%', bottom: '2%', w: '52px', dur: '3.9s', delay: '-0.8s', phone: false },
  { src: 'star-gold', kind: 'drift', layer: 'mid', right: '36%', bottom: '0%', w: '86px', opacity: 0.9, dur: '13s', dx: '-14px', dy: '-18px', r0: '10deg', r1: '-8deg', phone: false },
]

export const linksDeco: DecoItem[] = [
  { src: 'paper-curl-big', kind: 'drift', layer: 'far', right: '4%', y: '6%', w: '160px', opacity: 0.85, dur: '16s', dx: '-18px', dy: '-18px', r0: '8deg', r1: '-6deg' },
  { src: 'heart-gem', kind: 'drift', layer: 'mid', x: '3%', bottom: '10%', w: '110px', opacity: 0.9, dur: '13s', dx: '14px', dy: '-24px', r0: '-10deg', r1: '8deg' },
  { src: 'cloud-2', kind: 'drift', layer: 'far', x: '0%', y: '8%', w: '130px', opacity: 0.8, dur: '15s', dx: '16px', dy: '-18px', r0: '8deg', r1: '-8deg', phone: false },
  { src: 'moon-yellow', kind: 'drift', layer: 'mid', right: '10%', bottom: '6%', w: '104px', opacity: 0.85, dur: '14s', delay: '-4s', dx: '-14px', dy: '-22px', r0: '-12deg', r1: '6deg', phone: false },
  { src: 'glint-3', kind: 'twinkle', layer: 'near', x: '32%', y: '2%', w: '56px', dur: '3.5s' },
  { src: 'spark-pink', kind: 'twinkle', layer: 'near', right: '30%', bottom: '24%', w: '46px', dur: '4.3s', delay: '-2s', phone: false },
  { src: 'bubble-lg', kind: 'drift', layer: 'mid', right: '2%', y: '44%', w: '92px', opacity: 0.85, dur: '12s', delay: '-6s', dx: '-12px', dy: '-26px', phone: false },
]
