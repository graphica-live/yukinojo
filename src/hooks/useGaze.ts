import { useEffect, type RefObject } from 'react'
import {
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type MotionStyle,
  type MotionValue,
} from 'framer-motion'
import { useMotionProfile } from './useMotionProfile'

/** `MotionStyle` has no room for custom properties, so they are declared. */
export type GazeStyle = MotionStyle & {
  '--gx': MotionValue<string>
  '--gy': MotionValue<string>
}

/**
 * How far the pointer has to be from the head before the gaze saturates.
 * Scaled to the viewport so the feel is the same on a phone and a monitor.
 */
const reach = () => Math.min(window.innerWidth, window.innerHeight) * 0.46

/** Loose enough to feel alive, damped enough not to jitter on a trackpad. */
const SPRING = { stiffness: 150, damping: 22, mass: 0.6 } as const

/** After a touch ends there is no pointer to follow, so the eyes settle back. */
const RELEASE_MS = 1400

/**
 * Eye tracking for one character.
 *
 * Publishes `--gx` / `--gy` in -1..1 on the element the ref points at; the eye
 * markup underneath multiplies them by its own travel. The value is computed
 * per character from ITS head position, so two characters standing apart both
 * look at the same point rather than both looking the same direction.
 *
 * Unlike the decorative parallax this is NOT gated on a fine pointer: a phone
 * is exactly where following the finger is worth having. Pointer events cover
 * mouse, pen and touch identically, and touchmove keeps firing while a scroll
 * is in progress, which is the case that was asked for.
 */
export const useGaze = (
  ref: RefObject<HTMLElement | null>,
  head: readonly [number, number],
): GazeStyle => {
  const { ambient } = useMotionProfile()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const gx = useSpring(rawX, SPRING)
  const gy = useSpring(rawY, SPRING)

  useEffect(() => {
    if (!ambient) {
      rawX.set(0)
      rawY.set(0)
      return
    }

    let release: ReturnType<typeof setTimeout> | undefined

    const aim = (clientX: number, clientY: number) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (!rect.width) return
      const r = reach()
      const dx = (clientX - (rect.left + rect.width * head[0])) / r
      const dy = (clientY - (rect.top + rect.height * head[1])) / r
      // Clamp to the unit disc rather than per-axis, so a pointer on the
      // diagonal does not push the pupil into the corner of its socket.
      const len = Math.hypot(dx, dy)
      const k = len > 1 ? 1 / len : 1
      rawX.set(dx * k)
      rawY.set(dy * k)
    }

    const onMove = (event: PointerEvent) => {
      clearTimeout(release)
      aim(event.clientX, event.clientY)
      // A finger has no hover state, so once it lifts there is nothing to
      // follow; give it a moment, then look front again.
      if (event.pointerType !== 'mouse') {
        release = setTimeout(() => {
          rawX.set(0)
          rawY.set(0)
        }, RELEASE_MS)
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onMove, { passive: true })
    return () => {
      clearTimeout(release)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
    }
  }, [ambient, head, ref, rawX, rawY])

  return {
    '--gx': useMotionTemplate`${gx}`,
    '--gy': useMotionTemplate`${gy}`,
  }
}
