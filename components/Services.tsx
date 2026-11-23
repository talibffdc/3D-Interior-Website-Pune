import { useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { Grid3X3, Box, Sofa, ClipboardCheck, Home, Building2, Droplets, Lightbulb } from 'lucide-react';
import { useMouseParallax } from '@/hooks/use-mouse-parallax';

const services = [
  { icon: Grid3X3, title: 'Space Planning', description: 'Optimizing spatial flow and functionality for seamless, intuitive living.' },
  { icon: Box, title: '3D Visualization', description: 'Photorealistic architectural rendering that brings your future space to life.' },
  { icon: Sofa, title: 'Furniture & FF&E', description: 'Curation and sourcing of bespoke furnishings and hand-picked finishes.' },
  { icon: ClipboardCheck, title: 'Project Management', description: 'End-to-end execution, liaising with architects, artisans, and vendors.' },
  { icon: Home, title: 'Residential Design', description: "Private sanctuaries crafted for Pune's most discerning homeowners." },
  { icon: Building2, title: 'Commercial Design', description: 'Elevated corporate and hospitality environments across India.' },
  { icon: Droplets, title: 'Kitchen & Bath', description: 'Sensory wet spaces blending utility with enduring luxury.' },
  { icon: Lightbulb, title: 'Lighting Design', description: 'Sculpting mood and atmosphere through intentional illumination.' },
];

function ServiceCard({ service, index }: { service: typeof services[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sc = { stiffness: 180, damping: 18, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), sc);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), sc);
  const glare   = useSpring(useTransform(x, [-0.5, 0.5], [0, 0.14]), sc);
  const elevZ   = useSpring(useTransform(x, [-0.5, 0.5], [0, 8]), sc);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onMouseLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, z: elevZ, transformStyle: 'preserve-3d', perspective: 900 }}
      className="group relative glass-card rounded-sm p-8 cursor-default"
    >
      {/* Glare overlay */}
      <motion.div
        style={{ opacity: glare, background: 'linear-gradient(135deg, rgba(205,166,90,0.20) 0%, transparent 60%)' }}
        className="absolute inset-0 rounded-sm pointer-events-none z-0"
      />
      {/* Inner depth shadow */}
      <div
        className="absolute inset-0 rounded-sm pointer-events-none z-0"
        style={{ boxShadow: 'inset 0 1px 0 rgba(255,248,235,0.07), inset 0 -1px 0 rgba(12,8,4,0.4)' }}
      />
      {/* Content pushed forward in Z */}
      <div style={{ transform: 'translateZ(20px)' }} className="relative z-10">
        <div className="mb-7 w-14 h-14 flex items-center justify-center rounded-full border border-primary/25 text-primary bg-primary/5 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-500">
          <service.icon size={22} strokeWidth={1.5} />
        </div>
        <div className="w-8 h-px bg-primary/40 mb-5 group-hover:w-14 transition-all duration-500" />
        <h3 className="font-serif text-2xl mb-3 text-foreground leading-tight">{service.title}</h3>
        <p className="text-foreground/55 font-light leading-relaxed text-sm">{service.description}</p>
      </div>
    </motion.div>
  );
}

export function Services() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY  = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const fgY  = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const { x: mx, y: my } = useMouseParallax(20);

  return (
    <section id="services" ref={ref} className="py-32 bg-secondary relative overflow-hidden" data-testid="section-services">
      {/* Layer 0 — deep glow (scroll only) */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 -translate-x-1/2 w-[800px] h-[800px]"
          style={{ background: 'radial-gradient(ellipse, rgba(205,166,90,0.06) 0%, transparent 65%)', transform: 'translateY(-30%)' }}
        />
      </motion.div>

      {/* Layer 1 — floating wireframe shapes (scroll + mouse) */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <motion.div style={{ x: mx, y: my }} className="absolute inset-0">
          <motion.div
            className="absolute rounded-full border border-primary/6"
            style={{ width: 600, height: 600, top: '50%', left: '-15%' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute rounded-full border border-foreground/4"
            style={{ width: 400, height: 400, bottom: '-10%', right: '-5%' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute w-px h-32 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
            style={{ right: '8%', top: '20%' }}
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Layer 2 — content */}
      <motion.div style={{ y: fgY }} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <span className="uppercase tracking-[0.25em] text-primary text-xs font-medium mb-4 block">Expertise</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">Our Services</h2>
          <div className="w-12 h-px bg-primary/50 mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" style={{ perspective: '1200px' }}>
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
