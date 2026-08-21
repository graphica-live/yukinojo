import { useEffect } from 'react'
import {
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from 'framer-motion'
import { useMotionProfile } from './useMotionProfile'

/**
 * `MotionStyle` does not include arbitrary custom properties, so the three we
 * publish are declared explicitly rather than cast away.
 */
export type AmbientStyle = MotionStyle & {
  '--px': MotionValue<string>
  '--py': MotionValue<string>
  '--sy': MotionValue<string>
}

/**
 * Pointer travel at depth 1, in px. Deliberately small: the character parts
 * carry a 34px glue margin, so as long as the *relative* offset between two
 * parts stays well under that, a joint can never open up.
 */
const POINTER_X = 15
const POINTER_Y = 11

const SPRING = { stiffness: 110, damping: 26, mass: 0.7 } as const

/**
 * Ambient motion input, published as three custom properties on a single node.
 *
 * Roughly fifty elements react to the pointer and to scroll. Subscribing each
 * of them to a MotionValue would mean fifty subscriptions and fifty style
 * writes per frame; putting the values in `useState` would re-render the whole
 * tree on every mouse move. Instead the values land on ONE element as
 * `--px` / `--py` / `--sy`, and each decoration composes its own offset in CSS
 * using its static `--depth` / `--speed`.
 *
 * `--sy` is the raw scroll offset. It is deliberately NOT the final
 * displacement: each decoration layer subtracts its own `--sy0` (the scroll at
 * which that section is centred) so parallax is measured from the section, not
 * from the top of the document. See `Deco.tsx`.
 *
 * Returns a style object to spread onto a `motion.*` element.
 *
 * Note that `useScroll` stays subscribed even when ambient motion is off. It
 * is one document-level scroll listener inside framer-motion, not one per
 * decoration, and unsubscribing would mean mounting/unmounting this hook's
 * owner - so the value is pinned to 0 instead.
 */
export const useAmbientVars = (): AmbientStyle => {
  const { ambient, pointerFine } = useMotionProfile()
  const pointerEnabled = ambient && pointerFine

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const px = useSpring(rawX, SPRING)
  const py = useSpring(rawY, SPRING)

  useEffect(() => {
    if (!pointerEnabled) {
      // Settle back to neutral rather than freezing wherever the pointer left.
      rawX.set(0)
      rawY.set(0)
      return
    }

    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth - 0.5) * 2 * POINTER_X)
      rawY.set((event.clientY / window.innerHeight - 0.5) * 2 * POINTER_Y)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [pointerEnabled, rawX, rawY])

  const { scrollY } = useScroll()
  // Pinned to 0 when ambient motion is off, so the decorations sit exactly
  // where the markup places them.
  const scrollOffset = useTransform(scrollY, (value) => (ambient ? value : 0))

  const pxVar = useMotionTemplate`${px}px`
  const pyVar = useMotionTemplate`${py}px`
  const syVar = useMotionTemplate`${scrollOffset}px`

  return {
    '--px': pxVar,
    '--py': pyVar,
    '--sy': syVar,
  }
}
