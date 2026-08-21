import type { CSSProperties } from 'react'
import { useMotionProfile } from '../hooks/useMotionProfile'

/**
 * The character rig.
 *
 * The source PSD splits the character into mutually exclusive layers - a
 * cut-out with zero overlap, and therefore zero glue margin. Rotating a part
 * straight out of that PSD exposes the background at every joint.
 *
 * `scratchpad/build-rig.mjs` fixes that in the assets themselves:
 *
 *   1. The stacking order was rebuilt so every moving part sits UNDER the
 *      body. Because the original layers never overlapped, the reordered
 *      stack is identical to the flattened artwork (verified: 0.03% of pixels
 *      differ, all of them on the antialiased outline).
 *   2. Each moving part's outline was pushed out by up to 34px, but only into
 *      the area the covering layers occupy. Invisible at rest, it plugs the
 *      hole once the part rotates.
 *   3. Each joint was measured as the centroid of the seam between a part and
 *      its parent, rather than eyeballed.
 *   4. Parts that only ever move together were flattened into one file, so the
 *      browser holds five decoded bitmaps instead of nine.
 *
 * `body` (torso + head + hat) does not rotate: those seams - a 522x173px neck
 * and a 653x256px hat brim - are far too long to hide behind a 34px margin.
 * The whole figure tilts on `.chibi-hover` instead.
 */
type RigPart = {
  src: string
  /** transform-origin, measured from the seam. */
  origin?: string
  /** Rotation amplitude in degrees. */
  amp?: number
  dur?: string
  delay?: string
}

const RIG: RigPart[] = [
  // Bottom to top. A leg and its shoe are one file: splitting them at the
  // ankle would open a hole there for the same reason as the shoulder.
  { src: 'legBack', origin: '57.5% 67%', amp: 2, dur: '5.7s', delay: '-3s' },
  { src: 'legFront', origin: '42.8% 54.6%', amp: 2.6, dur: '5.1s', delay: '-1.8s' },
  { src: 'armBack', origin: '64.5% 52.3%', amp: 4, dur: '4.7s', delay: '-2.4s' },
  { src: 'armFront', origin: '40.6% 40.3%', amp: 3.4, dur: '3.9s', delay: '-1.2s' },
  { src: 'body' },
]

type ChibiProps = {
  /** Pointer-parallax weight for the whole figure. 0 disables it. */
  depth?: number
  className?: string
}

/**
 * The hero character. Announced as an image, because on this page the
 * character *is* the portrait.
 */
const Chibi = ({ depth = 0.85, className = '' }: ChibiProps) => {
  const { ambient } = useMotionProfile()

  return (
    <div
      className={`chibi-parallax ${className}`}
      style={{ '--depth': depth } as CSSProperties}
      role="img"
      aria-label="ゆきのじょーのキャラクター"
    >
      <div className={ambient ? 'chibi-hover' : undefined}>
        <div className="chibi">
          {RIG.map((part) => (
            <img
              key={part.src}
              className={`chibi-part ${part.origin && ambient ? 'chibi-swing' : ''}`}
              style={
                {
                  '--o': part.origin,
                  '--a': part.amp == null ? undefined : `${part.amp}deg`,
                  '--dur': part.dur,
                  '--delay': part.delay,
                } as CSSProperties
              }
              src={`/chibi/${part.src}.webp`}
              alt=""
              loading="eager"
              decoding="async"
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Chibi
