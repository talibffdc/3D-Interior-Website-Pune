import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass-nav py-4' : 'bg-transparent py-6'
        }`}
        data-testid="header-nav"
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a
            href="#"
            className="z-50 relative flex flex-col leading-none"
            data-testid="link-home"
          >
            <span className="font-serif text-xl md:text-2xl tracking-[0.12em] text-foreground">
              HOUSE OF DESIGN
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-primary/80 font-light mt-[2px]">
              Pune, India
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-xs uppercase tracking-[0.2em] text-foreground/60 hover:text-primary transition-colors duration-300 group"
                data-testid={`link-${link.name.toLowerCase()}`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-400" />
              </a>
            ))}
          </nav>

          <button
            className="md:hidden z-50 relative text-foreground p-2 -mr-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            data-testid="button-menu-toggle"
          >
            {isOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 30% 40%, rgba(205,166,90,0.06) 0%, transparent 70%)' }}
            />
            <nav className="flex flex-col items-center gap-10 relative z-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 + 0.1, duration: 0.4 }}
                  className="font-serif text-5xl hover:text-primary transition-colors duration-300 text-foreground/80"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
