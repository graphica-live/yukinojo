import { motion } from 'framer-motion'
import BuddyMascot from './components/BuddyMascot'
import FinaleSection from './components/FinaleSection'
import HeroSection from './components/HeroSection'
import LinksSection from './components/LinksSection'
import OpeningBranchSection from './components/OpeningBranchSection'
import ProfileSection from './components/ProfileSection'
import SignalTicker from './components/SignalTicker'
import SiteNav from './components/SiteNav'
import { useAmbientVars } from './hooks/useAmbientVars'
import { useMotionProfile } from './hooks/useMotionProfile'

function App() {
  const { ambient } = useMotionProfile()
  // Pointer and scroll are published here as --px / --py / --sy and consumed
  // by every decoration in CSS. One node, one style write per frame.
  const ambientStyle = useAmbientVars()

  return (
    <motion.div style={ambientStyle} className="relative min-h-screen bg-paper text-ink">
      {/*
        Ambient background. Fixed and pointer-events-none so it never repaints
        with scroll. The static gradients carry the colour; only the two slowly
        rotating blobs are conditional.
      */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_12%_0%,#FFF2FA_0%,rgba(255,242,250,0)_55%),radial-gradient(110%_76%_at_92%_8%,#E6F3FF_0%,rgba(230,243,255,0)_58%),radial-gradient(120%_90%_at_50%_110%,#EEF8F4_0%,rgba(238,248,244,0)_60%)]" />

        {ambient ? (
          <>
            <div className="aurora-blob absolute -left-[14vw] -top-[16vw] h-[60vw] w-[60vw] animate-[spin-slow_46s_linear_infinite] rounded-full bg-[conic-gradient(from_40deg,#ffd7ec,#d9ecff,#d3f6ea,#fff0c6,#e6dcff,#ffd7ec)] opacity-50 blur-[70px]" />
            <div className="aurora-blob absolute -right-[16vw] top-[34vh] h-[52vw] w-[52vw] animate-[spin-slow_62s_linear_infinite_reverse] rounded-full bg-[conic-gradient(from_200deg,#d9ecff,#ffe3f2,#e8ddff,#d5f7ee,#d9ecff)] opacity-50 blur-[70px]" />
          </>
        ) : null}
      </div>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-grape focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        本文へスキップ
      </a>

      <SiteNav />

      <main id="main" className="relative z-10">
        <HeroSection />
        <SignalTicker />
        <ProfileSection />
        <OpeningBranchSection />
        <LinksSection />
        <FinaleSection />
      </main>

      <footer className="relative z-10 px-4 pb-14 pt-9 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-[12px] font-bold text-ink-faint sm:flex-row lg:pr-48">
          <span>ゆきのじょー / Yukinojo</span>
          <p>&copy; {new Date().getFullYear()} Yukinojo. All rights reserved.</p>
        </div>
      </footer>

      <BuddyMascot />
    </motion.div>
  )
}

export default App
