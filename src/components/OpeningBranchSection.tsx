
import { motion, type Variants } from 'framer-motion'
import {
  Aperture,
  ArrowBendRightUp,
  ArrowUpRight,
  Browser,
  Compass,
  DotsThreeCircle,
  Drop,
  MonitorPlay,
} from '@phosphor-icons/react'
import { detectTikTokInAppBrowser } from '../utils/browser'
import { useMotionProfile, revealProps } from '../hooks/useMotionProfile'
import { useSpotlight } from '../hooks/useSpotlight'

type OpeningBranchSectionProps = {
  embedded?: boolean
}

type BranchCard = {
  title: string
  description: string
  href?: string
  isExternal: boolean
  chip: string
  buttonText: string
  icon: React.ReactNode
  feature?: boolean
}

const branchCards: BranchCard[] = [
  {
    title: '高画質セットアップコンサル',
    description: 'TikTok高画質セットアップについてDMで質問する。',
    href: 'https://www.tiktok.com/@yu_ki_nojo',
    isExternal: true,
    chip: 'Consulting',
    buttonText: 'Open TikTok Profile',
    icon: <MonitorPlay size={22} weight="duotone" />,
    feature: true,
  },
  {
    title: 'アイコンフレーム装着サービス\n【TikRing】',
    description:
      '透過フレームをアップロードして、リスナー向け着せ替えURLを発行。誰でも簡単にアイコンフレームの着せ替えが可能なサービスです。',
    href: 'https://tikring.graphica-produce.com',
    isExternal: false,
    chip: 'Frame Fitter',
    buttonText: 'Open TikRing',
    icon: <Aperture size={22} weight="duotone" />,
  },
  {
    title: 'ギフトエフェクト動画透過サービス\n【TikGradation】',
    description: '自作エフェクトに美しいグラデーション透過をかけよう。',
    href: 'https://tikgradation.graphica-produce.com/',
    isExternal: false,
    chip: 'Gradation',
    buttonText: 'Open TikGradation',
    icon: <Drop size={22} weight="duotone" />,
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const BranchCardBody = ({ card }: { card: BranchCard }) => (
  <div
    className={
      card.feature
        ? 'relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between'
        : 'relative flex h-full flex-col'
    }
  >
    <div className={card.feature ? 'sm:max-w-xl' : ''}>
      <div className="flex items-center gap-3">
        <span className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-signal">
          {card.icon}
        </span>
        <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
          {card.chip}
        </span>
      </div>

      <h3 className="mt-5 whitespace-pre-line font-display text-xl font-bold leading-tight sm:text-2xl">
        {card.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-white/65">{card.description}</p>
    </div>

    {/* Non-feature cards share an equal-height grid row, so the button is
        pushed to the bottom instead of floating under short copy. */}
    <div className={card.feature ? 'shrink-0 self-start sm:self-center' : 'mt-auto pt-6'}>
      <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition-colors group-hover:border-signal/60 group-hover:text-signal sm:text-sm">
        {card.buttonText}
        <ArrowUpRight
          size={15}
          weight="bold"
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </div>
  </div>
)

const BranchCardShell = ({ card, spotlight }: { card: BranchCard; spotlight: boolean }) => {
  const { handlers, spotlightStyle } = useSpotlight(spotlight)

  const className = 'panel panel-hover group relative block h-full overflow-hidden p-6 sm:p-8'

  const inner = (
    <>
      {spotlight ? (
        <motion.div
          aria-hidden="true"
          style={spotlightStyle}
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        />
      ) : null}
      <BranchCardBody card={card} />
    </>
  )

  // Link behaviour is deliberate and must not drift: the consulting card
  // opens a new tab, the two web apps navigate in place.
  return card.href ? (
    <a
      href={card.href}
      target={card.isExternal ? '_blank' : undefined}
      rel={card.isExternal ? 'noopener noreferrer' : undefined}
      className={className}
      {...handlers}
    >
      {inner}
    </a>
  ) : (
    <div className={className} {...handlers}>
      {inner}
    </div>
  )
}

const OpeningBranchSection = ({ embedded = false }: OpeningBranchSectionProps) => {
  // User-agent derived, so it is stable for the session - no effect needed.
  const isTikTokInAppBrowser = detectTikTokInAppBrowser()
  const { reveal, ambient, spotlight } = useMotionProfile()

  return (
    <section
      className={`relative px-4 sm:px-6 lg:px-8 ${
        embedded ? 'py-24 sm:py-28' : 'flex min-h-[72svh] items-center pt-24 pb-14'
      }`}
      id="opening-branch"
    >
      <div className="mx-auto w-full max-w-7xl">
        {embedded ? (
          <motion.h2
            variants={reveal ? fadeUp : undefined}
            {...revealProps(reveal)}
            className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl"
          >
            Contents
          </motion.h2>
        ) : null}

        {isTikTokInAppBrowser ? (
          <div className="relative mt-10 overflow-hidden rounded-panel border border-signal/25 bg-surface-2">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(61,225,255,0.12),transparent_55%)]"
            />

            <div className="absolute right-0 top-0 z-10 p-4 sm:p-6">
              <motion.div
                animate={ambient ? { y: [0, -6, 0], x: [0, 4, 0] } : undefined}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-1"
              >
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-signal">
                  Tap Menu
                </span>
                <ArrowBendRightUp size={32} weight="fill" className="rotate-12 text-signal" />
              </motion.div>
            </div>

            <div className="relative flex flex-col gap-6 p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-signal/25 bg-signal/10 text-signal sm:flex">
                  <Browser size={26} weight="duotone" />
                </div>
                <div className="flex-1 pr-14 sm:pr-0">
                  <h2 className="font-display text-lg font-bold text-white sm:text-2xl">
                    外部ブラウザで開いてください
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    現在のアプリ内ブラウザ（TikTok等）では正常に動作しない機能があります。
                    <br className="hidden sm:block" />
                    以下の手順でSafariまたはChromeで開き直してください。
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-3 pr-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal/15 font-mono text-sm font-bold text-signal">
                    1
                  </div>
                  <div className="flex flex-col">
                    <span className="label">Step 1</span>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2 text-sm font-medium text-white">
                      右上の <DotsThreeCircle size={20} weight="fill" className="text-white/80" />{' '}
                      をタップ
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-3 pr-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal/15 font-mono text-sm font-bold text-signal">
                    2
                  </div>
                  <div className="flex flex-col">
                    <span className="label">Step 2</span>
                    <div className="mt-0.5 flex items-center gap-2 text-sm font-medium text-white">
                      <Compass size={18} weight="fill" className="text-white/80" />
                      「ブラウザで開く」を選択
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <motion.div
          variants={reveal ? stagger : undefined}
          {...revealProps(reveal)}
          className="mt-10 grid gap-4 md:grid-cols-2"
        >
          {branchCards.map((card) => (
            <motion.div
              key={card.title}
              variants={reveal ? fadeUp : undefined}
              className={card.feature ? 'md:col-span-2' : ''}
            >
              <BranchCardShell card={card} spotlight={spotlight} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default OpeningBranchSection
