import { motion, type Variants } from 'framer-motion'
import {
  ArrowUpRight,
  ChatCircleText,
  Coin,
  InstagramLogo,
  TiktokLogo,
} from '@phosphor-icons/react'
import { useMotionProfile, revealProps } from '../hooks/useMotionProfile'

/**
 * Brand colours stay on the platform marks only. Everything else on the page
 * uses the single `signal` accent.
 */
const links = [
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@yu_ki_nojo',
    icon: <TiktokLogo size={26} weight="fill" />,
    color: 'from-[#00f2fe] to-[#4facfe]',
    desc: '毎日6〜8時間のライブ配信',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/yu_ki_nojo/',
    icon: <InstagramLogo size={26} weight="fill" />,
    color: 'from-[#f09433] via-[#dc2743] to-[#bc1888]',
    desc: '日常や裏側の様子をお届け',
  },
  {
    name: 'LINE オープンチャット',
    url: 'https://line.me/ti/g2/BTEbz2kKwB2NbZhj4Rf4GAmSITXAigTxm_cAFw',
    icon: <ChatCircleText size={26} weight="fill" />,
    color: 'from-[#00c300] to-[#00a300]',
    desc: 'TikTokLIVEでの活動や配信通知を発信中',
  },
  {
    name: 'TikTok コイン カスタムチャージ',
    url: 'https://www.tiktok.com/coin',
    icon: <Coin size={26} weight="fill" />,
    color: 'from-[#f6d365] to-[#fda085]',
    desc: '手数料なしでTikTokのコインをチャージ',
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
    <section id="links" className="relative px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      {/* Same max-width as the other sections so every section headline sits
          on the same left edge; the list itself stays narrower. */}
      <div className="mx-auto max-w-7xl">
        <motion.h2
          variants={reveal ? fadeUp : undefined}
          {...revealProps(reveal)}
          className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl"
        >
          SNS Links
        </motion.h2>

        <motion.ul
          variants={reveal ? stagger : undefined}
          {...revealProps(reveal)}
          className="mt-10 max-w-4xl border-t border-white/10"
        >
          {links.map((link) => (
            <motion.li
              key={link.url}
              variants={reveal ? fadeUp : undefined}
              className="border-b border-white/10"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-4 py-5 pl-4 pr-2 transition-colors hover:bg-white/[0.03] sm:gap-6 sm:py-6 sm:pl-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-0.5 origin-center scale-y-0 bg-signal transition-transform duration-300 group-hover:scale-y-100"
                />

                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white ${link.color} sm:h-14 sm:w-14`}
                >
                  {link.icon}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-display text-base font-bold leading-tight transition-colors group-hover:text-signal sm:text-lg">
                    {link.name}
                  </span>
                  <span className="mt-1 block text-xs text-white/55 sm:text-sm">{link.desc}</span>
                </span>

                <ArrowUpRight
                  size={20}
                  weight="bold"
                  className="shrink-0 text-white/35 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
                />
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export default LinksSection
