import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMouseParallax } from '@/hooks/use-mouse-parallax';

const steps = [
  {
    number: '01',
    title: 'Discovery & Vision',
    description: 'We begin by understanding your lifestyle, aspirations, and the unique architecture of your space. This phase establishes the emotional and functional foundation.',
  },
  {
    number: '02',
    title: 'Concept & Architecture',
    description: 'Our team develops spatial plans, 3D visualizations, and architectural concepts. We explore light, form, and material to shape a cohesive narrative.',
  },
  {
    number: '03',
    title: 'Curation & Procurement',
    description: 'We source rare materials, bespoke furnishings, and fine art from our Indian and international network of artisans, ensuring every piece holds intentionality.',
  },
  {
    number: '04',
    title: 'Execution & Styling',
    description: 'From construction oversight to the final placement of every object, we manage each detail to deliver a flawless, move-in ready sanctuary.',
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const { scrollYProgress: imgProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] });

  const bgY    = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const textY  = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imgY   = useTransform(imgProgress, [0, 1], [-40, 40]);
  const img2Y  = useTransform(imgProgress, [0, 1], [-20, 20]);

  const { x: mx, y: my } = useMouseParallax(18);

  return (
    <section id="process" ref={sectionRef} className="py-32 bg-secondary relative overflow-hidden" data-testid="section-process">
      {/* Layer 0 — deep background glow */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px]"
          style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(205,166,90,0.06) 0%, transparent 65%)' }}
        />
        {/* Giant ghost number in background */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none overflow-hidden">
          <span className="font-serif text-[30vw] leading-none text-foreground/[0.015]">04</span>
        </div>
      </motion.div>

      {/* Layer 1 — mid parallax wireframe */}
      <motion.div style={{ x: mx, y: my }} className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full border border-primary/6"
          style={{ width: 500, height: 500, top: '-10%', right: '-10%' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-px h-40 bg-gradient-to-b from-transparent via-primary/15 to-transparent"
          style={{ bottom: '15%', left: '50%' }}
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Images — each at a different parallax depth */}
          <motion.div
            ref={imgRef}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main image — slower parallax */}
            <div className="relative overflow-hidden mb-6 gold-border-glow">
              <motion.img
                src="/images/process-1.png"
                alt="Design material board"
                style={{ y: imgY, scale: 1.1 }}
                className="w-full aspect-square object-cover"
                loading="lazy"
              />
              {/* Overlay label */}
              <div className="absolute bottom-4 left-4 glass rounded-sm px-4 py-2 pointer-events-none">
                <span className="text-xs uppercase tracking-[0.2em] text-primary/80">Curation Process</span>
              </div>
            </div>

            <div className="flex gap-5">
              {/* Second image — faster parallax opposite direction */}
              <div className="w-1/2 relative overflow-hidden gold-border-glow">
                <motion.img
                  src="/images/process-2.png"
                  alt="Designer sketching"
                  style={{ y: img2Y, scale: 1.08 }}
                  className="w-full aspect-[3/4] object-cover"
                  loading="lazy"
                />
              </div>

              {/* Text card — no parallax, grounded */}
              <motion.div
                className="w-1/2 glass-card rounded-sm p-6 md:p-8 flex flex-col justify-center"
                whileHover={{ z: 20, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-8 h-px bg-primary/50 mb-4" />
                <span className="uppercase tracking-[0.2em] text-primary text-xs font-medium mb-4 block">The Studio</span>
                <p className="text-foreground/60 font-light leading-relaxed text-sm">
                  We marry rigorous architectural discipline with an intuitive understanding of beauty.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Steps — scroll-parallax upward */}
          <motion.div style={{ y: textY }} className="lg:pl-8 lg:pt-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <span className="uppercase tracking-[0.25em] text-primary text-xs font-medium mb-4 block">Methodology</span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">The Art of Execution</h2>
              <div className="w-12 h-px bg-primary/50 mt-8" />
            </motion.div>

            <div className="space-y-5" style={{ perspective: '800px' }}>
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 32, rotateY: -8 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ z: 12, x: 4 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="group glass-card rounded-sm p-6 pl-24 relative hover:gold-border-glow transition-all duration-400"
                >
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-serif text-4xl text-gradient-gold opacity-40 group-hover:opacity-100 transition-opacity duration-500 leading-none">
                    {step.number}
                  </span>
                  <div style={{ transform: 'translateZ(16px)' }}>
                    <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2">{step.title}</h3>
                    <p className="text-foreground/55 font-light leading-relaxed text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
