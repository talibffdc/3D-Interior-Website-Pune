import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMouseParallax } from '@/hooks/use-mouse-parallax';

const testimonials = [
  {
    id: 1,
    quote: "House of Design didn't just design our Koregaon Park home — they translated our lifestyle into physical space. The restraint and warmth they brought is unlike anything I've experienced in Pune or Mumbai.",
    author: 'Riya Mehta',
    role: 'Co-Founder, TechVenture Pune',
  },
  {
    id: 2,
    quote: "Walking into our Hinjewadi office now feels like a profound exhale. They understood exactly what we needed: premium materials, intelligent lighting, and silence that commands respect.",
    author: 'Arjun Kapoor',
    role: 'Managing Director, Kapoor Capital',
  },
  {
    id: 3,
    quote: "They transformed our Baner villa from a blank shell into a sanctuary that actually reflects who we are. Every detail — from the stone flooring to the curated art — was chosen with purpose.",
    author: 'Sandeep & Priya Nair',
    role: 'Art Collectors, Pune',
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY  = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const txtY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const { x: mx2, y: my2 } = useMouseParallax(22);
  const { x: mx,  y: my  } = useMouseParallax(10);

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, []);

  const next = () => setCurrent(p => (p + 1) % testimonials.length);
  const prev = () => setCurrent(p => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={sectionRef} className="py-32 bg-background relative overflow-hidden" data-testid="section-testimonials">
      {/* Layer 0 — ambient glow */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(205,166,90,0.05) 0%, transparent 70%)' }}
        />
        {/* Huge ghost quote mark — deepest layer */}
        <motion.div
          style={{ x: mx2, y: my2 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 select-none pointer-events-none overflow-hidden"
        >
          <span className="font-serif text-[35vw] leading-none text-foreground/[0.018] select-none">"</span>
        </motion.div>
      </motion.div>

      {/* Layer 1 — floating geometric rings */}
      <motion.div style={{ x: mx, y: my }} className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full border border-primary/6"
          style={{ width: 650, height: 650, top: '50%', left: '-20%', transform: 'translateY(-50%)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute rounded-full border border-foreground/4"
          style={{ width: 450, height: 450, bottom: '-15%', right: '-10%' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        />
        {/* Floating vertical gold bar */}
        <motion.div
          className="absolute w-px h-32 bg-gradient-to-b from-primary/30 to-transparent"
          style={{ top: '10%', right: '8%' }}
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-px h-20 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
          style={{ bottom: '15%', left: '6%' }}
          animate={{ y: [12, -12, 12] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </motion.div>

      {/* Layer 2 — content */}
      <motion.div style={{ y: txtY }} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <span className="uppercase tracking-[0.25em] text-primary text-xs font-medium block">Client Perspectives</span>
        </motion.div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="relative min-h-[320px] md:min-h-[260px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.97 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center px-4"
              >
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground/88 leading-relaxed mb-10 italic">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-px bg-primary/50 mb-5" />
                  <p className="uppercase tracking-[0.2em] text-sm font-medium text-foreground">
                    {testimonials[current].author}
                  </p>
                  <p className="text-foreground/40 text-xs tracking-widest uppercase mt-1">
                    {testimonials[current].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              onClick={prev}
              className="w-11 h-11 border border-border/50 text-foreground/40 hover:text-primary hover:border-primary transition-all duration-300 rounded-full flex items-center justify-center hover:bg-primary/5"
              aria-label="Previous testimonial"
              data-testid="btn-testimonial-prev"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-px transition-all duration-400 ${i === current ? 'bg-primary w-10' : 'bg-border/60 w-4 hover:bg-border'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-11 h-11 border border-border/50 text-foreground/40 hover:text-primary hover:border-primary transition-all duration-300 rounded-full flex items-center justify-center hover:bg-primary/5"
              aria-label="Next testimonial"
              data-testid="btn-testimonial-next"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
