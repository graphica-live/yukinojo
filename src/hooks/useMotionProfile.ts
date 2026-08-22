import { useSyncExternalStore } from 'react'
import { useReducedMotion } from 'framer-motion'
import { shouldUseLowEffectsMode } from '../utils/browser'

export type MotionProfile = {
  /**
   * TikTok / ByteDance in-app webview. These renderers choke on
   * backdrop-filter, mix-blend-mode and large blur radii; the combination
   * previously rendered the whole page black.
   */
  lowEffects: boolean
  /** OS-level "reduce motion" preference. */
  reducedMotion: boolean
  /** Device actually has a hovering, precise pointer (i.e. a real mouse). */
  pointerFine: boolean
  /**
   * Mount animations, driven by `initial`/`animate`. These always run to
   * completion once React has rendered, so they cannot strand content.
   */
  animate: boolean
  /**
   * Scroll reveals, driven by `whileInView`. Visibility depends on an
   * IntersectionObserver callback firing, so these are disabled in the in-app
   * webview - a missed callback there would leave a section permanently
   * invisible, which is the failure class this page has already hit once.
   */
  reveal: boolean
  /**
   * Continuous or compositing-heavy effects: parallax, infinite loops, grain,
   * scanlines. Off on both degradation axes.
   */
  ambient: boolean
  /** Pointer-tracked highlights. Desktop-only on top of `ambient`. */
  spotlight: boolean
}

const FINE_POINTER = '(hover: hover) and (pointer: fine)'

let pointerQuery: MediaQueryList | null = null

const getPointerQuery = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return null
  pointerQuery ??= window.matchMedia(FINE_POINTER)
  return pointerQuery
}

const subscribePointer = (onChange: () => void) => {
  const query = getPointerQuery()
  if (!query) return () => {}
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

const getPointerSnapshot = () => getPointerQuery()?.matches ?? false

/**
 * Single source of truth for the degradation axes. The axes are independent:
 * either one alone must still produce a complete, readable page.
 */
export const useMotionProfile = (): MotionProfile => {
  const reducedMotion = useReducedMotion() ?? false
  const pointerFine = useSyncExternalStore(subscribePointer, getPointerSnapshot, () => false)

  // Derived from the user agent, so it is stable for the whole session.
  const lowEffects = shouldUseLowEffectsMode()

  const animate = !reducedMotion
  const ambient = !reducedMotion && !lowEffects

  return {
    lowEffects,
    reducedMotion,
    pointerFine,
    animate,
    reveal: ambient,
    ambient,
    spotlight: ambient && pointerFine,
  }
}

/**
 * Scroll reveal props that fail safe.
 *
 * When motion is off we pass `initial={false}` rather than leaving an
 * `initial="hidden"` variant in place, so content can never get stranded at
 * opacity 0 if the viewport callback never fires.
 */
export const revealProps = (animate: boolean) =>
  animate
    ? ({
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.15 },
      } as const)
    : ({ initial: false } as const)
