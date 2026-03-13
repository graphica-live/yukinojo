import { motion } from 'framer-motion';
import { ArrowRight, ArrowSquareOut } from '@phosphor-icons/react';

const branchCards = [
  {
    title: 'ゆきのじょー紹介サイト',
    description: 'プロフィール、ギャラリー、各種リンクをこのまま見る',
    href: '#hero',
    isExternal: false,
    accent: 'from-cyan-400/70 to-sky-500/70',
    buttonText: 'このサイトへ進む',
    icon: <ArrowRight size={20} weight="bold" />,
  },
  {
    title: 'graphica-live/frame',
    description: '別プロジェクトへ移動して詳細を確認する',
    href: 'https://github.com/graphica-live/frame',
    isExternal: true,
    accent: 'from-emerald-400/70 to-teal-500/70',
    buttonText: 'frame を開く',
    icon: <ArrowSquareOut size={20} weight="bold" />,
  },
];

const OpeningBranchSection = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center px-4 sm:px-6 lg:px-8 py-16" id="opening-branch">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <p className="text-xs sm:text-sm tracking-[0.28em] uppercase text-white/55 mb-3">Entrance</p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold leading-tight text-white">
            開幕リンク分岐
          </h1>
          <p className="mt-4 text-sm sm:text-base text-white/65 max-w-2xl mx-auto">
            どちらへ進むかを最初に選べる入口です。
          </p>
        </motion.div>

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
              className="group relative overflow-hidden rounded-3xl border border-white/15 bg-black/30 backdrop-blur-xl p-7 sm:p-9"
            >
              <div className={`absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity duration-300 bg-gradient-to-br ${card.accent}`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_45%)]" />

              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">{card.title}</h2>
                <p className="text-white/70 leading-relaxed min-h-14">{card.description}</p>

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
