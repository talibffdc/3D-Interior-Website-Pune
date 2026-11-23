import { useState, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { useMouseParallax } from '@/hooks/use-mouse-parallax';

const projects = [
  { id: 1, title: 'The Aundh Residence', category: 'Residential', image: '/images/project-1.png', tag: 'Pune' },
  { id: 2, title: 'Koregaon Black Kitchen', category: 'Kitchen', image: '/images/project-2.png', tag: 'Pune' },
  { id: 3, title: 'Baner Sanctuary', category: 'Bedroom', image: '/images/project-3.png', tag: 'Pune' },
  { id: 4, title: 'Hinjewadi Tech Hub', category: 'Commercial', image: '/images/project-4.png', tag: 'Pune' },
  { id: 5, title: 'Marriott Éclipse Suite', category: 'Hospitality', image: '/images/project-5.png', tag: 'Pune' },
  { id: 6, title: 'Kalyani Nagar Spa Bath', category: 'Bath', image: '/images/project-6.png', tag: 'Pune' },
];

const categories = ['All', 'Residential', 'Commercial', 'Hospitality', 'Kitchen', 'Bath', 'Bedroom'];

function ProjectCard({ project }: { project: typeof projects[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sc = { stiffness: 140, damping: 20, mass: 0.7 };
  const rotateX  = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), sc);
  const rotateY  = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), sc);
  const imgScale = useSpring(useTransform(y, [-0.5, 0.5], [1.04, 0.97]), sc);
  const imgX     = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), sc);
  const imgY     = useSpring(useTransform(y, [-0.5, 0.5], [-6, 6]), sc);

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
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1100 }}
      className="group relative overflow-hidden aspect-[4/3] bg-card cursor-pointer rounded-sm gold-border-glow"
      data-testid={`card-project-${project.id}`}
    >
      {/* Image parallaxes independently within the card */}
      <motion.div
        style={{ scale: imgScale, x: imgX, y: imgY }}
        className="absolute inset-[-8%] w-[116%] h-[116%]"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Multi-layer depth overlays */}
      {/* Base vignette always visible */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(12,8,4,0.6) 0%, transparent 70%)' }}
      />
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600" />

      {/* Glass info panel — pushed in Z */}
      <div
        className="absolute bottom-0 left-0 right-0 p-5 md:p-7 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: 'translateZ(30px)' }}
      >
        <div className="glass rounded-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-primary text-xs uppercase tracking-[0.25em] font-medium">{project.category}</span>
            <span className="text-foreground/40 text-xs uppercase tracking-widest">{project.tag}</span>
          </div>
          <h3 className="font-serif text-2xl md:text-3xl text-foreground leading-tight">{project.title}</h3>
          <div className="w-8 h-px bg-primary/60 mt-3" />
        </div>
      </div>

      {/* Corner accent — foreground layer */}
      <div
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ transform: 'translateZ(40px)' }}
      >
        <div className="w-6 h-px bg-primary/70" />
        <div className="w-px h-6 bg-primary/70 mt-[-1px] ml-[23px]" />
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY  = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const fgY  = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const { x: mx, y: my } = useMouseParallax(16);

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" ref={sectionRef} className="py-32 bg-background relative overflow-hidden" data-testid="section-portfolio">
      {/* Deep background glow */}
      <motion.div style={{ y: bgY, x: mx }} className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px]"
          style={{ background: 'radial-gradient(ellipse at 80% 80%, rgba(205,166,90,0.05) 0%, transparent 65%)' }}
        />
        {/* Floating rings */}
        <motion.div
          className="absolute rounded-full border border-primary/5"
          style={{ width: 700, height: 700, top: '50%', right: '-20%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 65, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      <motion.div style={{ y: fgY }} className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="uppercase tracking-[0.25em] text-primary text-xs font-medium mb-4 block">Selected Works</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">Our Portfolio</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap gap-5"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-xs uppercase tracking-[0.2em] pb-1 border-b transition-all duration-300 ${
                  filter === cat ? 'border-primary text-primary' : 'border-transparent text-foreground/40 hover:text-foreground/70'
                }`}
                data-testid={`btn-filter-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: '1400px' }}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 24, rotateX: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
