import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BottleSilhouette from './BottleSilhouette';

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Bottle moves slower (parallax effect)
  const bottleY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  // Text moves at normal speed but with slight offset
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} className="relative flex flex-col items-center justify-center px-4 pt-16">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Bottle Visual - Parallax */}
        <BottleSilhouette />

        {/* Text Content - Parallax */}
        <motion.div style={{ y: textY }} className="text-center md:text-left space-y-2">
          <motion.p
            className="font-serif text-lg md:text-xl text-foreground/70 leading-relaxed hover:text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            No notifications
          </motion.p>

          <motion.p
            className="font-serif text-lg md:text-xl text-foreground/70 leading-relaxed hover:text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          >
            No noise
          </motion.p>

          {/* "Just pure void." - +20% larger */}
          <motion.p
            className="font-serif text-4xl md:text-5xl text-foreground/90 font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Just pure void
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
