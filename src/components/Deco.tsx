import { useLayoutEffect, useRef, type CSSProperties } from 'react'
import { LAYERS, type DecoItem } from '../data/deco'
import { decoSizes } from '../data/decoSizes'
import { useIsPhone } from '../hooks/useIsPhone'
import { useMotionProfile } from '../hooks/useMotionProfile'

/**
 * A field of decorations for one section.
 *
 * Everything here is static markup plus inline custom properties. The motion is
 * composed in CSS from the shared `--px` / `--py` / `--sy` published by
 * `useAmbientVars`, so a pointer move or a scroll never re-renders this tree.
 *
 * The one measured value is `--sy0`: the scroll position at which this section
 * is centred in the viewport. Scroll parallax is the distance from that point,
 * not the raw `scrollY` - otherwise every section further down the page starts
 * with a large constant offset and its decorations are simply translated off
 * their intended positions. It is written straight to the node rather than held
 * in state, because it changes only on resize and must not re-render 39
 * children when it does.
 *
 * The owning section must be `relative`; this layer fills it and is
 * `pointer-events: none`.
 */
const DecoField = ({ items }: { items: DecoItem[] }) => {
  const { ambient } = useMotionProfile()
  const isPhone = useIsPhone()
  const layerRef = useRef<HTMLDivElement>(null)

  // Layout effect, not effect: `--sy0` has to be on the node before the first
  // paint, or a reload part-way down the page shows one frame of decorations
  // displaced by the full scroll offset.
  useLayoutEffect(() => {
    const node = layerRef.current
    if (!node) return

    const measure = () => {
      const rect = node.getBoundingClientRect()
      const centre = rect.top + window.scrollY + rect.height / 2
      node.style.setProperty('--sy0', `${Math.round(centre - window.innerHeight / 2)}px`)
    }

    measure()

    // Catches viewport resizes and, via the observer, the section growing when
    // text reflows or a font finally lands.
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    window.addEventListener('resize', measure, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  // Dropped from the markup, not just hidden: `display: none` still lets the
  // preload scanner fetch every src.
  const visible = isPhone ? items.filter((item) => item.phone !== false) : items

  return (
    <div ref={layerRef} className="deco-layer" aria-hidden="true">
      {visible.map((item, index) => {
        const size = decoSizes[item.src]
        const layer = LAYERS[item.layer]
        const style = {
          left: item.x,
          right: item.right,
          top: item.y,
          bottom: item.bottom,
          width: item.w,
          opacity: item.opacity,
          '--depth': layer.pointer,
          '--speed': layer.scroll,
          '--dur': item.dur,
          '--delay': item.delay,
          '--dx': item.dx,
          '--dy': item.dy,
          '--r0': item.r0,
          '--r1': item.r1,
        } as CSSProperties

        return (
          <span
            key={`${item.src}-${index}`}
            style={style}
            className={`deco ${ambient ? `deco-${item.kind}` : ''}`}
          >
            <img
              src={`/deco/${item.src}.webp`}
              alt=""
              width={size?.[0]}
              height={size?.[1]}
              // Never eager. These are ornament: if the network is slow the
              // page must still be readable, and the character is the only
              // image worth competing for bandwidth. In-viewport lazy images
              // are fetched immediately anyway.
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </span>
        )
      })}
    </div>
  )
}

export default DecoField
