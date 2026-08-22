import { createContext, useContext, useEffect, useMemo } from 'react'
import { useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useMotionProfile } from './useMotionProfile'

/** Pointer offset (px, spring-smoothed) and raw scroll offset (px). */
export type AmbientValues = {
  px: MotionValue<number>
  py: MotionValue<number>
  sy: MotionValue<number>
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
 * Ambient motion input: one pointer spring and one scroll listener for the
 * whole page, shared through `AmbientContext` as three MotionValues.
 *
 * Roughly fifty elements react to the pointer and to scroll. Putting the
 * values in `useState` would re-render the whole tree on every mouse move, and
 * giving each element its own subscription would mean fifty style writes per
 * frame. Instead the consumers (`DecoField`, `Chibi`) derive a `transform` per
 * DEPTH GROUP with `useTransform` - three groups per section plus one per
 * character, about fourteen nodes in all - and the decorations inside a group
 * are plain static markup.
 *
 * This used to be published as custom properties (`--px` / `--py` / `--sy`) on
 * the page root, with each decoration composing its own offset in CSS. That
 * was elegant but expensive: changing an inherited custom property recalcs
 * style for every descendant, so every pointer and scroll frame re-resolved
 * the entire document (~350 elements, ~4.5ms). Scoping the properties to the
 * decoration layers still re-resolved ~100. A `transform` is not inherited, so
 * writing it to a group node costs exactly one element.
 *
 * `sy` is the raw scroll offset. It is deliberately NOT the final
 * displacement: each decoration layer subtracts its own centre (the scroll at
 * which that section is centred) so parallax is measured from the section, not
 * from the top of the document. See `Deco.tsx`.
 *
 * Note that `useScroll` stays subscribed even when ambient motion is off. It
 * is one document-level scroll listener inside framer-motion, not one per
 * decoration, and unsubscribing would mean mounting/unmounting this hook's
 * owner - so the value is pinned to 0 instead.
 */
export const useAmbientVars = (): AmbientValues => {
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
  const sy = useTransform(scrollY, (value) => (ambient ? value : 0))

  // Stable reference: the MotionValues never change identity, so context
  // consumers only re-render when the provider itself does.
  return useMemo(() => ({ px, py, sy }), [px, py, sy])
}

export const AmbientContext = createContext<AmbientValues | null>(null)

/**
 * The shared ambient values. Outside the provider they are all a constant 0,
 * so a consumer rendered on its own is simply static.
 */
export const useAmbient = (): AmbientValues => {
  const ctx = useContext(AmbientContext)
  const zero = useMotionValue(0)
  return useMemo(() => ctx ?? { px: zero, py: zero, sy: zero }, [ctx, zero])
}
