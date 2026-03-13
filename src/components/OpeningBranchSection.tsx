import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from '@phosphor-icons/react';

const branchCards = [
  {
    title: 'About Yukinojo',
    description: 'プロフィール、ギャラリー、配信リンクをこのままチェック',
    href: '#hero',
    isExternal: false,
    accent: 'from-sky-500/70 to-blue-600/70',
    chip: 'Profile',
    buttonText: 'View About',
    icon: <ArrowRight size={20} weight="bold" />,
  },
  {
    title: 'TikRing',
    description: '透過フレームをアップロードして、着せ替えURLを発行する',
    href: '/frame',
    isExternal: false,
    accent: 'from-cyan-400/75 to-rose-500/70',
    chip: 'Frame Fitter',
    buttonText: 'Open TikRing',
    icon: <PlayCircle size={20} weight="fill" />,
  },
];

const OpeningBranchSection = () => {
  return (
    <section className="relative min-h-[72svh] flex items-center px-4 sm:px-6 lg:px-8 pt-24 pb-14" id="opening-branch">
      <div className="max-w-6xl mx-auto w-full">
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

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-center mt-10"
        >
          <a href="#hero" className="text-white/50 hover:text-white/80 text-sm tracking-wide transition-colors">
            Scroll to Hero
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default OpeningBranchSection;
