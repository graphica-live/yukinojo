import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { ArrowDown, TiktokLogo } from '@phosphor-icons/react'
import { useMotionProfile } from '../hooks/useMotionProfile'

const NAME = 'ゆきのじょー'

const nameContainer: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.15, staggerChildren: 0.06 } },
}

const nameChar: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 190, damping: 18 },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const HeroSection = () => {
  const { animate, ambient } = useMotionProfile()
  const sectionRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[88svh] items-center px-4 pb-16 pt-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Portrait leads on mobile: visitors arrive from a video feed and
            recognise the face before the name. */}
        <motion.div
          style={ambient ? { y: portraitY } : undefined}
          initial={animate ? { opacity: 0, scale: 0.94 } : false}
          animate={animate ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 mx-auto w-full max-w-[208px] lg:order-2 lg:ml-auto lg:mr-0 lg:max-w-[440px]"
        >
          <div className="relative">
            {ambient ? (
              <div
                aria-hidden="true"
                className="veil-glow absolute -inset-8 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(139,107,255,0.38),transparent_62%),radial-gradient(circle_at_75%_80%,rgba(61,225,255,0.3),transparent_60%)] blur-2xl"
              />
            ) : null}

            {/* Offset frame: the "signal" motif, a second edge behind the plate. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-2 translate-y-2 rounded-panel border border-signal/30 sm:translate-x-3 sm:translate-y-3"
            />

            <div className="relative overflow-hidden rounded-panel border border-white/10 bg-surface">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/portrait-480.webp 480w, /images/portrait-768.webp 768w, /images/portrait-1080.webp 1080w"
                  sizes="(min-width: 1024px) 440px, 208px"
                />
                <img
                  src="/images/portrait-768.jpg"
                  srcSet="/images/portrait-480.jpg 480w, /images/portrait-768.jpg 768w, /images/portrait-1080.jpg 1080w"
                  sizes="(min-width: 1024px) 440px, 208px"
                  width={1080}
                  height={1080}
                  alt="ゆきのじょーのポートレート"
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-square w-full object-cover"
                />
              </picture>
            </div>
          </div>

          <p className="label mt-5 text-center lg:text-right">毎日 6〜8時間 配信中</p>
        </motion.div>

        {/* Copy */}
        <div className="order-2 lg:order-1">
          <motion.h1
            aria-label={NAME}
            variants={animate ? nameContainer : undefined}
            initial={animate ? 'hidden' : false}
            animate={animate ? 'visible' : undefined}
            className="font-display text-[3.25rem] font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {NAME.split('').map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                aria-hidden="true"
                variants={animate ? nameChar : undefined}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            variants={animate ? fadeUp : undefined}
            initial={animate ? 'hidden' : false}
            animate={animate ? 'visible' : undefined}
            transition={{ delay: 0.55 }}
          >
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-white/55 sm:text-sm">
              High Quality <span className="text-signal">×</span> Entertainment{' '}
              <span className="text-signal">×</span> Engineering
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
              1日の始まりと終わりの場所に。
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="https://www.tiktok.com/@yu_ki_nojo"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-signal px-6 py-3.5 text-sm font-bold text-ink transition-transform duration-200 hover:bg-white active:scale-[0.98]"
              >
                <TiktokLogo size={18} weight="fill" />
                TikTok LIVEを見る
              </a>

              <a
                href="#opening-branch"
                className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-signal/60 hover:text-signal active:scale-[0.98]"
              >
                コンテンツを見る
                <ArrowDown
                  size={16}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
