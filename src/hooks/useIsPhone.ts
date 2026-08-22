import { useSyncExternalStore } from 'react'

/** Matches Tailwind's `sm` breakpoint from below. */
const PHONE = '(max-width: 639px)'

let query: MediaQueryList | null = null

const getQuery = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return null
  query ??= window.matchMedia(PHONE)
  return query
}

const subscribe = (onChange: () => void) => {
  const media = getQuery()
  if (!media) return () => {}
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

const getSnapshot = () => getQuery()?.matches ?? false

/**
 * True on phone-width viewports.
 *
 * Used to drop roughly half the decorations from the markup entirely. Hiding
 * them with `display: none` would still let the preload scanner find every
 * `src` and pull it down - on the viewport where the bytes hurt most.
 */
export const useIsPhone = () => useSyncExternalStore(subscribe, getSnapshot, () => false)
