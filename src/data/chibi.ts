/**
 * The two characters.
 *
 * `a` is the rigged one: nine PSD layers restacked and merged into five files,
 * with the limbs able to swing (see the commit that introduced the rig for why
 * the restack is safe). `b` is a flat render with no layer separation, so it
 * gets no limb motion - only the whole-figure hover.
 *
 * Both carry an eye rig. Neither render had an eye layer, so each pupil was cut
 * out and its hole filled harmonically; the pupil rides on a smooth backdrop
 * (a brown disc for `a`, a purple iris for `b`), which is what makes the repair
 * invisible. See scratchpad/build-eyes.mjs.
 */

export type RigPart = {
  /** File stem under the variant's directory. */
  src: string
  /** transform-origin, measured from the seam between this part and its parent. */
  origin?: string
  /** Swing amplitude in degrees. */
  amp?: number
  dur?: string
  delay?: string
}

export type EyeRig = {
  /**
   * The socket: the smooth region the pupil travels inside, as
   * [left, top, width, height] in % of the character box. The pupil is clipped
   * to an ellipse inscribed in it, so it can never spill onto the skin.
   */
  box: [number, number, number, number]
  /** The pupil sprite at rest, as [left, top, width, height] in % of the socket. */
  pupil: [number, number, number, number]
  /** Travel at full gaze, as [x, y] in % of the socket. */
  travel: [number, number]
}

export type ChibiVariant = {
  /** Directory under /public. */
  dir: string
  /** Intrinsic aspect ratio of every layer in this variant. */
  aspect: string
  label: string
  parts: RigPart[]
  eyes: EyeRig[]
  /**
   * Where the head sits in the character box, as [x, y] fractions. Gaze is
   * measured from here, so two characters on opposite sides of the screen
   * converge on the pointer instead of both looking the same way.
   */
  head: [number, number]
}

const A: ChibiVariant = {
  dir: 'chibi',
  aspect: '1223/1286',
  label: 'ゆきのじょーのキャラクター',
  head: [0.6, 0.28],
  parts: [
    { src: 'legBack', origin: '57.5% 67%', amp: 2, dur: '5.7s', delay: '-3s' },
    { src: 'legFront', origin: '42.8% 54.6%', amp: 2.6, dur: '5.1s', delay: '-1.8s' },
    { src: 'armBack', origin: '64.5% 52.3%', amp: 4, dur: '4.7s', delay: '-2.4s' },
    { src: 'armFront', origin: '40.6% 40.3%', amp: 3.4, dur: '3.9s', delay: '-1.2s' },
    { src: 'body' },
  ],
  eyes: [
    { box: [50.859, 24.417, 6.95, 6.765], pupil: [15.294, 11.494, 72.941, 79.31], travel: [11.765, 9.195] },
    { box: [65.495, 29.316, 6.705, 7.076], pupil: [12.195, 12.088, 73.171, 75.824], travel: [12.195, 8.791] },
  ],
}

const B: ChibiVariant = {
  dir: 'chibi-b',
  aspect: '1082/1221',
  label: 'ゆきのじょーのキャラクター（デニム）',
  head: [0.62, 0.28],
  parts: [{ src: 'body' }],
  eyes: [
    { box: [55.268, 23.669, 4.713, 5.651], pupil: [29.412, 23.188, 78.431, 79.71], travel: [17.647, 8.696] },
    { box: [69.224, 29.32, 6.654, 5.815], pupil: [26.389, 18.31, 77.778, 60.563], travel: [12.5, 8.451] },
  ],
}

export const chibiVariants = { a: A, b: B } as const
export type ChibiVariantKey = keyof typeof chibiVariants
