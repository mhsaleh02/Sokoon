import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="relative  flex flex-col items-center justify-center px-4 pb-6">
      <motion.p
        className="font-serif text-xl md:text-2xl text-foreground/65 tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        Ready to embrace the void?
      </motion.p>

      {/* CTA - +15% brighter, +20% padding */}
      <motion.a
        href="https://www.linkedin.com/in/mhsaleh02/"
        className="inline-block font-serif text-lg md:text-xl text-foreground/95 tracking-[0.15em] px-8 py-4 underline-glow-bright duration-500"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        target="_blank"
      >
        Join the Silence
      </motion.a>

      {/* Footer */}
      <motion.footer
        className="text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <p className="font-serif text-sm text-foreground/50 tracking-[0.3em] uppercase pt-[280px]">
          Sokoon © <span className="font-ibm font-[300]">2025</span>
        </p>
      </motion.footer>
    </section>
  );
};

export default CTASection;
