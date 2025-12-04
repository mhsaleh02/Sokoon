import { motion } from 'framer-motion';

const PhilosophySection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <motion.p
          className="text-2xl md:text-3xl text-foreground/75 !leading-[45px] text-arabic"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          dir="rtl"
        >
          في عالم مليء بالضجيج،
          <br />
          السكون هو الترف الحقيقي
        </motion.p>

        <motion.div
          className="w-24 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent mx-auto"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        />

        <motion.p
          className="font-serif text-lg md:text-xl text-foreground/60 italic tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          "In a world full of noise,
          <br />
          stillness is the true luxury"
        </motion.p>
      </div>
    </section>
  );
};

export default PhilosophySection;
