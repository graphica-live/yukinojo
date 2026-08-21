import { motion, type Variants } from 'framer-motion'
import { Code, MicrophoneStage } from '@phosphor-icons/react'
import { useMotionProfile, revealProps } from '../hooks/useMotionProfile'
import { useSpotlight } from '../hooks/useSpotlight'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const ProfileSection = () => {
  const { reveal, ambient, spotlight } = useMotionProfile()
  const engineer = useSpotlight(spotlight)
  const liver = useSpotlight(spotlight)

  return (
    <section id="profile" className="relative px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          variants={reveal ? fadeUp : undefined}
          {...revealProps(reveal)}
          className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl"
        >
          二つの顔
        </motion.h2>

        <motion.div
          variants={reveal ? stagger : undefined}
          {...revealProps(reveal)}
          className="mt-12 grid gap-4 md:grid-cols-12"
        >
          {/* Engineer. The wider cell - 28 years is the number that anchors
              the whole page's credibility. */}
          <motion.article
            variants={reveal ? fadeUp : undefined}
            {...engineer.handlers}
            className="panel panel-hover relative overflow-hidden p-7 sm:p-9 md:col-span-7"
          >
            {spotlight ? (
              <motion.div
                aria-hidden="true"
                style={engineer.spotlightStyle}
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              />
            ) : null}

            {ambient ? (
              <div
                aria-hidden="true"
                className="veil-glow pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-signal/10 blur-3xl"
              />
            ) : null}

            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-6">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-signal">
                  <Code size={28} weight="duotone" />
                </div>
                <p className="font-display text-5xl font-black leading-none text-white/[0.12] sm:text-7xl">
                  28
                  <span className="ml-1 text-2xl sm:text-3xl">年</span>
                </p>
              </div>

              <h3 className="mt-8 font-display text-2xl font-bold sm:text-3xl">SE</h3>
              <p className="mt-2 text-sm font-medium text-signal sm:text-base">
                初めてのコーディングから28年。実務経験14年。
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
                システムの開発・保守、プロジェクトマネジメントを経験。IT国家資格高度区分を多数保有。
              </p>
            </div>
          </motion.article>

          {/* Streamer */}
          <motion.article
            variants={reveal ? fadeUp : undefined}
            {...liver.handlers}
            className="panel panel-hover relative overflow-hidden p-7 sm:p-9 md:col-span-5"
          >
            {spotlight ? (
              <motion.div
                aria-hidden="true"
                style={liver.spotlightStyle}
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              />
            ) : null}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(139,107,255,0.16),transparent_58%)]"
            />

            <div className="relative flex h-full flex-col">
              <div className="w-fit rounded-xl border border-white/10 bg-white/5 p-3 text-violet">
                <MicrophoneStage size={28} weight="duotone" />
              </div>

              <h3 className="mt-8 font-display text-2xl font-bold sm:text-3xl">ライバー</h3>
              <p className="mt-2 text-sm font-medium text-signal sm:text-base">サニプリ所属</p>
              <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
                2025年1月18日より活動開始。毎日6〜8時間、賑やかでテクニカルな配信をお届けしています。
              </p>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  )
}

export default ProfileSection
