import { motion, type Variants } from 'framer-motion'
import DecoField from './Deco'
import { profileDeco } from '../data/deco'
import { useMotionProfile, revealProps } from '../hooks/useMotionProfile'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const chip = (label: string) => (
  <span
    key={label}
    className="rounded-full bg-gradient-to-br from-[#FDF0F8] to-[#EAF3FF] px-3.5 py-1.5 text-[11.5px] font-bold text-ink-soft shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.9)]"
  >
    {label}
  </span>
)

const ProfileSection = () => {
  const { reveal } = useMotionProfile()

  return (
    <section
      id="profile"
      className="relative overflow-hidden px-4 py-[86px] sm:px-6 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_78%_18%,rgba(255,214,238,0.5),transparent_62%)]"
      />
      <DecoField items={profileDeco} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          variants={reveal ? fadeUp : undefined}
          {...revealProps(reveal)}
          className="relative mb-12"
        >
          <span className="label block">Three Chapters</span>
          <h2 className="mt-2.5 text-[clamp(2rem,6vw,3.5rem)] leading-[1.06]">三つの経歴</h2>
          <span className="absolute right-0 top-[-6px] font-hand text-[clamp(1.4rem,4vw,2.1rem)] font-bold text-grape [rotate:-7deg]">
            SE × LIVER × HOST
          </span>
        </motion.div>

        <motion.div
          variants={reveal ? stagger : undefined}
          {...revealProps(reveal)}
          className="grid gap-8 md:grid-cols-2 md:gap-9 lg:grid-cols-3"
        >
          {/* Engineer. First of the three - 28 years is the number that anchors
              the whole page's credibility. */}
          <motion.article
            variants={reveal ? fadeUp : undefined}
            className="sticker sticker-hover relative bg-gradient-to-br from-white from-[32%] via-[#FDF2FA] via-[76%] to-[#EFF5FF] p-6 pl-7 hover:-translate-y-2 [rotate:-1.1deg] hover:[rotate:0deg]"
          >
            <span
              aria-hidden="true"
              className="iris-fill absolute bottom-5 left-3.5 top-5 w-1.5 rounded-full"
            />
            <p
              aria-hidden="true"
              className="absolute right-5 top-4 font-display text-[clamp(2.2rem,6vw,3.4rem)] font-extrabold leading-[0.8] tracking-[-0.04em] text-[rgba(140,160,215,0.16)]"
            >
              28<span className="text-[0.34em]">年</span>
            </p>

            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-plate bg-gradient-to-br from-[#FFF0F8] to-[#E9F2FF] shadow-plate">
                <img src="/deco/gem-1.webp" alt="" loading="lazy" decoding="async" className="w-[70%]" />
              </div>
              <h3 className="text-[clamp(1.3rem,3.4vw,1.7rem)]">SE</h3>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {['開発 / 保守', 'PM', '高度区分 多数'].map(chip)}
            </div>
          </motion.article>

          {/* Streamer */}
          <motion.article
            variants={reveal ? fadeUp : undefined}
            className="sticker sticker-hover relative mt-0 bg-gradient-to-br from-white from-[32%] via-[#FDF2FA] via-[76%] to-[#EFF5FF] p-6 pl-7 hover:-translate-y-2 [rotate:1.4deg] hover:[rotate:0deg]"
          >
            <span
              aria-hidden="true"
              className="iris-fill absolute bottom-5 left-3.5 top-5 w-1.5 rounded-full"
            />
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-plate bg-gradient-to-br from-[#FFF0F8] to-[#E9F2FF] shadow-plate">
                <img src="/deco/star-gold.webp" alt="" loading="lazy" decoding="async" className="w-[70%]" />
              </div>
              <h3 className="text-[clamp(1.3rem,3.4vw,1.7rem)]">ライバー</h3>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {['毎日 6〜8H', 'TikTok LIVE'].map(chip)}
            </div>
          </motion.article>

          {/* Host. The chapter that closed - past tense throughout, and the
              only card lit for night rather than daylight. */}
          <motion.article
            variants={reveal ? fadeUp : undefined}
            className="sticker sticker-hover relative mt-0 bg-gradient-to-br from-white from-[32%] via-[#F4F0FF] via-[76%] to-[#EFF5FF] p-6 pl-7 hover:-translate-y-2 [rotate:-0.9deg] hover:[rotate:0deg]"
          >
            <span
              aria-hidden="true"
              className="iris-fill absolute bottom-5 left-3.5 top-5 w-1.5 rounded-full"
            />
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-plate bg-gradient-to-br from-[#F1EBFF] to-[#E9F2FF] shadow-plate">
                <img src="/deco/moon-crescent.webp" alt="" loading="lazy" decoding="async" className="w-[70%]" />
              </div>
              <h3 className="text-[clamp(1.3rem,3.4vw,1.7rem)]">元ホスト</h3>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {['歌舞伎町', '接客 / トーク'].map(chip)}
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  )
}

export default ProfileSection
