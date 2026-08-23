/**
 * The two characters.
 *
 * `a` is the rigged one: nine PSD layers restacked and merged into five files,
 * with the limbs able to swing (see the commit that introduced the rig for why
 * the restack is safe). `b` had no source layers at all - just a flat render -
 * so its limbs were segmented out of the flat image by color classification,
 * with the holes left behind repaired by inpainting (see scratchpad/build.py).
 * Both variants now carry a full limb rig.
 *
 * Both carry an eye rig. Neither render had an eye layer, so each pupil was cut
 * out and its hole filled harmonically; the pupil rides on a smooth backdrop
 * (a brown disc for `a`, a purple iris for `b`), which is what makes the repair
 * invisible. See scratchpad/build-eyes.mjs.
 *
 * Both also carry a hair part, segmented out of the flat body render by the
 * same color-classification technique as `b`'s limbs, with the hole inpainted.
 * It renders after `body` (topmost) and swings on its own origin near the
 * crown, independently of the head. See scratchpad/build_hair.py.
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
   * Idle drift timing. The two characters are given durations with no common
   * factor so they never fall into step - a pair breathing in sync is the
   * thing that reads as mechanical.
   */
  hover: { dur: string; delay: string }
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
  hover: { dur: '11.3s', delay: '-2.4s' },
  parts: [
    { src: 'legBack' },
    { src: 'legFront', origin: '42.8% 54.6%', amp: 2.6, dur: '5.1s', delay: '-1.8s' },
    { src: 'armBack' },
    { src: 'armFront', origin: '40.6% 40.3%', amp: 3.4, dur: '3.9s', delay: '-1.2s' },
    { src: 'body' },
    { src: 'hair', origin: '58% 20%', amp: 3, dur: '5.4s', delay: '-2.9s' },
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
  hover: { dur: '14.9s', delay: '-8.1s' },
  // armBack (the hand raised near the head) must stay UNDER hair: its cut-out
  // carries a block of hair pixels around the fingers, and the hair layer is
  // what hides it. Rendering it on top exposes the block as a purple slab.
  parts: [
    { src: 'legBack' },
    { src: 'legFront' },
    { src: 'armBack' },
    { src: 'armFront' },
    { src: 'body' },
    { src: 'hair', origin: '65% 10%', amp: 3.4, dur: '4.8s', delay: '-1.4s' },
  ],
  eyes: [
    { box: [55.268, 23.669, 4.713, 5.651], pupil: [29.412, 23.188, 78.431, 79.71], travel: [17.647, 8.696] },
    { box: [69.224, 29.32, 6.654, 5.815], pupil: [26.389, 18.31, 77.778, 60.563], travel: [12.5, 8.451] },
  ],
}

export const chibiVariants = { a: A, b: B } as const
export type ChibiVariantKey = keyof typeof chibiVariants
