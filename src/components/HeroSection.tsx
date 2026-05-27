
import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { Code, Martini, MicrophoneStage } from '@phosphor-icons/react';
import { shouldUseLowEffectsMode } from '../utils/browser';

const HeroSection = () => {
  const useLowEffectsMode = shouldUseLowEffectsMode();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-6%', '18%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.3]);

  // Spring animations for text splitting
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const letter: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', damping: 12, stiffness: 200 },
    },
  };

  const titleText = "ゆきのじょー";
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, rotateX: -15, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 14, mass: 1.2 },
    },
  };

  const traits = [
    {
      icon: <Code size={32} weight="duotone" className="text-primary" />,
      title: 'SE',
      subtitle: 'IT業界で13年',
      description: 'システムの開発、PM、フリーランスを経験。IT国家資格高度区分を多数保有。',
    },
    {
      icon: <Martini size={32} weight="duotone" className="text-accent" />,
      title: 'ホスト',
      subtitle: '歌舞伎町',
      description: 'gd-colors 「club yellow」 にてリクエスト出勤中。',
    },
    {
      icon: <MicrophoneStage size={32} weight="duotone" className="text-secondary" />,
      title: 'ライバー',
      subtitle: 'サニプリ所属',
      description: '2025年1月18日より活動開始。毎日6〜8時間、賑やかでテクニカルな配信をお届けしています。',
    },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-[72svh] pt-16 pb-16 px-4 sm:px-6 lg:px-8 overflow-x-hidden" id="hero">
      <motion.div 
        className="absolute inset-0 z-0 opacity-40"
        style={{ y: backgroundY }}
      >
        <img 
          src="/images/hero-bg.jpg" 
          alt="Hero Background" 
          className={`w-full h-full object-cover object-center ${useLowEffectsMode ? 'opacity-20' : 'mix-blend-overlay'}`}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-[#05050a]/40 to-transparent" />
      </motion.div>

      <motion.div 
        className="relative z-10 text-center max-w-7xl mx-auto flex flex-col items-center justify-center w-full min-h-[72svh]"
        style={{ opacity }}
      >
        <motion.div className="max-w-4xl mx-auto flex flex-col items-center w-full" style={{ y: textY }}>
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           whileHover={{ scale: 1.05, rotate: 2 }}
           transition={{ type: "spring", stiffness: 100, damping: 20 }}
           className="w-28 h-28 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-primary via-secondary to-accent mb-6 shadow-[0_0_40px_rgba(0,229,255,0.2)]"
        >
          <motion.img 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            src="/images/hero-profile.webp" 
            alt="Yukinojo Profile" 
            className="w-full h-full object-cover rounded-full border-4 border-background"
          />
        </motion.div>

        <motion.h1 
          variants={sentence}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-6xl font-display font-bold mb-3 tracking-tight leading-tight flex items-center justify-center space-x-1"
        >
          {titleText.split('').map((char, index) => (
            <motion.span
              key={index}
              variants={letter}
              className={`inline-block ${char === 'ょ' || char === 'ー' ? 'text-gradient glyph-safe' : ''}`}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-base md:text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed"
        >
          High Quality <span className="text-primary italic">×</span> Entertainment <span className="text-primary italic">×</span> Engineering
          <br />
          <span className="text-sm mt-2 block">1日の始まりと終わりの場所に。</span>
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 1 }}
            className="mt-8"
        >
            <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent mx-auto rounded-full" />
        </motion.div>
        </motion.div>

        <div className="w-full mt-10 md:mt-14">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="w-full"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                rotateY: 1,
                rotateX: -1,
                boxShadow: useLowEffectsMode
                  ? '0 20px 36px -18px rgba(0, 0, 0, 0.6)'
                  : '0 25px 50px -12px rgba(0, 229, 255, 0.15), 0 0 30px rgba(123, 31, 162, 0.2)',
                transition: { type: 'spring', stiffness: 300, damping: 20 }
              }}
              className="glass glass-hover p-6 md:p-8 rounded-3xl relative overflow-hidden group perspective-1000"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-12 -mt-12 group-hover:bg-primary/20 transition-colors duration-500 group-hover:scale-150" />

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {traits.map((trait, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-start py-2 md:py-4 ${index < traits.length - 1 ? 'border-b border-white/10 md:border-b-0 md:border-r md:pr-8' : ''} ${index > 0 ? 'md:pl-8' : ''}`}
                  >
                    <div className={`mb-5 p-3 rounded-xl bg-white/5 inline-block ${useLowEffectsMode ? '' : 'backdrop-blur-sm'}`}>
                      {trait.icon}
                    </div>

                    <h3 className="text-2xl font-bold font-display mb-1">{trait.title}</h3>
                    <p className="text-accent text-sm font-medium mb-4 uppercase tracking-wider">{trait.subtitle}</p>

                    <p className="text-white/70 font-light leading-relaxed">
                      {trait.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
