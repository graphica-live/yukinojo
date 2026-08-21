import { motion, useScroll, useTransform } from 'framer-motion'
import { TiktokLogo } from '@phosphor-icons/react'

const sections = [
  { label: '二つの顔', href: '#profile' },
  { label: 'Contents', href: '#opening-branch' },
  { label: 'Links', href: '#links' },
]

const SiteNav = () => {
  const { scrollY } = useScroll()
  // Driven by motion values, so the chrome fades in without re-rendering React.
  const chromeOpacity = useTransform(scrollY, [0, 96], [0, 1])

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16">
      <motion.div
        aria-hidden="true"
        style={{ opacity: chromeOpacity }}
        className="absolute inset-0 border-b border-white/10 bg-ink/80 backdrop-blur-md"
      />

      <nav className="relative mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#hero"
          className="group flex items-baseline gap-2 rounded-full py-1 pr-2"
        >
          <span className="font-display text-base font-bold tracking-tight text-white sm:text-lg">
            ゆきのじょー
          </span>
          <span className="label hidden transition-colors group-hover:text-signal sm:inline">
            Yukinojo
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {sections.map((section) => (
              <li key={section.href}>
                <a
                  href={section.href}
                  className="text-sm font-medium text-white/60 transition-colors hover:text-white"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="https://www.tiktok.com/@yu_ki_nojo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-signal px-3.5 py-2 text-[11px] font-bold text-ink transition-colors hover:bg-white sm:px-5 sm:text-sm"
          >
            <TiktokLogo size={16} weight="fill" />
            TikTok LIVEを見る
          </a>
        </div>
      </nav>
    </header>
  )
}

export default SiteNav
