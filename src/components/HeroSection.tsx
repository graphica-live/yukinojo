import { motion, type Variants } from 'framer-motion'
import { ArrowUpRight } from '@phosphor-icons/react'
import Chibi from './Chibi'
import DecoField from './Deco'
import { heroDeco } from '../data/deco'
import { useMotionProfile } from '../hooks/useMotionProfile'

const NAME_TOP = 'ゆきの'
const NAME_BOTTOM = 'じょー'

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

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center overflow-hidden px-4 pb-10 pt-24 sm:px-6 lg:px-8"
    >
      <DecoField items={heroDeco} />

      <motion.div
        variants={animate ? stagger : undefined}
        initial={animate ? 'hidden' : false}
        animate={animate ? 'visible' : undefined}
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-2 lg:grid-cols-[1.04fr_0.96fr]"
      >
        <div>
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
            className="mt-5 text-[clamp(3.3rem,9.6vw,7rem)] font-black leading-[0.94] tracking-[-0.035em]"
          >
            {/*
              The kicker is part of the heading, so it stays inside <h1> and is
              read out with the name rather than as a stray line.
            */}
            <span className="mb-4 block font-display text-[clamp(0.66rem,1.5vw,0.8rem)] font-extrabold uppercase leading-[1.7] tracking-[0.12em] text-ink-faint">
              High Quality × Entertainment × Engineering
            </span>
            {/*
              Never allowed to wrap: breaking a Japanese name mid-word changes
              how it reads.
            */}
            <span className="block w-fit whitespace-nowrap">{NAME_TOP}</span>
            <span className="block w-fit whitespace-nowrap">{NAME_BOTTOM}</span>
          </motion.h1>

          <motion.p
            variants={animate ? fadeUp : undefined}
            className="mt-7 max-w-[24ch] text-[clamp(1.1rem,2.8vw,1.42rem)] font-bold leading-[1.7]"
          >
            1日の始まりと
            <br />
            終わりの場所に。
          </motion.p>

          <motion.p
            variants={animate ? fadeUp : undefined}
            className="mt-3 text-[13.5px] text-ink-soft"
          >
            TikTok LIVER × System Engineer ／{' '}
            <b className="font-display font-bold text-grape">2025.01.18</b> 活動開始
          </motion.p>

          <motion.div variants={animate ? fadeUp : undefined} className="mt-8 flex flex-wrap gap-3.5">
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

        <div className="relative mx-auto mt-2 w-[min(104%,600px)] lg:mr-[-6%] lg:mt-0 lg:w-[min(114%,760px)]">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[46%] aspect-square w-[104%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(255,236,247,0.55)_38%,rgba(224,240,255,0)_70%)]"
          />
          <div
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 aspect-square w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[rgba(155,175,225,0.42)] ${
              ambient ? 'animate-[spin-slow_40s_linear_infinite]' : ''
            }`}
          />
          <div
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 aspect-square w-[104%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dotted border-[rgba(255,158,205,0.42)] ${
              ambient ? 'animate-[spin-slow_70s_linear_infinite_reverse]' : ''
            }`}
          />
          <Chibi className="relative z-10" />
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
