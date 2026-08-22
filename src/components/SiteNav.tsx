import { m, useScroll, useTransform } from 'framer-motion'

const sections = [
  { label: '三つの経歴', href: '#profile' },
  { label: 'Contents', href: '#opening-branch' },
  { label: 'Links', href: '#links' },
]

const SiteNav = () => {
  const { scrollY } = useScroll()
  // Driven by a motion value, so the chrome fades in without re-rendering React.
  const chromeOpacity = useTransform(scrollY, [0, 96], [0, 1])

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16">
      {/*
        The only backdrop-filter on the page. `.frost` is the single degradation
        point: it collapses to a solid fill in the TikTok webview and under
        prefers-reduced-transparency.
      */}
      <m.div
        aria-hidden="true"
        style={{ opacity: chromeOpacity }}
        className="frost absolute inset-0 shadow-[0_1px_0_rgba(140,160,215,0.24)]"
      />

      <nav className="relative mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#hero" className="group flex items-baseline gap-2 rounded-full py-1 pr-2">
          <span className="text-base font-black tracking-tight text-ink sm:text-lg">
            ゆきのじょー
          </span>
          <span className="label hidden transition-colors group-hover:text-grape sm:inline">
            Yukinojo
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {sections.map((section) => (
              <li key={section.href}>
                <a
                  href={section.href}
                  className="group relative block py-1 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
                >
                  {section.label}
                  <span
                    aria-hidden="true"
                    className="iris-fill absolute inset-x-0 -bottom-0.5 h-[3px] origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="https://www.tiktok.com/@yu_ki_nojo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cta-from to-cta-to px-4 py-2.5 text-[13px] font-bold text-white shadow-[0_0_0_4px_rgba(255,255,255,0.9),0_14px_26px_-14px_rgba(91,63,217,0.8)] transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.03] sm:px-5"
          >
            LIVEを見る
          </a>
        </div>
      </nav>
    </header>
  )
}

export default SiteNav
