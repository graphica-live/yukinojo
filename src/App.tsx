
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import LinksSection from './components/LinksSection';
import OpeningBranchSection from './components/OpeningBranchSection';
import { shouldUseLowEffectsMode } from './utils/browser';

const ABOUT_PAGE_PATH = '/about-yukinojo';

function App() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const isAboutPage = normalizedPath === ABOUT_PAGE_PATH;
  const useLowEffectsMode = shouldUseLowEffectsMode();

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 selection:text-white">
      {/* Dynamic Glamorous Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#05050a]">
        {/* Global Abstract Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
          alt="Global Background" 
          className={`absolute inset-0 w-full h-full object-cover ${useLowEffectsMode ? 'opacity-12' : 'opacity-30 mix-blend-screen'}`}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05050a]/60 to-[#05050a]/90"></div>
        
        {/* Moving glowing orbs (Masculine & Premium: Deep Blue, Rich Purple, Subtle Gold) */}
        {useLowEffectsMode ? null : (
          <>
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/15 rounded-full blur-[120px] mix-blend-screen opacity-60 animate-pulse-slow"></div>
            <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] bg-purple-600/15 rounded-full blur-[150px] mix-blend-screen opacity-50 animate-pulse-slow object-right" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-[-20%] left-[10%] w-[70%] h-[70%] bg-amber-500/10 rounded-full blur-[130px] mix-blend-screen opacity-40 animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
          </>
        )}
        
        {/* Grain overlay for texture */}
        {useLowEffectsMode ? null : (
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}></div>
        )}
      </div>

      <main className="relative z-10">
        {isAboutPage ? (
          <>
            <HeroSection />
            <AboutSection />
            <LinksSection />
          </>
        ) : (
          <OpeningBranchSection />
        )}
      </main>

      <footer className="relative z-10 py-8 text-center border-t border-white/5 mt-20 glass">
        <p className="text-white/40 text-sm font-light">
          &copy; {new Date().getFullYear()} Yukinojo. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
