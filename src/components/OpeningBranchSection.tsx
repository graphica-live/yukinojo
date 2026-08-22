import { m, type Variants } from 'framer-motion'
import { Aperture, ArrowUpRight, Drop, MonitorPlay } from '@phosphor-icons/react'
import DecoField from './Deco'
import { contentsDeco } from '../data/deco'
import { useMotionProfile, revealProps } from '../hooks/useMotionProfile'

type BranchCard = {
  title: string
  /**
   * Product name, on its own line under the title. Kept as a separate field
   * rather than a `\n` inside `title` so each line can be balanced on its own -
   * otherwise a long Japanese title strands its last character on line two.
   */
  productName?: string
  description: string
  href: string
  isExternal: boolean
  buttonText: string
  icon: React.ReactNode
  /** Decorative clip pinned to the corner. */
  pin: string
  pinClass: string
  /** Card tint. Each card gets its own so the row is not three white boxes. */
  tint: string
}

const branchCards: BranchCard[] = [
  {
    title: '高画質セットアップコンサル',
    description: 'TikTok高画質セットアップについてDMで質問する。',
    href: 'https://www.tiktok.com/@yu_ki_nojo',
    isExternal: true,
    buttonText: 'Open TikTok Profile',
    icon: <MonitorPlay size={22} weight="duotone" />,
    pin: 'clip-binder',
    pinClass: 'w-16',
    tint: 'from-white from-[30%] to-[#FFF0F7]',
  },
  {
    title: 'アイコンフレーム装着サービス',
    productName: '【TikRing】',
    description:
      '透過フレームをアップロードして、リスナー向け着せ替えURLを発行。誰でも簡単にアイコンフレームの着せ替えが可能なサービスです。',
    href: 'https://tikring.graphica-produce.com',
    isExternal: false,
    buttonText: 'Open TikRing',
    icon: <Aperture size={22} weight="duotone" />,
    pin: 'clip-heart',
    pinClass: 'w-16 [rotate:12deg]',
    tint: 'from-white from-[30%] to-[#EEF4FF]',
  },
  {
    title: 'ギフトエフェクト動画透過サービス',
    productName: '【TikGradation】',
    description: '自作エフェクトに美しいグラデーション透過をかけよう。',
    href: 'https://tikgradation.graphica-produce.com/',
    isExternal: false,
    buttonText: 'Open TikGradation',
    icon: <Drop size={22} weight="duotone" />,
    pin: 'ribbon-tag-blue',
    pinClass: 'w-[52px] [rotate:-8deg]',
    tint: 'from-white from-[30%] to-[#EAFAF3]',
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

/**
 * Cards alternate their entrance side by index (even = left, odd = right),
 * `custom` on each motion.div feeds the index into this function variant.
 * A soft spring (rather than an eased duration) gives the swing a slight
 * overshoot-and-settle bounce; the paired tilt and scale-up sell the sense
 * of the card physically swinging into place instead of just sliding.
 */
const sideIn: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: index % 2 === 0 ? -110 : 110,
    rotate: index % 2 === 0 ? -8 : 8,
    scale: 0.9,
  }),
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 74, damping: 11, mass: 1 },
  },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.22 } },
}

const tilt = ['[rotate:-1deg]', '[rotate:0.9deg]', '[rotate:-0.6deg]']

const OpeningBranchSection = () => {
  const { reveal } = useMotionProfile()

  return (
    <section
      id="opening-branch"
      className="relative overflow-hidden px-4 py-[86px] sm:px-6 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(78%_62%_at_16%_22%,rgba(206,232,255,0.55),transparent_62%)]"
      />
      <DecoField items={contentsDeco} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <m.div
          variants={reveal ? fadeUp : undefined}
          {...revealProps(reveal)}
          className="mb-12"
        >
          <span className="label block">Contents</span>
          <h2 className="mt-2.5 text-[clamp(2rem,6vw,3.5rem)] leading-[1.06]">
            つくったもの、
            <br />
            やっていること。
          </h2>
        </m.div>

        <m.div
          variants={reveal ? stagger : undefined}
          {...revealProps(reveal)}
          className="flex flex-col gap-4"
        >
          {branchCards.map((card, index) => (
            <m.div key={card.href} custom={index} variants={reveal ? sideIn : undefined}>
              {/*
                Link behaviour is deliberate and must not drift: the consulting
                card opens a new tab, the two web apps navigate in place.
              */}
              <a
                href={card.href}
                target={card.isExternal ? '_blank' : undefined}
                rel={card.isExternal ? 'noopener noreferrer' : undefined}
                className={`sticker sticker-hover group relative flex h-full items-center gap-4 bg-gradient-to-br p-5 ${card.tint} ${tilt[index]} hover:-translate-y-2.5 hover:[rotate:0deg]`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute -right-2.5 -top-3 w-11 opacity-90 ${card.pinClass.replace(/w-\S+/, '')}`}
                >
                  <img
                    src={`/deco/${card.pin}.webp`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full"
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-white text-grape shadow-plate">
                      {card.icon}
                    </span>
                    <h3 className="text-[clamp(1.05rem,2.6vw,1.28rem)] leading-[1.32]">
                      <span className="block text-balance">{card.title}</span>
                      {card.productName && <span className="block">{card.productName}</span>}
                    </h3>
                  </div>
                  <p className="mt-2 text-pretty text-[13px] leading-[1.6] text-ink-soft">
                    {card.description}
                  </p>
                </div>

                <span className="grid h-10 w-10 shrink-0 place-items-center self-center rounded-xl bg-gradient-to-br from-[#FDEFF7] to-[#ECF3FF] text-grape-deep transition-all duration-200 group-hover:bg-gradient-to-r group-hover:from-cta-from group-hover:to-cta-to group-hover:text-white group-hover:shadow-[0_12px_22px_-12px_rgba(91,63,217,0.8)]">
                  <span className="sr-only">{card.buttonText}</span>
                  <ArrowUpRight
                    size={17}
                    weight="bold"
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </a>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  )
}

export default OpeningBranchSection
