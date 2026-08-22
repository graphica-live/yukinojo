import { useLayoutEffect, useRef, type CSSProperties } from 'react'
import { m, useMotionValue, useTransform, type MotionValue } from 'framer-motion'
import { LAYERS, type DecoItem, type DecoLayer } from '../data/deco'
import { decoSizes } from '../data/decoSizes'
import { useAmbient } from '../hooks/useAmbientVars'
import { useIsPhone } from '../hooks/useIsPhone'
import { useMotionProfile } from '../hooks/useMotionProfile'

/** Back to front, which is also the paint order. */
const DEPTHS: DecoLayer[] = ['far', 'mid', 'near']

/**
 * One depth of decorations, moved as a unit.
 *
 * All the decorations on a depth share the same pointer weight and scroll
 * speed, so they share one transform. Writing it here rather than on each
 * decoration is the whole performance story: a `transform` is not inherited,
 * so a frame costs one style recalc per group instead of one per decoration
 * (and, in the original root-custom-property version, one per element on
 * the page).
 */
const DecoGroup = ({
  depth,
  items,
  centre,
}: {
  depth: DecoLayer
  items: DecoItem[]
  centre: MotionValue<number>
}) => {
  const { ambient } = useMotionProfile()
  const { px, py, sy } = useAmbient()
  const { pointer, scroll } = LAYERS[depth]

  const x = useTransform(px, (v) => v * pointer)
  const y = useTransform(
    [py, sy, centre],
    ([pyV, syV, c]: number[]) => pyV * pointer + (syV - c) * scroll,
  )

  return (
    <m.div className="deco-group" style={{ x, y }}>
      {items.map((item, index) => {
        const size = decoSizes[item.src]
        const style = {
          left: item.x,
          right: item.right,
          top: item.y,
          bottom: item.bottom,
          width: item.w,
          opacity: item.opacity,
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
    </m.div>
  )
}

/**
 * A field of decorations for one section.
 *
 * The decorations themselves are static markup: their positions are inline,
 * their idle drift / twinkle is a CSS animation on the <img>. The pointer and
 * scroll parallax comes from the shared MotionValues in `useAmbientVars`, and
 * is applied per DEPTH GROUP (see `DecoGroup`) - so a pointer move or a
 * scroll writes three transforms per section and never re-renders this tree.
 *
 * The one measured value is the scroll position at which this section is
 * centred in the viewport. Scroll parallax is the distance from that point,
 * not the raw `scrollY` - otherwise every section further down the page starts
 * with a large constant offset and its decorations are simply translated off
 * their intended positions. It is a MotionValue rather than state, because it
 * changes only on resize and must not re-render 39 children when it does.
 *
 * The owning section must be `relative`; this layer fills it and is
 * `pointer-events: none`.
 */
const DecoField = ({ items }: { items: DecoItem[] }) => {
  const isPhone = useIsPhone()
  const layerRef = useRef<HTMLDivElement>(null)
  const centre = useMotionValue(0)

  // Layout effect, not effect: the centre has to be known before the first
  // paint, or a reload part-way down the page shows one frame of decorations
  // displaced by the full scroll offset.
  useLayoutEffect(() => {
    const node = layerRef.current
    if (!node) return

    const measure = () => {
      const rect = node.getBoundingClientRect()
      const mid = rect.top + window.scrollY + rect.height / 2
      centre.set(Math.round(mid - window.innerHeight / 2))
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
  }, [centre])

  // Dropped from the markup, not just hidden: `display: none` still lets the
  // preload scanner fetch every src.
  const visible = isPhone ? items.filter((item) => item.phone !== false) : items

  return (
    <div ref={layerRef} className="deco-layer" aria-hidden="true">
      {DEPTHS.map((depth) => {
        const group = visible.filter((item) => item.layer === depth)
        return group.length ? (
          <DecoGroup key={depth} depth={depth} items={group} centre={centre} />
        ) : null
      })}
    </div>
  )
}

export default DecoField
