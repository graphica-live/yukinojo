import { m, type Variants } from 'framer-motion'
import {
  AmazonLogo,
  ArrowUpRight,
  ChatCircleText,
  Coin,
  InstagramLogo,
  TiktokLogo,
} from '@phosphor-icons/react'
import DecoField from './Deco'
import { linksDeco } from '../data/deco'
import { useMotionProfile, revealProps } from '../hooks/useMotionProfile'

/**
 * Brand colours stay on the platform marks only. Everything else on the page
 * uses the palette in tailwind.config.js.
 */
const links = [
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@yu_ki_nojo',
    icon: <TiktokLogo size={24} weight="fill" />,
    mark: 'from-[#00f2fe] to-[#4facfe]',
    desc: '毎日6〜8時間のライブ配信',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/yu_ki_nojo/',
    icon: <InstagramLogo size={24} weight="fill" />,
    mark: 'from-[#f09433] via-[#dc2743] to-[#bc1888]',
    desc: '日常や裏側の様子をお届け',
  },
  {
    name: 'LINE オープンチャット',
    url: 'https://line.me/ti/g2/BTEbz2kKwB2NbZhj4Rf4GAmSITXAigTxm_cAFw',
    icon: <ChatCircleText size={24} weight="fill" />,
    mark: 'from-[#06c755] to-[#00a300]',
    desc: 'TikTokLIVEでの活動や配信通知を発信中',
  },
  {
    name: 'TikTok コイン カスタムチャージ',
    url: 'https://www.tiktok.com/coin',
    icon: <Coin size={24} weight="fill" />,
    mark: 'from-[#f6d365] to-[#fda085]',
    desc: '手数料なしでTikTokのコインをチャージ',
  },
  {
    name: 'Amazon ほしいものリスト',
    url: 'https://www.amazon.co.jp/hz/wishlist/ls/UBSN0UTM2CEE?ref_=list_d_wl_lfu_nav_2',
    icon: <AmazonLogo size={24} weight="fill" />,
    mark: 'from-[#FFA724] to-[#F2760A]',
    desc: '配信を支えてくれるアイテムはこちら',
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const LinksSection = () => {
  const { reveal } = useMotionProfile()

  return (
    <section id="links" className="relative overflow-hidden px-4 pb-5 pt-[86px] sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_84%_26%,rgba(200,246,228,0.5),transparent_62%)]"
      />
      <DecoField items={linksDeco} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <m.div
          variants={reveal ? fadeUp : undefined}
          {...revealProps(reveal)}
          className="relative mb-12"
        >
          <span className="label block">SNS Links</span>
          <h2 className="mt-2.5 text-[clamp(2rem,6vw,3.5rem)] leading-[1.06]">会いにきてね。</h2>
          <span className="absolute right-0 top-[-6px] font-hand text-[clamp(1.4rem,4vw,2.1rem)] font-bold text-grape [rotate:-7deg]">
            see you!
          </span>
        </m.div>

        <m.div
          variants={reveal ? fadeUp : undefined}
          {...revealProps(reveal)}
          className="relative overflow-hidden rounded-[44px] bg-gradient-to-br from-[#FFEAF5] via-[#EAF1FF] via-[44%] to-[#E6FAF3] px-6 py-10 shadow-[24px_34px_60px_-34px_rgba(78,100,168,0.55)] sm:px-10"
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
            Scrim. The band is dense enough to drop the link cards below AA
            contrast, so a white radial sits between the artwork and the list.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[86%] w-[min(96%,820px)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.78)_46%,rgba(255,255,255,0)_74%)]"
          />

          <m.ul
            variants={reveal ? stagger : undefined}
            {...revealProps(reveal)}
            className="relative z-10 flex flex-col gap-3"
          >
            {links.map((link) => (
              <m.li key={link.url} variants={reveal ? fadeUp : undefined}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-[0_0_0_4px_#fff,0_8px_18px_-12px_rgba(78,100,168,0.55)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_0_0_4px_#fff,16px_20px_32px_-22px_rgba(78,100,168,0.6)]"
                >
                  <span
                    aria-hidden="true"
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white ${link.mark}`}
                  >
                    {link.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-black">{link.name}</span>
                    <span className="block truncate text-[11.5px] text-ink-soft">{link.desc}</span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    aria-hidden="true"
                    className="ml-auto shrink-0 text-ink-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-grape"
                  />
                </a>
              </m.li>
            ))}
          </m.ul>
        </m.div>
      </div>
    </section>
  )
}

export default LinksSection
