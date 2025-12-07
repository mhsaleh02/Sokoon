import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

type Link = {
  label: string;
  href: string;
}

const links: Link[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mhsaleh02/'
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/201067667210'
  },
  {
    label: 'Gmail',
    href: 'mailto:mohammedsalehofficial@gmail.com'
  }
]

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Menu Trigger */}
      <motion.button
        className="hidden md:block fixed top-8 right-8 z-40 text-ghost hover:text-whisper transition-colors duration-500 font-serif text-sm tracking-[0.3em] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        onClick={() => setIsOpen(true)}
      >
        Contacts
      </motion.button>

      {/* Mobile Menu Trigger */}
      <motion.button
        className="block md:hidden fixed top-8 right-8 z-40 text-ghost hover:text-whisper transition-colors duration-500 font-serif text-sm tracking-[0.3em] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-6 h-6" strokeWidth={1} />
      </motion.button>


      {/* Full Screen Menu */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-background flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            className="absolute top-8 right-8 text-ghost hover:text-whisper transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-6 h-6" strokeWidth={1} />
          </button>

          <nav className="text-center">
            <ul className="space-y-8">
              {links.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <a
                    href={item.href}
                    target="_blank"
                    className="font-serif text-3xl md:text-4xl text-ghost hover:text-whisper transition-colors duration-500 tracking-wide"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </>
  );
};

export default Navigation;
