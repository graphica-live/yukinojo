import HeroSection from './components/HeroSection'
import LinksSection from './components/LinksSection'
import OpeningBranchSection from './components/OpeningBranchSection'
import ProfileSection from './components/ProfileSection'
import SignalTicker from './components/SignalTicker'
import SiteNav from './components/SiteNav'
import { useMotionProfile } from './hooks/useMotionProfile'

function App() {
  const { ambient } = useMotionProfile()

  return (
    <div className="relative min-h-screen bg-ink text-white">
      {/*
        Ambient layers. Fixed and pointer-events-none so they never repaint
        with scroll. Static gradients carry the colour; only the drift and the
        film grain are conditional.
      */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_15%_-5%,rgba(139,107,255,0.20),transparent_60%),radial-gradient(ellipse_60%_45%_at_90%_25%,rgba(61,225,255,0.14),transparent_62%),radial-gradient(ellipse_80%_50%_at_50%_105%,rgba(139,107,255,0.12),transparent_65%)]" />

        {ambient ? (
          <div className="veil-glow absolute -left-[15%] top-[-10%] h-[55%] w-[55%] animate-drift rounded-full bg-violet/10 blur-[120px]" />
        ) : null}

        <div className="veil-grid absolute inset-0" />

        {ambient ? (
          <>
            <div className="veil-scanlines absolute inset-0 opacity-40" />
            <div className="veil-grain absolute inset-0 opacity-[0.035]" />
          </>
        ) : null}
      </div>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink"
      >
        本文へスキップ
      </a>

      <SiteNav />

      <main id="main" className="relative z-10">
        <HeroSection />
        <SignalTicker />
        <ProfileSection />
        <OpeningBranchSection embedded />
        <LinksSection />
      </main>

      <footer className="relative z-10 border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="font-display text-sm font-bold tracking-tight text-white/70">
            ゆきのじょー
          </span>
          <p className="font-mono text-[11px] text-white/40">
            &copy; {new Date().getFullYear()} Yukinojo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
