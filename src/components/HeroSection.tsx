
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ['0%', '20%']);
  const textY = useTransform(scrollY, [0, 500], ['0%', '50%']);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

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
    hidden: { opacity: 0, y: 50, rotateX: 90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: 'spring', damping: 12, stiffness: 200 },
    },
  };

  const titleText = "ゆきのじょー";

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0 opacity-40"
        style={{ y: backgroundY }}
      >
        <img 
          src="/images/hero-bg.jpg" 
          alt="Hero Background" 
          className="w-full h-full object-cover object-center mix-blend-overlay"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-[#05050a]/40 to-transparent" />
      </motion.div>

      <motion.div 
        className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center justify-center w-full"
        style={{ y: textY, opacity }}
      >
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           whileHover={{ scale: 1.05, rotate: 2 }}
           transition={{ type: "spring", stiffness: 100, damping: 20 }}
           className="w-32 h-32 md:w-48 md:h-48 rounded-full p-1 bg-gradient-to-tr from-primary via-secondary to-accent mb-8 shadow-[0_0_40px_rgba(0,229,255,0.2)]"
        >
          <motion.img 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
            alt="Yukinojo Profile" 
            className="w-full h-full object-cover rounded-full border-4 border-background"
          />
        </motion.div>

        <motion.h1 
          variants={sentence}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-display font-bold mb-4 tracking-tight leading-tight flex items-center justify-center space-x-1"
        >
          {titleText.split('').map((char, index) => (
            <motion.span
              key={index}
              variants={letter}
              className={`inline-block ${char === 'ょ' || char === 'ー' ? 'text-gradient' : ''}`}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl font-light text-white/80 mb-6 uppercase tracking-[0.2em]"
        >
          TikTok ライバー
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed"
        >
          High Quality <span className="text-primary italic">×</span> Entertainment
          <br />
          <span className="text-sm mt-2 block">1日の始まりと終わりの場所に。</span>
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 1 }}
           className="mt-12"
        >
           <div className="w-[1px] h-24 bg-gradient-to-b from-white/50 to-transparent mx-auto rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
