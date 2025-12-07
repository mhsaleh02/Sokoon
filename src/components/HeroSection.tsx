import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
      {/* Main Title - Arabic */}
      <motion.h1
        className="font-arabic text-[128px] text-foreground mb-2 select-none"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        dir="rtl"
      >
        سُكون
      </motion.h1>

      {/* Subtitle - English - +25% larger */}
      <motion.p
        className="font-serif text-xl md:text-2xl text-foreground/75 tracking-[0.2em] font-light"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
      >
        We bottled silence
      </motion.p>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-transparent via-foreground/40 to-transparent"
          animate={{ scaleY: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
