import { m, useScroll, useTransform } from 'framer-motion'
import { useIsPhone } from '../hooks/useIsPhone'
import { useMotionProfile } from '../hooks/useMotionProfile'

/**
 * The small character that follows the reader once the hero has scrolled past.
 *
 * A single flat image, not the rig: at 112px wide none of the joint motion is
 * legible, and duplicating the rig would double the decoded bitmaps for a
 * decoration.
 *
 * Purely decorative, so it is dropped entirely when ambient motion is off - a
 * mascot pinned to the corner of a static page is just an obstruction. The
 * whole subtree is aria-hidden; the hero character is what carries the label.
 *
 * Dropped on phones for the same reason: at 320px the figure plus its speech
 * bubble covers an entire link row, and `pointer-events: none` only stops it
 * blocking the tap, not hiding the label.
 */
const BuddyMascot = () => {
  const { ambient } = useMotionProfile()
  const isPhone = useIsPhone()
  const { scrollY } = useScroll()

  // The viewport height is read inside the transform so it stays correct after
  // a resize or an address-bar collapse, without a resize listener.
  const progress = useTransform(scrollY, (y) => {
    const viewport = typeof window === 'undefined' ? 800 : window.innerHeight
    return Math.min(1, Math.max(0, (y - viewport * 0.72) / (viewport * 0.22)))
  })
  const lift = useTransform(progress, [0, 1], [26, 0])

  if (!ambient || isPhone) return null

  return (
    <m.div
      aria-hidden="true"
      style={{ opacity: progress, y: lift, willChange: 'transform, opacity' }}
      className="pointer-events-none fixed bottom-6 right-6 z-40 w-36"
    >
      <span className="absolute -left-1.5 -top-1.5 -translate-x-[86%] whitespace-nowrap rounded-[16px] rounded-bl-[4px] bg-white px-3.5 py-2 text-[11.5px] font-extrabold text-ink shadow-[0_0_0_4px_#fff,0_10px_24px_-14px_rgba(78,100,168,0.6)]">
        見てってね！
      </span>
      <div className="chibi-hover">
        <img
          src="/chibi/buddy.webp"
          alt=""
          width={320}
          height={336}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="w-full"
        />
      </div>
    </m.div>
  )
}

export default BuddyMascot
