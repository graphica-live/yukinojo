import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, type Variants } from 'framer-motion'
import { ArrowUpRight } from '@phosphor-icons/react'
import Chibi from './Chibi'
import DecoField from './Deco'
import { heroDeco } from '../data/deco'
import { useMotionProfile } from '../hooks/useMotionProfile'

const NAME_TOP = 'ゆきの'
const NAME_BOTTOM = 'じょー'

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

/*
 * Two arrangements of the same three elements.
 *
 * `staged` is the one the page opens on: the pair dead centre, filling the
 * screen, with the copy behind them. It only works because they leave - the
 * title is unreadable until they do.
 *
 * `still` is what runs when ambient motion is off (reduced-motion, or the
 * TikTok webview). Nothing moves there, so a pair parked over the copy would
 * cover it for good. They go back to flanking it, the copy takes a reserve at
 * the foot to stand them in below `lg`, and the copy comes back out on top.
 *
 * Both are plain placement; the exit transform always lives on the child, since
 * Framer Motion writes the whole `transform` inline and the two cannot share a
 * node.
 */
const LAYOUT = {
  staged: {
    copy: 'z-20',
    left:
      'left-1/2 top-1/2 w-[88%] -translate-x-[88%] -translate-y-[42%] ' +
      'sm:w-[64%] lg:w-[47%] lg:-translate-x-[92%] lg:-translate-y-[44%]',
    right:
      'left-1/2 top-1/2 w-[100%] -translate-x-[18%] -translate-y-[50%] ' +
      'sm:w-[74%] lg:w-[52%] lg:-translate-x-[10%] lg:-translate-y-[50%]',
  },
  still: {
    copy: 'z-30 pb-[56vw] sm:pb-[44vw] lg:pb-0',
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
      className="relative flex min-h-[100dvh] items-center overflow-hidden px-4 pb-10 pt-24 sm:px-6 lg:px-8"
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
          With the pair staged, the copy sits UNDER them: on open the characters
          own the screen and the title is backing for them, and a couple of
          hundred pixels of scroll clears them so the whole block - name, both
          lines, both buttons - is readable in one screen. The layer above is
          `pointer-events-none`, so the buttons are tappable even while covered.
        */}
        <motion.div
          variants={animate ? stagger : undefined}
          initial={animate ? 'hidden' : false}
          animate={animate ? 'visible' : undefined}
          className={`relative max-w-[30rem] lg:mx-auto lg:max-w-[34rem] lg:text-center ${layout.copy}`}
        >
          <motion.span
            variants={animate ? fadeUp : undefined}
            className="inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 pl-3 text-xs font-bold text-ink-soft shadow-[0_0_0_5px_rgba(255,255,255,0.75),0_10px_24px_-14px_rgba(78,100,168,0.6)]"
          >
            <span
              aria-hidden="true"
              className={`h-2.5 w-2.5 rounded-full bg-rose shadow-[0_0_0_4px_rgba(255,127,182,0.24)] ${
                ambient ? 'deco-twinkle' : ''
              }`}
              style={{ ['--dur' as string]: '2s' }}
            />
            毎日 6〜8時間 配信中 ／ サニプリ所属
          </motion.span>

          <motion.h1
            variants={animate ? fadeUp : undefined}
            className="mt-5 text-[clamp(3rem,8.4vw,5.6rem)] font-black leading-[0.94] tracking-[-0.035em]"
          >
            {/*
              The kicker is part of the heading, so it stays inside <h1> and is
              read out with the name rather than as a stray line.
            */}
            <span className="title-cut mb-4 block font-display text-[clamp(0.62rem,1.4vw,0.78rem)] font-extrabold uppercase leading-[1.7] tracking-[0.12em] text-ink-faint">
              High Quality × Entertainment × Engineering
            </span>
            {/*
              Never allowed to wrap: breaking a Japanese name mid-word changes
              how it reads.
            */}
            <span className="title-cut block w-fit whitespace-nowrap lg:mx-auto">{NAME_TOP}</span>
            <span className="title-cut block w-fit whitespace-nowrap lg:mx-auto">
              {NAME_BOTTOM}
            </span>
          </motion.h1>

          <motion.p
            variants={animate ? fadeUp : undefined}
            className="title-cut mt-7 max-w-[24ch] text-[clamp(1.05rem,2.6vw,1.32rem)] font-bold leading-[1.7] lg:mx-auto"
          >
            1日の始まりと
            <br />
            終わりの場所に。
          </motion.p>

          <motion.p
            variants={animate ? fadeUp : undefined}
            className="title-cut mt-3 text-[13.5px] text-ink-soft"
          >
            TikTok LIVER × System Engineer ／{' '}
            <b className="font-display font-bold text-grape">2025.01.18</b> 活動開始
          </motion.p>

          <motion.div
            variants={animate ? fadeUp : undefined}
            className="mt-8 flex flex-wrap gap-3.5 lg:justify-center"
          >
            <a
              href="https://www.tiktok.com/@yu_ki_nojo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-cta-from to-cta-to px-7 py-4 text-[15px] font-bold leading-none text-white shadow-[0_0_0_4px_rgba(255,255,255,0.9),0_14px_26px_-12px_rgba(91,63,217,0.8)] transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.03]"
            >
              TikTok LIVEを見る
              <ArrowUpRight size={16} weight="bold" />
            </a>
            <a
              href="#opening-branch"
              className="inline-flex items-center rounded-full bg-white/90 px-7 py-4 text-[15px] font-bold leading-none text-ink shadow-[inset_0_0_0_2px_rgba(140,160,215,0.35),0_10px_24px_-14px_rgba(78,100,168,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[inset_0_0_0_2px_#7350F5,0_10px_24px_-14px_rgba(78,100,168,0.6)]"
            >
              コンテンツを見る
            </a>
          </motion.div>
        </motion.div>

        {/*
          The pair, laid over the title zone.

          `pointer-events-none` on the whole layer: a limb crossing in front of
          a link must never make it untappable, and neither character has any
          interaction of its own - the gaze reads pointer events off `window`.

          Placement and exit are on separate elements. Framer Motion writes the
          whole `transform` inline, so a Tailwind `translate-*` utility on the
          same node would be silently dropped; the offsets here are all `top` /
          `left` / `right` / `bottom` for that reason.
        */}
        <div className={`pointer-events-none absolute inset-0 ${ambient ? 'z-30' : 'z-20'}`}>
          <div className={`absolute ${layout.left}`}>
            <motion.div style={{ x: leftX, y: leftY, rotate: leftTilt }}>
              <Chibi variant="a" depth={0.9} priority />
            </motion.div>
          </div>

          {/*
            Deliberately not a mirror of the other: bigger, seated, and hung
            higher, so the pair does not read as a symmetrical badge.
          */}
          <div className={`absolute ${layout.right}`}>
            <motion.div style={{ x: rightX, y: rightY, rotate: rightTilt }}>
              <Chibi variant="b" depth={0.7} priority />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
