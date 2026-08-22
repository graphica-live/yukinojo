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

  const leftX = useTransform(part, [0, 0.3, 0.68, 1], ['0%', '-9%', '-54%', '-148%'])
  const leftY = useTransform(part, [0, 0.5, 1], ['0%', '3.5%', '-8%'])
  const leftTilt = useTransform(part, [0, 0.42, 1], [0, -3.5, -17])

  const rightX = useTransform(part, [0, 0.24, 0.74, 1], ['0%', '4%', '46%', '134%'])
  const rightY = useTransform(part, [0, 0.46, 1], ['0%', '-4.5%', '7%'])
  const rightTilt = useTransform(part, [0, 0.55, 1], [0, 4.5, 13])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100dvh] items-center overflow-hidden px-4 pb-10 pt-24 sm:px-6 lg:px-8"
    >
      <DecoField items={heroDeco} />

      <motion.div
        variants={animate ? stagger : undefined}
        initial={animate ? 'hidden' : false}
        animate={animate ? 'visible' : undefined}
        className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-2 items-center gap-y-4 lg:grid-cols-[0.82fr_1.16fr_0.92fr] lg:gap-x-2"
      >
        {/*
          Source order puts the copy first so it is read and painted before
          either character; the grid moves the left-hand one back into place on
          large screens only. Below `lg` the copy spans the full width and the
          pair share a row underneath it.
        */}
        <div className="order-1 col-span-2 lg:order-2 lg:col-span-1 lg:text-center">
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
            <span className="mb-4 block font-display text-[clamp(0.62rem,1.4vw,0.78rem)] font-extrabold uppercase leading-[1.7] tracking-[0.12em] text-ink-faint">
              High Quality × Entertainment × Engineering
            </span>
            {/*
              Never allowed to wrap: breaking a Japanese name mid-word changes
              how it reads.
            */}
            <span className="block w-fit whitespace-nowrap lg:mx-auto">{NAME_TOP}</span>
            <span className="block w-fit whitespace-nowrap lg:mx-auto">{NAME_BOTTOM}</span>
          </motion.h1>

          <motion.p
            variants={animate ? fadeUp : undefined}
            className="mt-7 max-w-[24ch] text-[clamp(1.05rem,2.6vw,1.32rem)] font-bold leading-[1.7] lg:mx-auto"
          >
            1日の始まりと
            <br />
            終わりの場所に。
          </motion.p>

          <motion.p variants={animate ? fadeUp : undefined} className="mt-3 text-[13.5px] text-ink-soft">
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
        </div>

        {/*
          The pair. They are deliberately not mirror images of each other -
          different sizes and vertical offsets - so the composition does not
          read as a symmetrical badge.
        */}
        <motion.div
          style={{ x: leftX, y: leftY, rotate: leftTilt }}
          className="order-2 -mb-12 w-[110%] justify-self-start lg:order-1 lg:mb-0 lg:-mr-[6%] lg:w-[128%] lg:translate-y-[4%]"
        >
          <Chibi variant="a" depth={0.9} priority />
        </motion.div>

        <motion.div
          style={{ x: rightX, y: rightY, rotate: rightTilt }}
          className="order-3 -mb-8 w-[104%] justify-self-end lg:order-3 lg:mb-0 lg:-ml-[8%] lg:w-[124%] lg:translate-y-[-6%]"
        >
          <Chibi variant="b" depth={0.7} priority />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
