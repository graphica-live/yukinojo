import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowBendRightUp, Browser, Compass, DotsThreeCircle, PlayCircle } from '@phosphor-icons/react';
import { detectTikTokInAppBrowser, shouldUseLowEffectsMode } from '../utils/browser';

type OpeningBranchSectionProps = {
  embedded?: boolean;
};

type BranchCard = {
  title: string;
  description: string;
  href?: string;
  isExternal: boolean;
  accent: string;
  chip: string;
  buttonText: string;
  icon: React.ReactNode;
};

const branchCards: BranchCard[] = [
  {
    title: '高画質セットアップコンサル',
    description: 'TikTok高画質セットアップについてDMで質問する。',
    href: 'https://www.tiktok.com/@yu_ki_nojo',
    isExternal: true,
    accent: 'from-emerald-400/75 to-cyan-500/70',
    chip: 'Consulting',
    buttonText: 'Open TikTok Profile',
    icon: <PlayCircle size={20} weight="fill" />,
  },
  {
    title: 'PC配信総合支援ツール「TikEffect」',
    description: '各種オーバーレイ、読み上げ、字幕など',
    isExternal: false,
    accent: 'from-fuchsia-400/75 to-sky-500/70',
    chip: 'Streaming Tool',
    buttonText: '開発中',
    icon: <PlayCircle size={20} weight="fill" />,
  },
  {
    title: 'アイコンフレーム装着サービス\n【TikRing】',
    description: '透過フレームをアップロードして、リスナー向け着せ替えURLを発行。誰でも簡単にアイコンフレームの着せ替えが可能なサービスです。',
    href: 'https://tikring.graphica-produce.com',
    isExternal: false,
    accent: 'from-cyan-400/75 to-rose-500/70',
    chip: 'Frame Fitter',
    buttonText: 'Open TikRing',
    icon: <PlayCircle size={20} weight="fill" />,
  },
  {
    title: 'ギフトエフェクト動画透過サービス\n【TikGradation】',
    description: '自作エフェクトに美しいグラデーション透過をかけよう。',
    href: 'https://tikgradation.graphica-produce.com/',
    isExternal: false,
    accent: 'from-purple-400/75 to-pink-500/70',
    chip: 'Gradation',
    buttonText: 'Open TikGradation',
    icon: <PlayCircle size={20} weight="fill" />,
  },
];

const OpeningBranchSection = ({ embedded = false }: OpeningBranchSectionProps) => {
  const [isTikTokInAppBrowser, setIsTikTokInAppBrowser] = useState(() => detectTikTokInAppBrowser());
  const useLowEffectsMode = shouldUseLowEffectsMode();

  useEffect(() => {
    setIsTikTokInAppBrowser(detectTikTokInAppBrowser());
  }, []);

  const getOptimizedHref = (card: BranchCard) => {
    return card.href;
  };

  return (
    <section
      className={`relative px-4 sm:px-6 lg:px-8 ${embedded ? 'py-24' : 'min-h-[72svh] flex items-center pt-24 pb-14'}`}
      id="opening-branch"
    >
      <div className="max-w-6xl mx-auto w-full">
        {embedded ? (
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-display font-bold mb-4"
            >
              <span className="text-gradient">Contents</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              className="h-1 w-24 bg-gradient-to-r from-accent to-primary mx-auto rounded-full"
            />
          </div>
        ) : null}

        {isTikTokInAppBrowser ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`relative ${embedded ? 'mb-10' : 'mb-8'} overflow-hidden rounded-3xl border border-amber-300/30 bg-black/60 shadow-2xl ${useLowEffectsMode ? '' : 'backdrop-blur-xl'}`}
          >
            {/* 背景装飾 */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl" />
            <div className="absolute right-0 top-0 p-4 sm:p-6 z-10 pointer-events-none">
              <motion.div
                animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-1"
              >
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 drop-shadow-md">Tap Menu</span>
                <ArrowBendRightUp size={36} weight="fill" className="text-amber-400 rotate-12 drop-shadow-lg" />
              </motion.div>
            </div>

            <div className="relative flex flex-col gap-6 p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 text-amber-300 ring-1 ring-inset ring-amber-400/30">
                  <Browser size={28} weight="duotone" />
                </div>
                <div className="flex-1 pr-14 sm:pr-0">
                  <h2 className="text-lg font-bold text-white sm:text-2xl">
                    外部ブラウザで開いてください
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-amber-100/80">
                    現在のアプリ内ブラウザ（TikTok等）では正常に動作しない機能があります。<br className="hidden sm:block" />
                    以下の手順でSafariまたはChromeで開き直してください。
                  </p>
                </div>
              </div>

              {/* 手順ステップ */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-3 pr-4 transition-colors hover:bg-white/10">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-sm font-bold text-amber-300">
                    1
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-white/50 uppercase tracking-wider">Step 1</span>
                    <div className="text-sm font-medium text-white flex items-center gap-2 flex-wrap">
                      右上の <DotsThreeCircle size={20} weight="fill" className="text-white/80" /> をタップ
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-3 pr-4 transition-colors hover:bg-white/10">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-sm font-bold text-amber-300">
                    2
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-white/50 uppercase tracking-wider">Step 2</span>
                    <div className="text-sm font-medium text-white flex items-center gap-2">
                      <Compass size={18} weight="fill" className="text-white/80" />
                      「ブラウザで開く」を選択
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}

        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {branchCards.map((card, index) => {
            const optimizedHref = getOptimizedHref(card);
            const cardBody = (
              <>
                <div className={`absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity duration-300 bg-gradient-to-br ${card.accent}`} />
                {useLowEffectsMode ? null : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_45%)]" />
                )}

                <div className="relative z-10">
                  <p className="inline-block text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-white/65 border border-white/20 rounded-full px-2 py-1 sm:px-2.5 mb-3 sm:mb-4">
                    {card.chip}
                  </p>
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-white mb-2 sm:mb-3 leading-tight whitespace-pre-line">{card.title}</h2>
                  <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed min-h-16 sm:min-h-16">{card.description}</p>

                  <span className="mt-6 sm:mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 sm:px-4 py-2 text-[11px] sm:text-sm font-semibold text-white group-hover:bg-white/20 transition-colors leading-none">
                    {card.buttonText}
                    <span className="group-hover:translate-x-1 transition-transform">{card.icon}</span>
                  </span>
                </div>
              </>
            );

            return optimizedHref ? (
              <motion.a
                key={card.title}
                href={optimizedHref}
                target={card.isExternal ? '_blank' : undefined}
                rel={card.isExternal ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.12, ease: 'easeOut' }}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`group relative overflow-hidden rounded-3xl border border-white/15 bg-black/35 p-5 sm:p-7 md:p-9 ${useLowEffectsMode ? '' : 'backdrop-blur-xl'}`}
              >
                {cardBody}
              </motion.a>
            ) : (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.12, ease: 'easeOut' }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`group relative overflow-hidden rounded-3xl border border-white/15 bg-black/35 p-5 sm:p-7 md:p-9 ${useLowEffectsMode ? '' : 'backdrop-blur-xl'}`}
              >
                {cardBody}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default OpeningBranchSection;
