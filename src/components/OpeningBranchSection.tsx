import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, WarningCircle } from '@phosphor-icons/react';

const TIKTOK_IN_APP_MARKERS = [
  'tiktok',
  'musical_ly',
  'bytedancewebview',
  'ttwebview',
  'aweme',
  'trill',
];

const detectTikTokInAppBrowser = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const vendor = window.navigator.vendor.toLowerCase();
  const referrer = document.referrer.toLowerCase();

  return TIKTOK_IN_APP_MARKERS.some((marker) => userAgent.includes(marker))
    || vendor.includes('bytedance')
    || referrer.includes('tiktok.com')
    || referrer.includes('tiktokv.com');
};

const branchCards = [
  {
    title: 'About Yukinojo',
    description: 'ゆきのじょーのプロフィール、各種SNSリンク',
    href: '/about-yukinojo',
    isExternal: false,
    accent: 'from-sky-500/70 to-blue-600/70',
    chip: 'Profile',
    buttonText: 'View About',
    icon: <ArrowRight size={20} weight="bold" />,
  },
  {
    title: 'TikRing',
    description: '透過フレームをアップロードして、リスナー向け着せ替えURLを発行。誰でも簡単にアイコンフレームの着せ替えが可能なサービスです。',
    href: 'https://tikring.graphica-produce.com',
    isExternal: true,
    accent: 'from-cyan-400/75 to-rose-500/70',
    chip: 'Frame Fitter',
    buttonText: 'Open TikRing',
    icon: <PlayCircle size={20} weight="fill" />,
  },
];

const OpeningBranchSection = () => {
  const [isTikTokInAppBrowser, setIsTikTokInAppBrowser] = useState(() => detectTikTokInAppBrowser());

  useEffect(() => {
    setIsTikTokInAppBrowser(detectTikTokInAppBrowser());
  }, []);

  return (
    <section className="relative min-h-[72svh] flex items-center px-4 sm:px-6 lg:px-8 pt-24 pb-14" id="opening-branch">
      <div className="max-w-6xl mx-auto w-full">
        {isTikTokInAppBrowser ? (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="mb-6 sm:mb-8 overflow-hidden rounded-3xl border border-amber-300/25 bg-amber-500/10 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.2),transparent_42%)]" />
            <div className="relative flex flex-col gap-4 p-5 text-left sm:flex-row sm:items-start sm:gap-5 sm:p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-300/15 text-amber-100">
                <WarningCircle size={26} weight="fill" />
              </div>

              <div className="flex-1">
                <p className="text-[11px] uppercase tracking-[0.22em] text-amber-100/75">TikTok In-App Browser</p>
                <h2 className="mt-2 text-xl font-display font-bold text-white sm:text-2xl">
                  TikTokアプリ内ブラウザでは、ページや外部リンクが正常に開かない場合があります
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/78 sm:text-[15px]">
                  続けて開く場合は、右上のメニューから「ブラウザで開く」または「Safari / Chromeで開く」を選択してください。外部ブラウザで開くと、各ページやリンクをより安定して利用できます。
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}

        <div className="grid md:grid-cols-2 gap-5 sm:gap-7">
          {branchCards.map((card, index) => (
            <motion.a
              key={card.title}
              href={card.href}
              target={card.isExternal ? '_blank' : undefined}
              rel={card.isExternal ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.12, ease: 'easeOut' }}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="group relative overflow-hidden rounded-3xl border border-white/15 bg-black/35 backdrop-blur-xl p-7 sm:p-9"
            >
              <div className={`absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity duration-300 bg-gradient-to-br ${card.accent}`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_45%)]" />

              <div className="relative z-10">
                <p className="inline-block text-[11px] tracking-[0.18em] uppercase text-white/65 border border-white/20 rounded-full px-2.5 py-1 mb-4">
                  {card.chip}
                </p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">{card.title}</h2>
                <p className="text-white/70 leading-relaxed min-h-14 sm:min-h-16">{card.description}</p>

                <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white group-hover:bg-white/20 transition-colors">
                  {card.buttonText}
                  <span className="group-hover:translate-x-1 transition-transform">{card.icon}</span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OpeningBranchSection;
