import { useRef } from 'react'
import { m, useScroll, useSpring, useTransform, type Variants } from 'framer-motion'
import Chibi from './Chibi'
import DecoField from './Deco'
import { heroDeco } from '../data/deco'
import { useMotionProfile } from '../hooks/useMotionProfile'

/**
 * Weight behind the exit.
 *
 * Mapping scroll straight onto position makes the pair feel welded to the
 * wheel. Running the progress through a spring first gives them mass: they lag
 * a fast scroll, keep going for a moment after it stops, and settle back rather
 * than halting dead.
 */
const INERTIA = { stiffness: 58, damping: 16, mass: 1.15 } as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

/**
 * Mount entrance for the pair - each walks in from its own side rather than
 * appearing already in place. Lives on a wrapper OUTSIDE the scroll-exit
 * `motion.div` (see the placement/exit comment below): that node's `x` is
 * already driven by a scroll-linked MotionValue, and Framer Motion would drop
 * one of the two `x` sources if they shared a node.
 */
const enterLeft: Variants = {
  hidden: { x: '-38%', opacity: 0 },
  visible: { x: '0%', opacity: 1, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
}

const enterRight: Variants = {
  hidden: { x: '38%', opacity: 0 },
  visible: {
    x: '0%',
    opacity: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.12 },
  },
}

/*
 * Two arrangements of the same three elements.
 *
 * `staged` is the one the page opens on: the pair dead centre, filling the
 * screen, with the copy behind them and the badge/heading cut in BETWEEN
 * them - the left character behind it, the right one in front. That sandwich
 * is the whole reason the three read as one scene with depth rather than as
 * a stack.
 *
 * It is why the copy carries no z-index here. An index would make the block a
 * stacking context and trap the badge/heading inside it, below both
 * characters; without one, their own z-30 competes directly with the two
 * character layers, and the rest of the copy still paints underneath them
 * (auto-index content is drawn before any positive index).
 *
 * `still` is what runs when ambient motion is off (reduced-motion, or the
 * TikTok webview). Nothing moves there, so a pair parked over the copy would
 * cover it for good. They go back to flanking it, the copy takes a reserve at
 * the foot to stand them in below `lg`, and the copy comes back out on top -
 * one context above both characters.
 *
 * Both are plain placement; the exit transform always lives on the child, since
 * Framer Motion writes the whole `transform` inline and the two cannot share a
 * node.
 */
const LAYOUT = {
  staged: {
    copy: '',
    rightZ: 'z-40',
    left:
      'left-1/2 top-1/2 w-[88%] -translate-x-[88%] -translate-y-[42%] ' +
      'sm:w-[64%] lg:w-[47%] lg:-translate-x-[92%] lg:-translate-y-[44%]',
    right:
      'left-1/2 top-1/2 w-[100%] -translate-x-[18%] -translate-y-[50%] ' +
      'sm:w-[74%] lg:w-[52%] lg:-translate-x-[10%] lg:-translate-y-[50%]',
  },
  still: {
    copy: 'z-30 pb-[56vw] sm:pb-[44vw] lg:pb-0',
    rightZ: 'z-20',
    left: 'bottom-0 left-[-14%] w-[54%] sm:left-[-10%] sm:w-[46%] lg:bottom-auto lg:left-[-9%] lg:top-[1%] lg:w-[47%]',
    right:
      'bottom-[2%] right-[-20%] w-[68%] sm:right-[-12%] sm:w-[56%] lg:bottom-auto lg:right-[-14%] lg:top-[-6%] lg:w-[48%]',
  },
} as const

const HeroSection = () => {
  // `animate` (mount) rather than `reveal` (whileInView): the hero is above the
  // fold, so it must never depend on an IntersectionObserver callback.
  const { animate, ambient } = useMotionProfile()
  const sectionRef = useRef<HTMLElement>(null)

  /*
   * The two characters part as the hero scrolls away and close back in on the
   * way up. Progress runs over exactly one hero height - `end start` is the
   * moment the section's bottom edge reaches the top of the viewport - so they
   * are fully clear by the time the next section owns the screen.
   *
   * Nothing here is linear or symmetric, on purpose. The spring supplies the
   * weight; the four-stop curves make each character hesitate before it goes;
   * and the two are given different stops, different drift and different tilt
   * so they read as two people leaving rather than one mechanism opening.
   *
   * This lives on a wrapper OUTSIDE `.chibi-parallax`: that element already
   * owns a transform for pointer parallax, and the two would overwrite each
   * other on the same node.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const raw = useTransform(scrollYProgress, (v) => (ambient ? v : 0))
  const part = useSpring(raw, INERTIA)

  /*
   * The pair own the screen on open, so they also have to get out of the way
   * fast - the copy underneath them is unreadable until they do. Every curve
   * below finishes at 0.19 of one hero height, around 160px on a phone. That
   * is the largest exit the copy can afford: any further and the badge at the
   * top of the block has slid under the sticky nav by the time the pair are
   * clear. The stops inside the range are still uneven per character, so the
   * two leave at different moments rather than as one mechanism.
   */
  const EXIT = 0.19

  const leftX = useTransform(part, [0, 0.05, 0.12, EXIT], ['0%', '-10%', '-58%', '-152%'])
  const leftY = useTransform(part, [0, 0.1, EXIT], ['0%', '3.5%', '-8%'])
  const leftTilt = useTransform(part, [0, 0.08, EXIT], [0, -3.5, -17])

  const rightX = useTransform(part, [0, 0.04, 0.13, EXIT], ['0%', '5%', '50%', '140%'])
  const rightY = useTransform(part, [0, 0.09, EXIT], ['0%', '-4.5%', '7%'])
  const rightTilt = useTransform(part, [0, 0.11, EXIT], [0, 4.5, 13])

  const layout = ambient ? LAYOUT.staged : LAYOUT.still

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[92dvh] items-center overflow-hidden px-4 pb-6 pt-24 sm:px-6 lg:px-8"
    >
      <DecoField items={heroDeco} />

      {/*
        One stage rather than three columns. The copy and the pair occupy the
        same box and overlap inside it, which is what makes them read as a
        single scene - side by side in their own cells, they read as a title
        with two illustrations parked next to it.
      */}
      <div className="relative mx-auto w-full max-w-6xl">
        {/*
          With the pair staged, the copy sits between and under them. Badge and
          logotype take z-30 - clear of the left character, still behind the
          right one - and everything below the name (meta line, buttons) stays
          under both, so the characters own the screen on open. A couple of
          hundred pixels of scroll clears them and the whole block reads in one
          screen. Both character layers are `pointer-events-none`, so the
          buttons are tappable even while covered.
        */}
        <m.div
          variants={animate ? stagger : undefined}
          initial={animate ? 'hidden' : false}
          animate={animate ? 'visible' : undefined}
          className={`relative max-w-[30rem] lg:mx-auto lg:max-w-[34rem] lg:text-center ${layout.copy}`}
        >
          {/*
            Rides the same plane as the heading - in front of the left
            character, behind the right one - so the two pieces of the lockup
            are not split across the pair.
          */}
          <m.span
            variants={animate ? fadeUp : undefined}
            className="relative z-30 inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 pl-3 text-xs font-bold text-ink-soft shadow-[0_0_0_5px_rgba(255,255,255,0.75),0_10px_24px_-14px_rgba(78,100,168,0.6)]"
          >
            <span
              aria-hidden="true"
              className={`h-2.5 w-2.5 rounded-full bg-rose shadow-[0_0_0_4px_rgba(255,127,182,0.24)] ${
                ambient ? 'deco-twinkle' : ''
              }`}
              style={{ ['--dur' as string]: '2s' }}
            />
            ライブ配信 ／ SE14年 ／ 元ホスト5年
          </m.span>

          {/*
            The heading is lifted out of the copy's paint order and dropped
            between the two characters (see LAYOUT). z-30 is read against the
            character layers' z-20 / z-40, not against its siblings here - the
            copy block deliberately has no index of its own. The name logotype
            that used to fill this heading is gone; the pair now carry the
            visual weight on their own, so this is just the kicker line.
          */}
          <m.h1
            variants={animate ? fadeUp : undefined}
            className="title-cut relative z-30 mt-5 font-display text-[clamp(0.72rem,1.6vw,0.92rem)] font-extrabold uppercase leading-[1.7] tracking-[0.12em] text-ink-faint"
          >
            High Quality × Entertainment × Engineering
          </m.h1>

          {/*
            Silent spacer, exactly the height the two-line name used to take up
            (same clamp() as the old logotype, doubled for two lines). LAYOUT's
            `top-1/2` anchors are measured against this block's flow height, so
            deleting the name without replacing its height would drag the pair
            up and over the meta line and buttons below.
          */}
          <div aria-hidden="true" style={{ height: 'clamp(5.64rem, 15.792vw, 10.528rem)' }} />

          <m.p
            variants={animate ? fadeUp : undefined}
            className="title-cut mt-7 text-[13.5px] text-ink-soft"
          >
            TikTok LIVER × System Engineer ／{' '}
            <b className="font-display font-bold text-grape">2025.01.18</b> 活動開始
          </m.p>

          <m.div
            variants={animate ? fadeUp : undefined}
            className="relative z-30 mt-8 flex flex-wrap gap-3.5 lg:justify-center"
          >
            <a
              href="#opening-branch"
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-cta-from to-cta-to px-7 py-4 text-[15px] font-bold leading-none text-white shadow-[0_0_0_4px_rgba(255,255,255,0.9),0_14px_26px_-12px_rgba(91,63,217,0.8)] transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.03]"
            >
              提供サービスを見る
            </a>
          </m.div>
        </m.div>

        {/*
          The pair, laid over the title zone - one layer EACH, with the
          badge/heading's z-30 running between them. A single shared layer
          would put both characters on the same plane and there would be
          nothing for the copy to sit inside.

          `pointer-events-none` on both: a limb crossing in front of a link must
          never make it untappable, and neither character has any interaction of
          its own - the gaze reads pointer events off `window`.

          Placement and exit are on separate elements. Framer Motion writes the
          whole `transform` inline, so a Tailwind `translate-*` utility on the
          same node would be silently dropped; the offsets here are all `top` /
          `left` / `right` / `bottom` for that reason.
        */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <div className={`absolute ${layout.left}`}>
            <m.div
              variants={animate ? enterLeft : undefined}
              initial={animate ? 'hidden' : false}
              animate={animate ? 'visible' : undefined}
            >
              <m.div style={{ x: leftX, y: leftY, rotate: leftTilt, willChange: 'transform' }}>
                <Chibi variant="a" depth={0.9} priority />
              </m.div>
            </m.div>
          </div>
        </div>

        {/*
          Deliberately not a mirror of the other: bigger, seated, hung higher,
          and now nearest the viewer as well, so the pair does not read as a
          symmetrical badge.
        */}
        <div className={`pointer-events-none absolute inset-0 ${layout.rightZ}`}>
          <div className={`absolute ${layout.right}`}>
            <m.div
              variants={animate ? enterRight : undefined}
              initial={animate ? 'hidden' : false}
              animate={animate ? 'visible' : undefined}
            >
              <m.div style={{ x: rightX, y: rightY, rotate: rightTilt, willChange: 'transform' }}>
                <Chibi variant="b" depth={0.7} priority />
              </m.div>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
