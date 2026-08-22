import { useRef, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { chibiVariants, type ChibiVariantKey } from '../data/chibi'
import { useGaze } from '../hooks/useGaze'
import { useMotionProfile } from '../hooks/useMotionProfile'

type ChibiProps = {
  variant?: ChibiVariantKey
  /** Pointer parallax weight, as for a decoration. */
  depth?: number
  className?: string
  /** Set on the one instance that is an LCP candidate. */
  priority?: boolean
}

/**
 * A character.
 *
 * Three nested transforms, one job each, because an animation replaces the
 * whole `transform` and they would otherwise fight:
 *   outer  - pointer parallax (composed in CSS from --px/--py)
 *   middle - the idle hover keyframes
 *   inner  - the parts themselves, each with its own swing
 *
 * The eyes sit on top as absolutely positioned sockets. Each socket clips to an
 * ellipse, so however far the gaze pushes a pupil it stays inside the eye.
 */
const Chibi = ({ variant = 'a', depth = 0.85, className = '', priority = false }: ChibiProps) => {
  const { ambient } = useMotionProfile()
  const rig = chibiVariants[variant]
  const ref = useRef<HTMLDivElement>(null)
  const gaze = useGaze(ref, rig.head)

  return (
    <div
      className={`chibi-parallax ${className}`}
      style={{ '--depth': depth } as CSSProperties}
      role="img"
      aria-label={rig.label}
    >
      <div
        className={ambient ? 'chibi-hover' : undefined}
        style={{ '--dur': rig.hover.dur, '--delay': rig.hover.delay } as CSSProperties}
      >
        <motion.div
          ref={ref}
          className="chibi"
          style={{ aspectRatio: rig.aspect, ...(ambient ? gaze : undefined) }}
        >
          {rig.parts.map((part) => (
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
              src={`/${rig.dir}/${part.src}.webp`}
              alt=""
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority && part.src === 'body' ? 'high' : undefined}
              decoding="async"
              draggable={false}
            />
          ))}

          {rig.eyes.map((eye, index) => (
            <span
              key={index}
              className="chibi-eye"
              aria-hidden="true"
              style={
                {
                  left: `${eye.box[0]}%`,
                  top: `${eye.box[1]}%`,
                  width: `${eye.box[2]}%`,
                  height: `${eye.box[3]}%`,
                  // Travel is authored as a share of the socket, but a
                  // percentage inside `translate` resolves against the element
                  // being moved - the pupil - so convert.
                  '--tx': `${(eye.travel[0] / eye.pupil[2]) * 100}%`,
                  '--ty': `${(eye.travel[1] / eye.pupil[3]) * 100}%`,
                } as CSSProperties
              }
            >
              <img
                className="chibi-pupil"
                style={{
                  left: `${eye.pupil[0]}%`,
                  top: `${eye.pupil[1]}%`,
                  width: `${eye.pupil[2]}%`,
                }}
                src={`/${rig.dir}/eye${index === 0 ? 'L' : 'R'}.webp`}
                alt=""
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
              />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Chibi
