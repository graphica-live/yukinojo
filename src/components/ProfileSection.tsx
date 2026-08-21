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
          <span className="label block">Two Sides</span>
          <h2 className="mt-2.5 text-[clamp(2rem,6vw,3.5rem)] leading-[1.06]">二つの顔</h2>
          <span className="absolute right-0 top-[-6px] font-hand text-[clamp(1.4rem,4vw,2.1rem)] font-bold text-grape [rotate:-7deg]">
            SE × LIVER
          </span>
        </motion.div>

        <motion.div
          variants={reveal ? stagger : undefined}
          {...revealProps(reveal)}
          className="grid gap-8 md:grid-cols-[1.08fr_0.92fr] md:gap-9"
        >
          {/* Engineer. The wider cell - 28 years is the number that anchors the
              whole page's credibility. */}
          <motion.article
            variants={reveal ? fadeUp : undefined}
            className="sticker sticker-hover relative bg-gradient-to-br from-white from-[32%] via-[#FDF2FA] via-[76%] to-[#EFF5FF] p-9 pl-10 hover:-translate-y-2 [rotate:-1.1deg] hover:[rotate:0deg]"
          >
            <span
              aria-hidden="true"
              className="iris-fill absolute bottom-8 left-3.5 top-8 w-1.5 rounded-full"
            />
            <span
              aria-hidden="true"
              className="absolute -top-6 left-1/2 w-[132px] -translate-x-1/2 [rotate:-3deg]"
            >
              <img src="/deco/washi-1.webp" alt="" loading="lazy" decoding="async" className="w-full" />
            </span>

            <p
              aria-hidden="true"
              className="absolute right-6 top-6 font-display text-[clamp(3rem,9vw,5.4rem)] font-extrabold leading-[0.8] tracking-[-0.04em] text-[rgba(140,160,215,0.16)]"
            >
              28<span className="text-[0.34em]">年</span>
            </p>

            <div className="grid h-[60px] w-[60px] place-items-center rounded-plate bg-gradient-to-br from-[#FFF0F8] to-[#E9F2FF] shadow-plate">
              <img src="/deco/gem-1.webp" alt="" loading="lazy" decoding="async" className="w-[70%]" />
            </div>

            <h3 className="mt-6 text-[clamp(1.5rem,4vw,2rem)]">SE</h3>
            <p className="mt-1 text-balance text-sm font-bold text-grape-deep">
              初めてのコーディングから28年。実務経験14年。
            </p>
            <p className="mt-4 text-pretty text-[14.5px] leading-[1.95] text-ink-soft">
              システムの開発・保守、プロジェクトマネジメントを経験。IT国家資格高度区分を多数保有。
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['開発 / 保守', 'PM', '高度区分 多数'].map(chip)}
            </div>
          </motion.article>

          {/* Streamer */}
          <motion.article
            variants={reveal ? fadeUp : undefined}
            className="sticker sticker-hover relative mt-0 bg-gradient-to-br from-white from-[32%] via-[#FDF2FA] via-[76%] to-[#EFF5FF] p-9 pl-10 hover:-translate-y-2 md:mt-4 [rotate:1.4deg] hover:[rotate:0deg]"
          >
            <span
              aria-hidden="true"
              className="iris-fill absolute bottom-8 left-3.5 top-8 w-1.5 rounded-full"
            />
            <span
              aria-hidden="true"
              className="absolute -top-6 left-1/2 w-[132px] -translate-x-1/2 [rotate:4deg]"
            >
              <img src="/deco/washi-4.webp" alt="" loading="lazy" decoding="async" className="w-full" />
            </span>

            <div className="grid h-[60px] w-[60px] place-items-center rounded-plate bg-gradient-to-br from-[#FFF0F8] to-[#E9F2FF] shadow-plate">
              <img src="/deco/star-gold.webp" alt="" loading="lazy" decoding="async" className="w-[70%]" />
            </div>

            <h3 className="mt-6 text-[clamp(1.5rem,4vw,2rem)]">ライバー</h3>
            <p className="mt-1 text-balance text-sm font-bold text-grape-deep">サニプリ所属</p>
            <p className="mt-4 text-pretty text-[14.5px] leading-[1.95] text-ink-soft">
              2025年1月18日より活動開始。毎日6〜8時間、賑やかでテクニカルな配信をお届けしています。
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['毎日 6〜8H', 'TikTok LIVE'].map(chip)}
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  )
}

export default ProfileSection
