import { motion, type Variants } from 'framer-motion';
import { TiktokLogo, InstagramLogo, ChatCircleText, Coin } from '@phosphor-icons/react';

const LinksSection = () => {
  const links = [
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@yu_ki_nojo',
      icon: <TiktokLogo size={32} weight="fill" />,
      color: 'from-[#00f2fe] to-[#4facfe]',
      desc: '毎日6〜8時間のライブ配信'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/yu_ki_nojo/',
      icon: <InstagramLogo size={32} weight="fill" />,
      color: 'from-[#f09433] via-[#dc2743] to-[#bc1888]',
      desc: '日常や裏側の様子をお届け'
    },
    {
      name: 'LINE オープンチャット',
      url: 'https://line.me/ti/g2/BTEbz2kKwB2NbZhj4Rf4GAmSITXAigTxm_cAFw',
      icon: <ChatCircleText size={32} weight="fill" />,
      color: 'from-[#00c300] to-[#00a300]',
      desc: 'TikTokLIVEでの活動や配信通知を発信中'
    },
    {
      name: 'TikTok コイン カスタムチャージ',
      url: 'https://www.tiktok.com/coin',
      icon: <Coin size={32} weight="fill" />,
      color: 'from-[#f6d365] to-[#fda085]',
      desc: '手数料なしでTikTokのコインをチャージ'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 30, rotateX: 10 },
    visible: { opacity: 1, scale: 1, y: 0, rotateX: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10" id="links">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-bold mb-4"
          >
            Links & <span className="text-gradient">Support</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            className="h-1 w-24 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full"
          />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6"
        >
          {links.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.1)",
                transition: { type: "spring", stiffness: 400, damping: 17 }
              }}
              whileTap={{ scale: 0.98 }}
              className={`glass glass-hover p-6 rounded-2xl flex items-center group relative overflow-hidden transition-all duration-300 border border-white/5 hover:border-white/20`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-tr ${link.color} shrink-0 mr-6 shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-300`}>
                {link.icon}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold font-display mb-1 group-hover:text-white transition-colors">
                  {link.name}
                </h3>
                <p className="text-white/60 font-light text-sm">
                  {link.desc}
                </p>
              </div>
              
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LinksSection;
