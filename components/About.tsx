import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMouseParallax } from '@/hooks/use-mouse-parallax';

const stats = [
  { value: '150+', label: 'Projects Completed' },
  { value: '12+', label: 'Years in Pune' },
  { value: '98%', label: 'Client Satisfaction' },
];

export function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });

  const bgY      = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const midY     = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const textY    = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const opacity  = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const glowScale = useTransform(scrollYProgress, [0.2, 0.6], [0.85, 1.15]);

  const { x: mx2, y: my2 } = useMouseParallax(28);
  const { x: mx,  y: my  } = useMouseParallax(14);

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="py-40 bg-background relative overflow-hidden"
      data-testid="section-philosophy"
      style={{ perspective: '800px' }}
    >
      {/* Layer 0 — background glow (slowest, scroll only) */}
      <motion.div style={{ y: bgY, scale: glowScale }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[800px]"
          style={{ background: 'radial-gradient(ellipse, rgba(205,166,90,0.07) 0%, rgba(205,166,90,0.02) 45%, transparent 70%)' }}
        />
      </motion.div>

      {/* Layer 1 — large ghost text (scroll + mouse) */}
      <motion.div style={{ y: midY }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap w-full text-center overflow-hidden">
        <motion.span style={{ x: mx2, y: my2, opacity: 0.035 }} className="font-serif text-[22vw] text-foreground leading-none block">
          DESIGN
        </motion.span>
      </motion.div>

      {/* Layer 2 — geometric depth elements (scroll + mouse) */}
      <motion.div style={{ y: midY }} className="absolute inset-0 pointer-events-none">
        <motion.div style={{ x: mx, y: my }} className="absolute inset-0">
          {/* Top-left large ring */}
          <motion.div
            className="absolute rounded-full border border-primary/8"
            style={{ width: 420, height: 420, top: '-80px', left: '-100px' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />
          {/* Bottom-right ring */}
          <motion.div
            className="absolute rounded-full border border-foreground/5"
            style={{ width: 320, height: 320, bottom: '-60px', right: '-80px' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          />
          {/* Floating vertical lines */}
          <motion.div
            className="absolute w-px h-40 bg-gradient-to-b from-primary/30 to-transparent"
            style={{ top: '10%', left: '6%' }}
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-px h-24 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
            style={{ top: '40%', right: '5%' }}
            animate={{ y: [20, -20, 20] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          {/* Corner brackets */}
          <div className="absolute top-16 left-16 w-20 h-px bg-primary/30" />
          <div className="absolute top-16 left-16 w-px h-20 bg-primary/30" />
          <div className="absolute bottom-16 right-16 w-20 h-px bg-primary/30" />
          <div className="absolute bottom-16 right-16 w-px h-20 bg-primary/30" />
        </motion.div>
      </motion.div>

      {/* Layer 3 — main content (scroll opposite) */}
      <motion.div style={{ y: textY, opacity }} className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="uppercase tracking-[0.3em] text-primary text-xs font-medium mb-10 block">
              Our Philosophy
            </span>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-foreground mb-14">
              Every room is a{' '}
              <em className="text-gradient-gold not-italic">feeling</em>{' '}
              before it is a space.
            </h2>

            <motion.div
              className="w-px h-28 bg-gradient-to-b from-primary/60 to-transparent mx-auto mb-14"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="text-xl md:text-2xl text-foreground/60 font-light leading-relaxed max-w-3xl mx-auto"
            >
              At House of Design, we practice cold modernism warmed by natural materials.
              Every shadow, texture, and breath of empty space is intensely considered.
              <span className="text-foreground/85"> Nothing is accidental.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="flex flex-col md:flex-row items-center justify-center gap-0 mt-24"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center">
                  <motion.div
                    className="text-center px-12 py-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + i * 0.15, duration: 0.7 }}
                  >
                    <div className="font-serif text-5xl md:text-6xl text-gradient-gold mb-3">{stat.value}</div>
                    <div className="text-xs uppercase tracking-[0.22em] text-foreground/40">{stat.label}</div>
                  </motion.div>
                  {i < stats.length - 1 && (
                    <div className="w-px h-16 bg-border/50 hidden md:block" />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
