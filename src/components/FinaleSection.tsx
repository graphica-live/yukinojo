import { motion, type Variants } from 'framer-motion'
import { useMotionProfile, revealProps } from '../hooks/useMotionProfile'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const FinaleSection = () => {
  const { reveal } = useMotionProfile()

  return (
    <section className="relative px-4 pb-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={reveal ? fadeUp : undefined}
          {...revealProps(reveal)}
          className="relative overflow-hidden rounded-[44px] bg-gradient-to-br from-[#FFEAF5] via-[#EAF1FF] via-[44%] to-[#E6FAF3] px-6 pb-20 pt-[78px] text-center shadow-[24px_34px_60px_-34px_rgba(78,100,168,0.55)]"
        >
          <img
            src="/deco/band.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute inset-x-0 -bottom-[8%] w-full opacity-[0.72]"
          />
          {/*
            Scrim. The band is dense enough to drop the headline below AA, so a
            white radial sits between the artwork and the text.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[74%] w-[min(94%,760px)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.78)_46%,rgba(255,255,255,0)_74%)]"
          />

          <div className="relative z-10">
            <h2 className="text-[clamp(1.7rem,5.4vw,3rem)] leading-[1.24]">
              {/*
                `inline-block` so the accented half moves to line two whole,
                rather than breaking after 「まって」 and stranding 「る。」.
              */}
              今日も、<span className="inline-block text-grape">配信でまってる。</span>
            </h2>
            <p className="mt-3.5 text-[14.5px] text-ink-soft">
              毎日6〜8時間。賑やかでテクニカルな時間を。
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3.5">
              <a
                href="https://www.tiktok.com/@yu_ki_nojo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-cta-from to-cta-to px-7 py-4 text-[15px] font-bold leading-none text-white shadow-[0_0_0_4px_rgba(255,255,255,0.9),0_14px_26px_-12px_rgba(91,63,217,0.8)] transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.03]"
              >
                TikTok LIVEを見る
              </a>
              <a
                href="https://line.me/ti/g2/BTEbz2kKwB2NbZhj4Rf4GAmSITXAigTxm_cAFw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-white/90 px-7 py-4 text-[15px] font-bold leading-none text-ink shadow-[inset_0_0_0_2px_rgba(140,160,215,0.35),0_10px_24px_-14px_rgba(78,100,168,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[inset_0_0_0_2px_#7350F5,0_10px_24px_-14px_rgba(78,100,168,0.6)]"
              >
                配信通知を受け取る
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FinaleSection
