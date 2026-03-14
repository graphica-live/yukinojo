import { motion, type Variants } from 'framer-motion';
import { Code, Martini, MicrophoneStage } from '@phosphor-icons/react';

const AboutSection = () => {
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
      transition: { type: "spring", stiffness: 120, damping: 14, mass: 1.2 },
    },
  };

  const traits = [
    {
      icon: <Code size={32} weight="duotone" className="text-primary" />,
      title: "SE",
      subtitle: "IT業界で10年以上",
      description: "インフラシステムの開発、PM、フリーランスを経験。プロジェクトマネージャ、情報セキュリティスペシャリストなどの資格を保有しています。",
    },
    {
      icon: <Martini size={32} weight="duotone" className="text-accent" />,
      title: "ホスト",
      subtitle: "歌舞伎町",
      description: "gd-colors 「club yellow」 にてリクエスト出勤中。",
    },
    {
      icon: <MicrophoneStage size={32} weight="duotone" className="text-secondary" />,
      title: "ライバー",
      subtitle: "サニプリ所属",
      description: "2025年1月18日より活動開始。毎日6〜8時間、賑やかでテクニカルな配信をお届けしています。",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-bold mb-4"
          >
            About <span className="text-gradient">Yukinojo</span>
          </motion.h2>
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
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {traits.map((trait, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 2,
                rotateX: -2,
                boxShadow: "0 25px 50px -12px rgba(0, 229, 255, 0.15), 0 0 30px rgba(123, 31, 162, 0.2)",
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="glass glass-hover p-8 rounded-2xl flex flex-col items-start relative overflow-hidden group perspective-1000"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-colors duration-500 group-hover:scale-150" />
              
              <div className="mb-6 p-4 rounded-xl bg-white/5 backdrop-blur-sm inline-block">
                {trait.icon}
              </div>
              
              <h3 className="text-2xl font-bold font-display mb-1">{trait.title}</h3>
              <p className="text-accent text-sm font-medium mb-4 uppercase tracking-wider">{trait.subtitle}</p>
              
              <p className="text-white/70 font-light leading-relaxed">
                {trait.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
