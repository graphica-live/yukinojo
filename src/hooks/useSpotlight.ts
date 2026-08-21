import type { PointerEvent as ReactPointerEvent } from 'react'
import { useMotionTemplate, useMotionValue } from 'framer-motion'

/**
 * Pointer-tracked highlight for cards.
 *
 * Position is held in motion values, never in React state - state would
 * re-render the tree on every pointer frame and collapse on mobile.
 */
export const useSpotlight = (enabled = true) => {
  const x = useMotionValue(-9999)
  const y = useMotionValue(-9999)
  const opacity = useMotionValue(0)

  const background = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgba(61, 225, 255, 0.16), transparent 68%)`

  const handlers = enabled
    ? {
        onPointerMove: (event: ReactPointerEvent<HTMLElement>) => {
          const rect = event.currentTarget.getBoundingClientRect()
          x.set(event.clientX - rect.left)
          y.set(event.clientY - rect.top)
          opacity.set(1)
        },
        onPointerLeave: () => opacity.set(0),
      }
    : {}

  return { handlers, spotlightStyle: { background, opacity } }
}
